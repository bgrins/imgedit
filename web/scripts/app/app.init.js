
(function() {
	var app = window.app;
	
	app.resize = resize;
	app.initialize = initialize;

	function resize() {
	    app.container.height(
	    	document.body.scrollHeight - app.container.offset().top
	    );
	}
	
	function initialize() {
		var startTime = new Date().getTime();
		
		app.container = $("#workspace");
		app.controldispatcher.initialize();
		app.load(LOADED.files);
		
		$("#modal").resizable();
		app.resize();
		 
		$(document).bind('keydown', 'Ctrl+c', app.clipboard.copy);
		$(document).bind('keydown', 'Ctrl+v', app.clipboard.paste);
		
		$("#control-select").click();
		
		
		$("#layer-list").click(function(e) {	
		    var target = $(e.target);
		    if (target.is("input")) {
		    	var layerInd = target.closest('li').attr("data-ind");
		    	var layer = app.files.current.layers[layerInd];
		    	if (target.is(":checked")) {
		    		layer.show();
		    	}
		    	else {
		    		layer.hide();
		    	}
		    }	
		});
		
		app.files.active[0].makeActive();
		
		log("Loaded in " + (new Date().getTime() - startTime) + " ms");
	}

})();