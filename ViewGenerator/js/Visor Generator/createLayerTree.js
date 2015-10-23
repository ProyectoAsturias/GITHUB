$(document).ready(function(){
    makeLeftBarResizable();
    updateTreeLayer();
});

function makeLeftBarResizable(){
    var difSize;
    var previousSize;
    console.log($("#leftBarParent").css("min-width"))
    $("#leftBarParent").resizable({
        handles: "e",
        minWidth: $("#leftBarParent").css("min-width").split("px")[0],
        maxWidth: $("#leftBarParent").css("max-width").split("px")[0],
        start: function(event, ui){
            difSize = 0;
            previousSize = ui.size.width;
        },
        resize: function (event, ui) {
            difSize = (ui.size.width - previousSize);
            previousSize = ui.size.width;
            $(".legendBar").css("left", (parseInt($(".legendBar").css("left")) + difSize) + "px");
            $(".functionsBar").each(function(index, functionBar){
                $(functionBar).css("left", (parseInt($(functionBar).css("left")) + difSize) + "px");
            })
            map.updateSize();
        }
    });
}

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
    var node = {text: layer.name, nodes: [], layer: layer, state: {checked: true}};
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

function createLayerTree(data){
    $("#layersTree").treeview({
        data: data,
        showCheckbox: true,
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