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
		var newToolBar=	"<div class=\"functionsBar container horizontal\" id=\"toolBar"+numToolBars+"\">"+
							"<div class=\"horizontaliconFunctionBar\"><span class='glyphicon glyphicon-remove removeFunctionBar'></span></div>"+
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
							"<div class=\"verticaliconFunctionBar\"><span class='glyphicon glyphicon-remove removeFunctionBar'></span></div>"+
						"</div>"
		$('#mapContainer').append(newToolBar);
		makeFunctionsBarDraggable();
		makeToolsSortable();
		hideToolBar();
	});	
}

function hideToolBar(){
	$(".removeFunctionBar").click(function(event){
		console.log(event);
		$("#"+event.target.parentNode.parentNode.id+"").remove();
	});
}

function back(){
	window.location="http://localhost:8090/Asturias/"+"Tables/php/tables.php"+"?previous="+visorName;
	//window.location=server+"Tables/php/tables.php"+"?previous="+visorName;
}
