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
    $("#printModalButton").on("click", function(){
        printMap()
    });

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
    $.ajax({
        //url: "../../JasperReports/src/generateReport.php",
        url: printingPath + "src/generateReport.php",
        data: {
            reportName: $(".reportsAvailable").val(),
            mapImage: generateMapImage(),
            reportTitle: generateReportTitle(),
            reportDescription: generateReportDescription(),
            dataTables: generateDataTables(),
            legendData: generateLegendForReport()
        },
        type: "POST",
        success: function (response) {
            $("#previewCanvas iframe").attr("src", printingPath + "src/generateReport.php?tag=getPreview");
        }
    });
}
/**
 * Start print task only for map content.
 * @method printMap
 * @return
 */
function printMap(){
    //$("#previewCanvas iframe").get(0).contentWindow.print();
    window.open(printingPath + "src/generateReport.php?tag=downloadPdf", "_blank");
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
                layerHeaders.push($(this).text());
            }).get();
            $(this).find('td').map(function() {
                layerContent.push($(this).text());
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
    var canvas = $("canvas").get(0);
    return canvas.toDataURL('image/jpeg');
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