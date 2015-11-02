showLayersTree = true;

function updateTreeLayer(){
    if (map!= undefined && map.mapURL == ""){
        var treeData = generateTreeData();
        createLayerTree(treeData);

    }else{
        $(document).ajaxStop(function(){
            console.log(map.mapURL);
            var treeData = generateTreeData();
            createLayerTree(treeData);
        });
    }
}

function generateNode(layer){
    var node = {text: '<div class="layerName">'+layer.name+'</div>', nodes: [], layer: layer, state: {checked: true}};
    if (layer instanceof ol.layer.Group){
        layer.getLayers().forEach(function(subLayer, indexInGroup){
            node.nodes.push(generateNode(subLayer));
        });
    }
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
        for (var i = 0; i<treeDataSource.length; i++){
            var mapData = {text:'<div class="layerName">'+treeDataSource[i].name+'</div>', nodes: [], state: {checked: true}, wmsUrl: treeDataSource[i].url};
            for (var h=0; h<treeDataSource[i].layers.length; h++){
                mapData.nodes.push(generateNode(treeDataSource[i].layers[h]));
            }
            layerData.push(mapData);
        }
        createLayerTree(layerData);
    })
    layerTreeHandlers();
}

function layerTreeHandlers(){
    makeLayerTreeResizable();
    closeLayerTree();
    hideLayerTree();
}

function closeLayerTree(){
    $(".removeLayers").click(function(event){
        $("#layersTreeWrapper").hide();
    });
}

function hideLayerTree(){
    $(".hideLayers").click(function(event){
        if(showLayersTree){
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
        }
    });
}


function uncheckNodeChildrens(node){
    node.nodes.forEach(function (childrenNode) {
        $('#layersTree').treeview("uncheckNode", childrenNode.nodeId);
    });
}

function checkNodeChildrens(node){
    node.nodes.forEach(function(childrenNode){
        $('#layersTree').treeview("checkNode", childrenNode.nodeId);
    });
}
