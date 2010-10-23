
(function(app) {
	var wand = app.controls.wand = { id: 'wand' };
	
	wand.activate = function(e) {
		$(app.container).css("cursor", "move");
	};
	wand.deactivate = function(e) {
		$(app.container).css("cursor", "normal");
	};
	wand.mousemove = function(e) {
	
	};
	wand.mousestart = function(e) {
	
	};
	wand.mouseend = function(e) {
	
	};
	
})(window.app);