var numToolBars=0;
var actualImageCode;
var previews= new Object();
$(document).ready(function(){
	addTools();
	hideToolBar();
	addToolBar();
	showLegend();
	addVerticalToolBar();
	chooseImageButtonHandler();
	changeTitleButtonHandler();
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
	window.location=server+"Tables/php/tables.php"+"?previous="+visorName;
}

function chooseImageButtonHandler(){
	$("#chooseImage").click(function(event){
		$("#modalTools").modal("hide");
		var code;
		if(!visorData || !visorData["imageCode"]){
			code="0.gif";
			actualImageCode=code;
		}
		else{
			code=visorData["imageCode"]
			actualImageCode=visorData["imageCode"];
		}
		var htmlModal=	"<label for=\"actualImage\">Escudo Actual</label>"+
				"<div id=\"actualImage\"><img src=\""+code+"\"></div>"+
				"<label for=\"entityList\">Escudos disponibles</label>"+
				"<select id=\"entityList\" class=\"chosen-select\" onchange=\"changePreview()\" tabindex=\"1\" >"+
            		"<option></option>"+
            	"</select>"+
		        "<label for=\"inputImage\">Añadir escudo</label>"+
				"<input id=\"inputImage\" name=\"inputImage\" type=\"file\" class=\"file-loading\">";
		$("#modalHeaders .modal-header").html("<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\">Seleccionar escudo del encabezado</h4>");
		$("#modalHeaders .modal-body").html(htmlModal);
		$("#modalHeaders .modal-footer").html("<button type=\"button\" id=\"updateImageCode\" onclick=\"updateImageCode()\" class=\"btn btn-success\" data-dismiss=\"modal\">Guardar</button><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>");		
		$('#inputImage').fileinput({
			uploadUrl : "../php/uploadImage.php",
			uploadAsync : true,
			uploadExtraData : {
				'tag':'saveImgEscudo',
				visorName : visorName
			},
			allowedFileExtensions : ["png", "jpg","jpeg", "gif"],
			previewClass : "bg-warning",
			dropZoneEnabled : false,
		});
		$("#inputImage").on('fileuploaded', function (event, data) {
			console.log(data);
			var codeImg="../../visores/"+data.extra.visorName+"/escudo_"+data.files[0].name;
			actualImageCode=codeImg;
			$("#actualImage").empty().append("<img src=\""+codeImg+"\">");
		});

		$("#inputImage").on('fileuploaderror', function (event, data) {
			console.log(data);
			console.log("error");
			$(".kv-fileinput-error").html("<ul>");
			if(data.jqXHR.responseText=="Error: Tamaño de la imagen incompatible")
				$(".kv-fileinput-error").append("<li><b>"+data.files[0].name+"</b> Error,el tamaño de la imagen es incompatible, la imagen puede tener hasta 50px de alto y hasta 550px de ancho</li>");
			if(data.jqXHR.responseText=="Error: there was an error uploading your file.")
				$(".kv-fileinput-error").append("<li><b>"+data.files[0].name+": </b> Ha ocurrido un error subiendo el archivo");
			$(".kv-fileinput-error").append("</ul>");
		});

		$("#modalHeaders").modal("show");
		$('.chosen-select').chosen({
			width : "100%",
			search_contains : true
		});
		$.ajax({
	        url: apiPath+"apiLocalgis.php",
	        data: {
	            "tag" : "getEntityNames",
	        },
	        method: "POST",
	        success: function (response) {
	            var entityArray=JSON.parse(response);
	            console.log(entityArray);
	            for(i=0;i<entityArray.length;i++){
	            	$("#entityList").append("<option value=\"../../Common/img/escudos/"+entityArray[i][1]+".png\">"+entityArray[i][0]+"</option>")
	            }
	            $('.chosen-select').trigger("chosen:updated");
	        }
	    });
	});
}

function changePreview(){
	var code=$("#entityList").val();
	actualImageCode=code;
	$("#actualImage").empty().append("<img src=\""+code+"\">");
}

function updateImageCode(){
	if(!visorData)
		previews.imageCode=actualImageCode;
	else
		visorData["imageCode"]=actualImageCode;
}

function changeTitleButtonHandler(){
	$("#addTitle").click(function(event){
		var title;
		$("#modalTools").modal("hide");
		if(!visorData || !visorData["title"]){
			title=visorName;
		}
		else{
			title=visorData["title"];
		}
		$("#modalHeaders .modal-header").html("<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\">Modificar Título del Visor</h4>");
		$("#modalHeaders .modal-body").html("<input type=\"text\" class=\"form-control\" id=\"titleVisor\" value=\""+title+"\">");
		$("#modalHeaders .modal-footer").html("<button type=\"button\" id=\"updateTitle\" onclick=\"updateTitle()\" class=\"btn btn-success\" data-dismiss=\"modal\">Guardar</button><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar</button>");		
		$("#modalHeaders").modal("show");
	});
}

function updateTitle(){
	var visorTitle=$("#titleVisor").val();
	if(!visorData)
		previews.title=visorTitle
	else
		visorData["title"]=visorTitle;
}