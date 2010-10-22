
(function() {
	var app = window.app;
	
	app.resize = resize;
	app.initialize = initialize;

	function resize() {
		var height = document.body.scrollHeight - app.container.offset().top;
	    app.container.height(height);
	}
	
	function initialize() {
		var startTime = new Date().getTime();
    	
    	$("#color-picker").jPicker({window:{expandable: true, position:{x:0, y:0}}});
        log("initing");
		app.container = $("#workspace");
		app.filemanager = $("#file-manager");
		app.controldispatcher.initialize();
		app.load(LOADED.files);
		
		$("#templateFileManager").template("fileManager");
		
		$("a[href='#file-manager']").click(function() {
			app.sidebar.drawFileManager();
			return false;
		});
		
		$("#modal").resizable();
		app.resize();
		
		$(window).bind('resize', app.resize); 
		
		// TODO: OSX should only fire these shortcuts on meta, but is there a better way to check than
		// UA sniffing?
		$(document).bind('keydown', 'ctrl+c meta+c', app.clipboard.copy);
		$(document).bind('keydown', 'ctrl+v meta+v', app.clipboard.paste);
		
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
		
		app.sidebar.init();
		
		log("Loaded in " + (new Date().getTime() - startTime) + " ms");
	}

	return app;

})();