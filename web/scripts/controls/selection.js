// The selection control does not manage the logic for the file processing data on a selection
// (for example, filling a color only in the selected area, or dealing with layers, etc)
// It only defines what happens when the user drags out a selection, uses handles to resize a selection
// uses ctrl/alt to modify a selection, etc.  Once the interaction is done, it passes the selection to the file

(function(app) {

var selection = app.controls.selection = { id: 'selection' };

var isTracking = false,
	startPos = [],
	endPos = [],
	currentMask,
	currentContext;
	
function selectionToContext(selection, context) {
    // will copy this is if there is an existing selection when mouse starts
    // (used for changing selection size, for example)
    // This is especially needed if selection is being used over multiple files
    
}
function contextToSelection(context) {
    var width = context.canvas.width,
    	height = context.canvas.height,
    	imageData = context.getImageData(0, 0, width, height);
    
    // copy data from selection mask into array of points
    var selection = [];
    for (var i = 0; i < width; i++) {
    	for (var j = 0; j < height; j++) {
    		var alpha = imageData.data[(i*width*4) + (j*4) + 3];
    		if (alpha == 25) { 
    			//temporarily using alpha value from selection mask
    			selection.push([i,j]);
    		}
    	}
    }
    
    return selection;
}

selection.activate = function(e) {

};
selection.deactivate = function(e) {

};
selection.mousemove = function(e) {
    if (isTracking) {
    	// need to take into account holding alt/ctrl to modify selection
    	// also need to be able to drag handles to change size
    	var file = e.data.file;
    	
    	var x1 = startPos[0], y1 = startPos[1], 
    		x2 = e.data.fileX, y2 = e.data.fileY;
    	if (x1 > x2) { var tmp = x2; x2 = x1; x1 = tmp; }
    	if (y1 > y2) { var tmp = y2; y2 = y1; y1 = tmp; }
    	
    	var width = x2-x1,
    		height = y2-y1;
    	
    	// clear the canvas
    	currentMask[0].width = currentMask[0].width;
    	
    	currentContext.fillStyle = 'rgba(0, 0, 200, 0.1)';
    	currentContext.strokeStyle = '#000';
    	currentContext.rect(x1, y1, width, height);
    	//currentContext.stroke();
    	currentContext.fill();
    }
};

selection.mousestart = function(e) {
    var file = e.data.file,
    	selection = file.getSelection();
    
    currentMask = file.getMask();
    currentContext = currentMask[0].getContext("2d");
    selectionToContext(selection, currentContext);
    
    isTracking = true;
    startPos = [e.data.fileX, e.data.fileY];
};

selection.mouseend = function(e) {
	// todo: have controldispatcher trigger mouseend when leaving file container,
	// document losing focus, etc

    var file = e.data.file;
    isTracking = false;
    endPos = [e.data.fileX, e.data.fileY];
    
    var selection = contextToSelection(currentContext);
    file.setSelection(selection);
    
    // todo: need to get rid of call to addSelection, and instead have file
    // handle the logic of calling things like pixastic using the selection()
    // array. 
    if (startPos != endPos) {
    	e.data.file.addSelection(startPos, endPos);
    }

};
	
})(window.app);
