
(function(app) {
	var selection = app.controls.selection = { id: 'selection' };
	
	var isTracking = false;
	var startPos = [];
	var endPos = [];
	var helper = $("<div class='selection-helper'></div>");
		
	selection.activate = function(e) {
	
	};
	selection.deactivate = function(e) {
	
	};
	selection.mousemove = function(e) {
		var file = e.data.file;
		
		var x1 = startPos[0], y1 = startPos[1], 
			x2 = e.data.fileX, y2 = e.data.fileY;
		if (x1 > x2) { var tmp = x2; x2 = x1; x1 = tmp; }
		if (y1 > y2) { var tmp = y2; y2 = y1; y1 = tmp; }
		
		helper.css({left: x1, top: y1, width: x2-x1, height: y2-y1});
	
	};
	selection.mousestart = function(e) {
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
	
	};
	selection.mouseend = function(e) {
		var file = e.data.file;
		isTracking = false;
		endPos = [e.data.fileX, e.data.fileY];
		helper.remove();
		file.removeMask();
		if (startPos != endPos) {
			e.data.file.addSelection(startPos, endPos);
		}
	
	};
	
	return selection;
	
})(window.app);
