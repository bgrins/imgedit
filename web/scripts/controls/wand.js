
app.controls.wand = (function(app) {
	var wand = { id: 'wand' };
	
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
	
	return wand;
	
})(window.app);