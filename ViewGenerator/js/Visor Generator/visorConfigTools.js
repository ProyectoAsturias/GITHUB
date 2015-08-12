var numToolBars=0;
$(document).ready(function(){
	addTools();
	hideToolBar();
	addToolBar();
	showLegend();
	addVerticalToolBar();
});

function addTools(){
	$("#openModalVisor").click(function(event){
		$("#modalTools").modal("show");
	});
}

function showLegend(){
	$("#showLegend").click(function(event){
		$(".legendBar").show();
	});	
}

function addToolBar(){
	$("#addToolBar").click(function(event){
		numToolBars=numToolBars+1;
		var newToolBar=	"<div class=\"functionsBar container\" id=\"toolBar"+numToolBars+"\">"+
							"<div class=\"iconFunctionBar\"><div class=\"fixedIcon\"><span class='glyphicon glyphicon-remove removeFunctionBar'></span></div></div>"+
						"</div>"
		$('#mapContainer').append(newToolBar);
		makeFunctionsBarDraggable();
		makeToolsSortable();
		hideToolBar();
	});	
}

function addVerticalToolBar(){
	$("#addVerticalToolBar").click(function(event){
		numToolBars=numToolBars+1;
		var newToolBar=	"<div class=\"functionsBar container vertical \" id=\"toolBar"+numToolBars+"\">"+
							"<div class=\"iconVerticalFunctionBar\"><div class=\"fixedVerticalIcon\"><span class='glyphicon glyphicon-remove removeFunctionBar'></span></div></div>"+
						"</div>"
		$('#mapContainer').append(newToolBar);
		makeFunctionsBarDraggable();
		makeToolsSortable();
		hideToolBar();
	});	
}

function hideToolBar(){
	$(".removeFunctionBar").click(function(event){
		console.log(event.target.parentNode.parentNode.parentNode.id);
		$("#"+event.target.parentNode.parentNode.parentNode.id+"").hide();
	});
}