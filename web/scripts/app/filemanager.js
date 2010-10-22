
window.app.filemanager = (function(app) {

	var loaded = CLOSED.files;
	var fileContainer = "#file-manager";
	var appContainer;
	
	function bindFileManager() {
		$("li", fileContainer).live("click", function() {
		
		});
	}
	
	function drawFileManager() {	
		if (fileContainer.is(":visible")) {
			fileContainer.hide();
			appContainer.show();
		}
		else {
			fileContainer.
				height(appContainer.height()).
				width(appContainer.width());
				
			$.tmpl("fileManager", loaded).appendTo(
				fileContainer.find("ul").empty()
			);
			
			fileContainer.show();
			appContainer.hide();
		}
	}

	function init() {
		fileContainer = $(fileContainer);
		appContainer = app.container;
		bindFileManager();
	}
	
	return {
		show: drawFileManager,
		init: init
	};	
})(window.app);