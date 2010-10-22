



app.controls = { };
app.controls.pointer = {
	id: 'pointer',
	alt: 'pointer',
	activate: function() {
		$(app.container).css("cursor", "move");
	},
	deactivate: function() {
		$(app.container).css("cursor", "normal");
	
	},
	mousemove: function(e) {
		
	},
	mousestart: function(e) {
	
	},
	mouseup: function(e) {
	
	}
};
app.controls.select = (function() {
	var control = { };
	
	var isTracking = false;
	var startPos = [];
	var endPos = [];
	var helper = $("<div class='selection-helper'></div>");
		
	control.id = 'select';
	control.alt = 'select',
	control.activate = function() {
	
	};
	control.mousemove = function(e) {
		var file = e.data.file;
		
		var x1 = startPos[0], y1 = startPos[1], 
			x2 = e.data.fileX, y2 = e.data.fileY;
		if (x1 > x2) { var tmp = x2; x2 = x1; x1 = tmp; }
		if (y1 > y2) { var tmp = y2; y2 = y1; y1 = tmp; }
		
		helper.css({left: x1, top: y1, width: x2-x1, height: y2-y1});
	};
	control.mousestart = function(e) {
		var file = e.data.file;
		file.removeSelection();
		file.addMask();
		helper.css({
			"left": e.data.fileX,
			"top": e.data.fileY,
			"width": 0,
			"height": 0
		}).appendTo(file.editor);
		
		isTracking = true;
		startPos = [e.data.fileX, e.data.fileY];
	},
	control.mouseup = function(e) {
		var file = e.data.file;
		isTracking = false;
		endPos = [e.data.fileX, e.data.fileY];
		helper.remove();
		file.removeMask();
		if (startPos != endPos) {
			e.data.file.addSelection(startPos, endPos);
		}
	};
	control.deactivate = function() {
	
	};
	
	return control;

})();

app.controls.blur = (function() {
	var control = { };
	control.id = 'blur';
	control.alt = 'blur',
	control.activate = function() {
	};
	control.mousestart = function(e) {
		var file = e.data.file;
		var output = file.process('sepia');
	};
	return control;
})();

app.controls.fill = (function() {
	var control = { };
	control.id = 'fill';
	control.alt = 'fill',
	control.activate = function() {
	};
	control.mousestart = function(e) {
		var file = e.data.file;
		var output = file.process('sepia');
	};
	return control;
})();


app.controls.wand = {
	id: 'wand',
	alt: 'wand',
	activate: function() {
	
	},
	deactivate: function() {
	
	}
};

/*
app.controls.blur = (function() {
	var control = { };
	control.id = 'blur';
	control.alt = 'blur',
	control.activate = function() {
	};
	control.mousemove = function(e) {
	};
	control.mousestart = function(oe, e) {
	},
	control.mouseup = function(oe, e) {
	};
	control.deactivate = function() {
	
	};
	return control;
})();
*/