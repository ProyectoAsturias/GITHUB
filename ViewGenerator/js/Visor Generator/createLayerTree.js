var lastData;

$(document).ready(function(){
    //updateTreeLayer();
	makeLeftBarResizable();
});

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
    var node = {text: '<div class="layerName">'+layer.name+'</div>', nodes: [], layer: layer, state: {checked: layer.getVisible()}};
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
            var mapData = {text:'<div class="layerName">'+treeDataSource[i].name+'</div><div class="treeIcons"><span class="glyphicon glyphicon-remove removeMap" title="Eliminar este mapa"></span></div>', nodes: [], state: {checked: true}, wmsUrl: treeDataSource[i].url};
            for (var h=0; h<treeDataSource[i].layers.length; h++){
                mapData.nodes.push(generateNode(treeDataSource[i].layers[h]));
            }
            layerData.push(mapData);
        }
        createLayerTree(layerData);
    })

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
    removeMapHandler();
}

function removeMapHandler(){
    $("#layersTree").on("click",function(){
        $(".removeMap").on("click", function(){
            var nodes = $("#layersTree").treeview("getNode",$(this).parent().parent().data("nodeid")).nodes;
            for (var i = 0; i<nodes.length; i++){
                map.removeLayer(nodes[i].layer);
            }
            var deletedUrl = $("#layersTree").treeview("getNode",$(this).parent().parent().data("nodeid")).wmsUrl;
            console.log(deletedUrl);
            var index = mapDetails["WMSUrl"].indexOf(deletedUrl);
            console.log(index);
            if (index !== -1) {
                mapDetails["WMSUrl"].splice(index, 1);
            }
            console.log(lastData);
            for(i=0;i<lastData.length;i++){
                if(lastData[i].wmsUrl==deletedUrl)
                    lastData.splice(i, 1);
            }
            $("#layersTree").treeview("remove");
            createLayerTree(lastData);
        })
    });

}

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