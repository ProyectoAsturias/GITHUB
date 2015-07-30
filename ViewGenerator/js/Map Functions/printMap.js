var dims = {
    a0: [1189, 841],
    a1: [841, 594],
    a2: [594, 420],
    a3: [420, 297],
    a4: [150, 105],
    a5: [210, 148]
};

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

    var format = "a4";

    var mapImage = generateMapImage();
    var mapTitle = generateMapTitle();
    var mapDescription = generateMapDescription();
    var mapScale = generateMapScale();
    var legendImage;
    generateLegendImage(function(image){
        legendImage = image;
    })
    var tableImages;
    generateTableImages(function(images){
        tableImages = images;
    })


    var interval = setInterval(function(){
        if (legendImage != undefined && tableImages != undefined){
            clearInterval(interval);
            createPDF(format, mapTitle, mapDescription, mapScale, mapImage, legendImage, tableImages);
        }
    }, 100)
}

function createPDF(format,mapTitle, mapDescription, mapScale, mapImage, legendImage, tableImages){
    var pdf = new jsPDF('landscape', "cm", format);
    pdf.setFontSize(20);
    pdf.text(11, 1.5, mapTitle);

    pdf.setFontSize(12);
    //pdf.text(1, 2, mapDescription);
    pdf.fromHTML($("#description").get(0),1, 2, {
        "width": 28,
        "elementsHandler": specialElementHandlers()
    });
    pdf.addImage(mapImage, 'JPEG', 1, 4, 28, 0);

    pdf.setFontSize(14);
    pdf.text(1, 16, "Escala");
    pdf.setFontSize(12);
    pdf.text(3, 16, mapScale);

    pdf.addImage(legendImage, "PNG", 1, 4, 4, 0);

    var leftMargin = 1;
    for (var i=0; i<tableImages.length; i++){
        pdf.addImage(tableImages[i], "PNG", leftMargin, 17, 3, 0);
        leftMargin =  (3+leftMargin)+0.5;
    }
    pdf.save('map.pdf');
}

function specialElementHandlers(){
    return true;
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

