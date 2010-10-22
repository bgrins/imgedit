
window.app.sidebar = (function(app) {

	var loaded = CLOSED.files;
	
	function bindFileManager() {
		$("li", app.filemanager).live("click", function() {
		
		});
	}
	
	function drawFileManager() {	
		if (app.filemanager.is(":visible")) {
			app.filemanager.hide();
			app.container.show();
		}
		else {
			app.filemanager.height(app.container.height()).width(app.container.width());
			$.tmpl("fileManager", loaded).appendTo(app.filemanager.find("ul").empty());
			app.filemanager.show();
			app.container.hide();
		}
	}

	function drawControls() {
	
	}
	function bindControls() {
	
	}
		
	function init() {
		bindFileManager();
		bindControls();
	}
	
	return {
		init: init,
		drawFileManager: drawFileManager,
		drawControls: drawControls
	};
	
})(window.app);