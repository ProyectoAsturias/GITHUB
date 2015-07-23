function showSLDEditorModal(layer){
    var SLDEditorModal = $('#SLDEditorModal');
    getSLDLayer(layer);
    SLDEditorModal.modal("show");
    SLDEditorModal.find('.modal-title').text('Style: ' + layer.name);
}

function getSLDLayer(layer){
    var ajaxReq = $.ajax({
        url: layer.getSource().getUrls()[0],
        data: {
            request: "GetStyles",
            layers: layer.name,
            service: "wms",
            version: "1.1.1"
        },
        method: "GET",
        success: function (response) {
            var context = new Jsonix.Context([XLink_1_0, Filter_1_0_0, GML_2_1_2, SLD_1_0_0]);
            var unmarshaller = context.createUnmarshaller();
            var marshaller = context.createMarshaller();
            console.log(marshaller.marshalDocument(unmarshaller.unmarshalDocument(response)));
            createLayerModal(unmarshaller.unmarshalDocument(response), layer);
        }
    });
}

function createLayerModal(styleInfoObject, layer){
    clearModal();
    styleInfoObject.value.namedLayerOrUserLayer.forEach(function(retrievedLayer){
        if (retrievedLayer.name == layer.name){
            retrievedLayer.namedStyleOrUserStyle.forEach(function(style){
                addStyleToModal(style);
            });
        }
    })
};

function addStyleToModal(style){
    addCollapsibleItem(style);
    createFlatColorPicker("#ffffff")
}

function clearModal(){
    $("#collapsibleStyle").empty();
    $("#colorpicker").empty();
}
function addCollapsibleItem(style){
    console.log(style);
    var randomId = (style.name + Math.floor(Math.random() * (1000 - 5 + 1)) + 5).replace(/ /g,"");
    var htmlCollapsible = ''+
        '<div class="panel panel-default">'+
            '<div class="panel-heading">'+
                '<h4 class="panel-title">'+
                    '<a id="link'+randomId+'" class="accordion-toggle" data-toggle="collapse" data-parent="#collapsibleStyle" href="#'+randomId+'">'+style.name+'</a>'+
                '</h4>'+
            '</div>'+
            '<div id="'+randomId+'" class="panel-collapse collapse">'+
                '<div class="panel-body">'+style._abstract+'</div>'+
                '<div class="panel-group" id="featureTypeStyles">';
                    var rulesLinkStyle = {};
                    style.featureTypeStyle.forEach(function (featureTypeStyle){
                        htmlCollapsible += '<div class="panel panel-default">' +
                        '<div class="panel-heading">'+
                            '<h4 class="panel-title">' +
                                '<a class="accordion-toggle" data-toggle="collapse" data-parent="#featureTypeStyles" href="#feature'+randomId+'">Reglas </a>' +
                            '</h4>'+
                        '</div>'+
                        '<div id="feature'+randomId+'" class="panel-collapse collapse">'+
                            '<div class="panel-body">';
                            featureTypeStyle.rule.forEach(function (rule){
                                randomLinkId = "link" + Math.floor(Math.random() * (1000 - 5 + 1)) + 5;
                                rulesLinkStyle[randomLinkId] = rule;
                                console.log(rulesLinkStyle);
                                htmlCollapsible += (!rule.name)? '<a id="'+randomLinkId+'">Rule</a></div>' : '<a id="'+randomLinkId+'">'+rule.name+'</a></div>';
                            });
                    });
            htmlCollapsible = htmlCollapsible + '</div>' + '</div>'+
        '</div>';
    $("#collapsibleStyle").append(htmlCollapsible);
    for (linkId in rulesLinkStyle){
        var rule = rulesLinkStyle[linkId];
        $("#"+linkId).click(function(){
            showRuleInfo(rule);
        });
    }
}

function showRuleInfo(rule){
    console.log(rule);
    $("#ruleName").val(rule.name);
    $("#ruleTitle").val(rule.title);
    switch(rule.symbolizer[0].name.localPart) {
        case "LineSymbolizer":
            showLineSymbolizerInfo(rule.symbolizer[0].value)
            break;
        case "PolygonSymbolizer":
            showPolygonSymbolizerInfo(rule.symbolizer[0].value);
            break;
        case "PointSymbolizer":
            console.log(rule.symbolizer[0].name.localPart);
            showPointSymbolizerInfo(rule.symbolizer[0].value);
            break;
        case "TextSymbolizer":
            showTextSymbolizerInfo(rule.symbolizer[0].value);
            break;
        case "RasterSymbolizer":
            showRasterSymbolizerInfo(rule.symbolizer[0].value);
            break;
    }
    //showColorPicker(style.color)
}

function createFlatColorPicker(color){
    $('#colorpickerHolder').ColorPicker({
        flat: true,
        color: color,
        onSubmit: function(hsb, hex, rgb) {
            //refreshPreview()
        }
    });
}

function showPolygonSymbolizerInfo(symbolizerInfo){
    var opacityIsPresent = false;
    symbolizerInfo.fill.cssParameter.forEach(function (parameter) {
        if (parameter.name == "fill") {
            $("#colorpickerHolder").ColorPickerSetColor(parameter.content[0]);
        }
        if (parameter.name == "fill-opacity") {
            opacityIsPresent = true;
            $("#transparencySlider").slider();
        }
    });
    if (!opacityIsPresent) {
        symbolizerInfo.fill.cssParameter.push({TYPE_NAME: "SLD_1_0_0.CssParameter", content: ["1"], name:"fill-opacity"});
    }
    var context = new Jsonix.Context([XLink_1_0, Filter_1_0_0, GML_2_1_2, SLD_1_0_0]);
    var marshaller = context.createMarshaller();
    console.log(marshaller.marshalDocument(symbolizerInfo));
}

function showLineSymbolizerInfo(symbolizerInfo){
    symbolizerInfo.stroke.cssParameter.forEach(function (parameter){
        if (parameter.name == "stroke"){
            $("#colorpickerHolder").ColorPickerSetColor(parameter.content[0])
        }
    });
}


