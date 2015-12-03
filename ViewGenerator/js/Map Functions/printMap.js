$(document).ready(function(){
    PrintEventHandler();
    populatePrintReportsAvailable();
    changeReportSelectorHandler();
    removeReportHandler();
});

/**
 * Adds event handler and JQuery data attribute on this tool button.
 * @method PrintEventHandler
 * @return
 */
function PrintEventHandler() {
    $(".printMap").on("click", function(){
        showPrintModal();
        changePreview();
    });
    $("#reportDownload").jui_dropdown({
        launcher_id: 'printModalButton',
        launcher_container_id: 'launcherContainer',
        menu_id: 'formatList',
        containerClass: 'container1',
        menuClass: 'menu1',
        onSelect: function(event, data) {
            printMap(data.id);
        }
    });
    /*
    $("#printModalButton").on("click", function(){
        printMap()
    });*/

    $("#printModal :checkbox, #printModal :text, #printModal textarea").change(function(){
        changePreview();
    })
}

function removeReportHandler(){
    window.onbeforeunload = function(){
        deleteReportOnServer();
    }
}

function changeReportSelectorHandler(){
    $('.reportsAvailable').on('change', function() {
        changePreview();
    });
}

function changePreview(){
    var tables = generateDataTables();
    generateMapImage().then(function(){
        $.ajax({
            //url: "../../JasperReports/src/generateReport.php",
            url: printingPath + "src/generateReport.php",
            data: {
                reportName: $(".reportsAvailable").val(),
                mapImage: url,
                reportTitle: generateReportTitle(),
                reportDescription: generateReportDescription(),
                dataTables: tables,
                legendData: generateLegendForReport(),
                scale: Math.round(calculateScaleToMeters($(".ol-scale-line-inner").width(), $(".ol-scale-line-inner").html()))
            },
            type: "POST",
            success: function (response) {
                $("#previewCanvas iframe").attr("src", printingPath + "src/generateReport.php?tag=getPreview");
            }
        });
    })
}
/**
 * Start print task only for map content.
 * @method printMap
 * @return
 */
function printMap(format){
    if (format == "PDF"){
        window.open(printingPath + "src/generateReport.php?tag=downloadPdf", "_blank");
    }else if (format == "DOCX"){
        window.open(printingPath + "src/generateReport.php?tag=downloadDocx", "_blank");
    }
}

function deleteReportOnServer(){
    $.ajax({
        url: printingPath + "src/generateReport.php",
        data: {
            tag: "deleteReport"
        },
        type: "GET",
        success: function(response){
        }
    });
}

function populatePrintReportsAvailable(){
    $.ajax({
        url: printingPath + "src/generateReport.php",
        data: {
            tag: "getAvailableReports"
        },
        type: "GET",
        success: function(response){
            JSON.parse(response).forEach(function(reportName){
                $(".reportsAvailable").append($('<option>', {
                    value: reportName,
                    text: reportName
                }))
            })
        }
    });
}

function generateReportTitle(){
    if ($("#title :checkbox").is(":checked")){
        if ($("#title :text").val() == ""){
            return "Título del informe";
        }else{
            return $("#title :text").val();
        }
    }else{
        return "";
    }
}

function calculateScaleToMeters(elementWidth, elementContent){
    //Se asume que 1cm = 37.8px
    var metersFromScale;
    if (elementContent.indexOf("km") != -1){
        metersFromScale = parseInt(elementContent.replace("km",""))*1000;
    }else if (elementContent.indexOf("mm") != -1){
        metersFromScale = parseInt(elementContent.replace("km",""))/1000;
    }else if (elementContent.indexOf("m") != -1){
        metersFromScale = parseInt(elementContent.replace("km",""));
    }
    var centimetersWidth = elementWidth/37.8;
    return (metersFromScale/centimetersWidth);
}

function generateDataTables(){
    if ($("#modalDatatables :checkbox").is(":checked")){
        var layersNames = [];
        var layerContent = [];
        var layerHeaders = [];
        var tableHeaders = [];
        var tableContent = [];
        $('#info .menu5 li a').map(function() {
            layersNames.push($(this).text());
        }).get();
        $('#dataTable table').map(function() {
            layerHeaders = [];
            layerContent = [];
            $(this).find('th').map(function() {
                if ($(this).text() != "Informe EIEL" && $(this).text() != "Ficheros adjuntos")
                    layerHeaders.push($(this).text());
            }).get();
            $(this).find("tr").map(function() {
                var rowContent = [];
                $(this).find("td").each(function(){
                    rowContent.push($(this).text());
                });
                if (rowContent.length != 0 )
                    layerContent.push(rowContent);
            }).get();
            tableHeaders.push(layerHeaders);
            tableContent.push(layerContent);
        }).get();
        var allTables = [];
        for (var i=0; i<layersNames.length; i++){
            allTables.push({layerName: layersNames[i], tableHeaders: tableHeaders[i], tableContent: tableContent[i]});
        }
        return JSON.stringify(allTables);
    }else{
        return "";
    }
}

function showPrintModal(){
    $("#printModal").modal("show");
}

function generateMapImage(){
    var element = $("#gmap");
    if (element[0].classList[0] && element[0].classList[0] == "fill") {
        return html2canvas(element, {
            useCORS: true,
            onrendered: function (canvas) {
                url = canvas.toDataURL("image/png");
            }
        });
    }else {
        return html2canvas($("canvas").get(0), {
            useCORS: true,
            onrendered: function(canvas){
                url = canvas.toDataURL("image/png");
            }
        })
    }
}

function generateReportDescription(){
    if ($("#description :checkbox").is(":checked")){
        if ($("#description textarea").val() == ""){
            return "Descripción del documento.";
        }else{
            return $("#description textarea").val();
        }
    }else{
        return "";
    }
}

function generateLegendForReport(){
    if ($("#modalLegend :checkbox").is(":checked")) {
        var layersTitle = [];
        var layersImage = [];
        $(".legendBar #legendContent").children().each(function (i, elem) {
            if ($(elem).hasClass("titleLayer")) {
                layersTitle.push($(elem).find("label").html().split("<span")[0]);
            } else if ($(elem).hasClass("imgLayer")) {
                layersImage.push(convertImgToBase64URL($(elem).find("img").get(0)));
            }
        });
        return (JSON.stringify({layersTitle: layersTitle, layersImage: layersImage}))
    }else{
        return "";
    }
}

function generateMapScale(){
    return $(".ol-scale-line-inner").html();
}


/**
 * Convert an image
 * to a base64 url
 * @param  {String}   url
 * @param  {Function} callback
 * @param  {String}   [outputFormat=image/png]
 */
function convertImgToBase64URL(imgElement){
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d');
    canvas.height = imgElement.height;
    canvas.width = imgElement.width;
    ctx.drawImage(imgElement, 0,0);
    return (canvas.toDataURL("image/png"));
}