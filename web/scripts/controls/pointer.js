
(function(app) {
	
	var pointer = app.controls.pointer = { id: 'pointer' };
	
	pointer.activate = function(e) {
		$(app.container).css("cursor", "move");
	};
	pointer.deactivate = function(e) {
		$(app.container).css("cursor", "normal");
	};
	pointer.mousemove = function(e) {
	
	};
	pointer.mousestart = function(e) {
	
	};
	pointer.mouseend = function(e) {
	
	};
	
})(window.app);