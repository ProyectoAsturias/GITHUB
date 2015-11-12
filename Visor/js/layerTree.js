showLayersTree = true;
orderDataSource = null;

function updateTreeLayer(){
    if (map!= undefined && map.mapURL == ""){
        var treeData = generateTreeData();
        createLayerTree(treeData);

    }else{
        $(document).ajaxStop(function(){
            var treeData = generateTreeData();
            createLayerTree(treeData);
        });
    }
}

function generateNode(layer){
    var node = {text: '<div class="layerName">'+layer.name+'</div>', nodes: [], layer: layer, state: {checked: true, expanded: true}};
    node.nodes.push(getLegendImageForLayer(layer));
    return node;
}

function generateTreeData(){
    if (map.name == undefined)
        map.name = "Incluya un mapa";
    var treeData = [{text: map.name, nodes: [], state: {checked: true}}];
    map.getLayers().forEach(function(layer, index){
        if(!layer.base)
            treeData[0].nodes.push(generateNode(layer));
    });
    return treeData;
}

function createLayerTreeFromSource(dataSource){
    $(document).ajaxStop(function(){
        $(this).unbind("ajaxStop");
        var layerData = [];
        for (var i = treeDataSource.length-1; i>=0; i--){
            var mapData = {text:'<div class="nodeLine"><div class="mapName">'+treeDataSource[i].name+'</div><div class="visorTreeIcons"><span class="wmsBackward glyphicon glyphicon-triangle-bottom"></span><span class="wmsForward glyphicon glyphicon-triangle-top"></span></div></div>',
                    nodes: [], state: {checked: true}, wmsUrl: treeDataSource[i].url, backColor:"#FFEBCC"};
            for (var h=0; h<treeDataSource[i].layers.length; h++){
                mapData.nodes.push(generateNode(treeDataSource[i].layers[h]));
            }
            layerData.push(mapData);
        }
        createLayerTree(layerData);
        orderDataSource = layerData;
        orderWmsHandler();
    })
    layerTreeHandlers();
}

function orderWmsBackward(event) {
    var node = $("#layersTree").treeview("getNode", $(event.target).parent().parent().parent().data("nodeid"));
    for (var i = 0; i < orderDataSource.length; i++) {
        if (node.wmsUrl == orderDataSource[i].wmsUrl && orderDataSource[i + 1] != undefined) {
            var movedData = orderDataSource[i + 1];
            orderDataSource[i + 1] = orderDataSource[i];
            orderDataSource[i] = movedData;
            swapLayersOrdering(orderDataSource[i+1], orderDataSource[i]);
            $("#layersTree").treeview("remove");
            createLayerTree(orderDataSource);
            orderWmsHandler();
            node.nodes[0].layer.setVisible(node.nodes[0].layer.getVisible());
            break;
        }
    }
}

function orderWmsForward(event) {
    var node = $("#layersTree").treeview("getNode", $(event.target).parent().parent().parent().data("nodeid"));
    for (var i = 0; i < orderDataSource.length; i++) {
        if (node.wmsUrl == orderDataSource[i].wmsUrl && orderDataSource[i - 1] != undefined) {
            var movedData = orderDataSource[i - 1];
            orderDataSource[i - 1] = orderDataSource[i];
            orderDataSource[i] = movedData;
            swapLayersOrdering(orderDataSource[i], orderDataSource[i-1]);
            $("#layersTree").treeview("remove");
            createLayerTree(orderDataSource);
            orderWmsHandler();
            node.nodes[0].layer.setVisible(node.nodes[0].layer.getVisible());
            break;
        }
    }
}

function swapLayersOrdering(movingMap, forcedToMoveMap){
    if (forcedToMoveMap.nodes.length == 0) return;
    for (var i=0; i<map.getLayers().getLength(); i++){
        if (map.getLayers().item(i) == forcedToMoveMap.nodes[0].layer){
            var forcedStartingIndex = i;
            var forcedLayersSlice = map.getLayers().getArray().slice(i, forcedToMoveMap.nodes.length+i);
        }else if (map.getLayers().item(i) == movingMap.nodes[0].layer){
            var movingMapStartingIndex = i;
            var movingLayerSlice = map.getLayers().getArray().slice(i, movingMap.nodes.length+i);
        }
    }
    if (movingMapStartingIndex>forcedStartingIndex) {
        movingMapStartingIndex = movingMapStartingIndex+movingLayerSlice.length-forcedLayersSlice.length;
    }else{
        movingMapStartingIndex = movingMapStartingIndex-forcedLayersSlice.length;
    }
    var layersArray = map.getLayers().getArray();
    if (forcedLayersSlice.length > movingLayerSlice.length ){
        console.log("Se mueve el pequeño");
        for (var i=0; i<forcedLayersSlice.length; i++){
            if (i<movingLayerSlice.length){
                layersArray[i+forcedStartingIndex] = movingLayerSlice[i]
            }
        }
        for (var i=0; i<forcedLayersSlice.length; i++){
            layersArray[i+movingMapStartingIndex] = forcedLayersSlice[i];
        }
    }else{
        var arraySwapper = forcedLayersSlice;
        forcedLayersSlice = movingLayerSlice.slice(0);
        movingLayerSlice = arraySwapper;
        var indexSwapper = forcedStartingIndex;
        forcedStartingIndex = movingMapStartingIndex;
        movingMapStartingIndex = indexSwapper;
        for (var i=0; i<forcedLayersSlice.length; i++){
            if (i<movingLayerSlice.length){
                layersArray[i+forcedStartingIndex] = movingLayerSlice[i]
            }
        }
        for (var i=0; i<forcedLayersSlice.length; i++) {
            layersArray[i + movingMapStartingIndex] = forcedLayersSlice[i];
        }
    }
}

function orderWmsHandler(){
    $("#layersTree").on("click", function(event){
        console.log(event.target);
        if (event.target.className == "wmsBackward glyphicon glyphicon-triangle-bottom"){
            console.log("Patras")
            orderWmsBackward(event);
        }
        if (event.target.className == "wmsForward glyphicon glyphicon-triangle-top"){
            orderWmsForward(event);
        }
    })
}

function layerTreeHandlers(){
    $(".hideLayers").off("click");
    makeLayerTreeResizable();
    closeLayerTree();
    hideLayerTree();
}

function getLegendImageForLayer(layer){
    var imgDiv ="<div class=\"imgLayer\" id=\"" + layer.name + "\"><img crossOrigin=\"Anonymous\" src='" + layer.getSource().getUrls()[0] + "?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=" + layer.name + "&LEGEND_OPTIONS=forceLabels:on' />";
    var legendNode = {text:imgDiv, showCheckbox: false}
    return legendNode
}

function closeLayerTree(){
    $(".removeLayers").click(function(event){
        $("#layersTreeWrapper").hide();
    });
}

function hideLayerTree(){
    $(".hideLayers").click(function(event){
        if(showLayersTree){
            $("#layersTreeWrapper").css("width", $("#layersTreeWrapper").width()+1);
            $("#layersTree").hide();
            $("#layersTree").hide();
            showLayersTree=false;
            previousHeight = $("#layersTreeWrapper").css("height");
            $("#layersTreeWrapper").css("height", 25)
        }
        else{
            $("#layersTree").show();
            showLayersTree=true;
            $("#layersTreeWrapper").css("height", previousHeight)
        }
    });
}

function makeLayerTreeResizable(){
    $("#layersTreeWrapper").resizable({
        resize: function(event, ui) {

        }
    });
}

function createLayerTree(data){
    lastData = data;
    $("#layersTree").treeview({
        data: data,
        showCheckbox: true,
        emptyIcon: "",
        onNodeChecked: function(event, node){
            if (node.layer) node.layer.setVisible(true);
            checkNodeChildrens(node);
        },
        onNodeUnchecked: function(event, node){
            if (node.layer) node.layer.setVisible(false);
            uncheckNodeChildrens(node);
        },
        onNodeSelected: function(event, node){
            $("#layersTree").treeview("toggleNodeSelected", [ node.nodeId ]);
        }
    });
}


function uncheckNodeChildrens(node){
    if (node.nodes == undefined)
        return;
    node.nodes.forEach(function (childrenNode) {
        $('#layersTree').treeview("uncheckNode", childrenNode.nodeId);
    });
}

function checkNodeChildrens(node){
    if (node.nodes == undefined)
        return;
    node.nodes.forEach(function(childrenNode){
        $('#layersTree').treeview("checkNode", childrenNode.nodeId);
    });
}
