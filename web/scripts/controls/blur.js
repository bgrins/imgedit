
app.controls.blur = (function(app) {
	var blur = { id: 'blur' };
	
	blur.activate = function(e) {
	
	};
	blur.deactivate = function(e) {
	
	};
	blur.mousemove = function(e) {
	
	};
	blur.mousestart = function(e) {
		var file = e.data.file;
		var output = file.process('sepia');
	
	};
	blur.mouseend = function(e) {
	
	};
	
	return blur;
})(window.app);

