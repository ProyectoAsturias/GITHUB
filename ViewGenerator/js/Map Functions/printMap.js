$(document).ready(function(){
    console.log("Ey2");
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
        url: "../../JasperReports/src/generateReport.php",
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
            console.log(response);
            $("#previewCanvas iframe").attr("src", "../../JasperReports/src/generateReport.php?tag=downloadPdf");
        }
    });
}
/**
 * Start print task only for map content.
 * @method printMap
 * @return
 */
function printMap(){
    $("#previewCanvas iframe").get(0).contentWindow.print();
}

function deleteReportOnServer(){
    $.ajax({
        url: "../../JasperReports/src/generateReport.php",
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
        url: "../../JasperReports/src/generateReport.php",
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
        var tableHeaders = [];
        var tableContent = [];
        $('#dataTable tr').map(function() {
            $(this).find('th').map(function() {
                tableHeaders.push($(this).html())
            }).get();
            $(this).find('td').map(function() {
                tableContent.push($(this).html())
            }).get();
        }).get();
        return (JSON.stringify([{tableHeaders : tableHeaders, tableContent: tableContent}, {tableHeaders : tableHeaders, tableContent: tableContent}]));
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
                layersTitle.push($(elem).find("label").html());
            } else if ($(elem).hasClass("imgLayer")) {
                layersImage.push(convertImgToBase64URL($(elem).find("img").get(0)));
            }
        });
        console.log(layersImage);
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
    console.log(canvas.toDataURL("image/png"));
    return (canvas.toDataURL("image/png"));
}