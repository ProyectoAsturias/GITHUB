$(document).ready(function(){
    PrintEventHandler();
});

/**
 * Adds event handler and JQuery data attribute on this tool button.
 * @method PrintEventHandler
 * @return
 */
function PrintEventHandler() {
    $(".printMap").on("click", printMap);
}

/**
 * Start print task only for map content.
 * @method printMap
 * @return
 */
function printMap(){
    $.ajax({
        url: "../../../JasperReports/src/generateReport.php",
        data: {
            reportPath: "C:/wamp/www/JasperReports/reports/Prueba1.jrxml",
            mapImage: generateMapImage(),
            fileName: new Date().getDate()+"_report"
        },
        method: "POST",
        success: function (response) {
            window.location = "../../../JasperReports/src/generateReport.php?tag=downloadPdf";
            //window.location = "../../../../JasperReports/src/printPreview.php?file="+response;
            //console.log(response);
            //$("body").append('<iframe src="../../../../JasperReports/src/printPreview.php?file="'+response+'>');

            /*PDFJS.getDocument({data: atob(response)}).then(function getPDF(pdf){
                function renderPages(pdfDoc) {
                    for(var num = 1; num <= pdfDoc.numPages; num++)
                        pdfDoc.getPage(num).then(renderPage);
                }
                pdf.getPage(1).then(function getPDFPage(page) {
                    var scale = 1.5;
                    var viewport = page.getViewport(scale);
                    // Prepare canvas using PDF page dimensions.
                    var canvas = document.getElementById('the-canvas');
                    var context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    // Render PDF page into canvas context.
                    var renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    page.render(renderContext);
                });
            });*/
        }
    });
}


function generateMapImage(){
    var canvas = $("canvas").get(0);
    return canvas.toDataURL('image/jpeg');
}

function generateMapTitle(){
    return "Título del Mapa";
}

function generateMapDescription(){
    $("#description").html("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
    "\nlabore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi" +
    "\nut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");

}
function generateLegendImage(callback){
    html2canvas($(".legendBar").get(0),{
        onrendered: function(canvas) {
            callback(canvas.toDataURL('image/png'));
        }
    })
}

function generateMapScale(){
    return $(".ol-scale-line-inner").html();
}

function generateTableImages(callback){
    var images =[];
    var numberOfTables = $("#dataTables").children().length;
    $("#dataTables").children().each(function() {
        var element = $(this);
        var element = $(element).addClass("hugeTransform");
        html2canvas(element.get(0), {
            onrendered: function (canvas) {
                var tableImage = canvas.toDataURL('image/png');
                images.push(tableImage);
                $(element).removeClass("hugeTransform");
                if (images.length == numberOfTables){
                    callback(images);
                }
            }
        });
    });
}

