
(function(app) {

app.file = function(opts) {
	var file = { };
	
	file.opts = opts;
	file.name = opts.name;
	
	var container = file.container = $(app.files.template).tmpl([opts]);
	var editor = file.editor = file.container.find(".editor");
	var selection = file.selection = [];
	var width = file.width = opts.size[0];
	var height = file.height = opts.size[1];
	
	var layers = file.layers = [];
	var mask = $("<canvas class='mask'></canvas>").appendTo(editor);
	var maskContext = mask[0].getContext("2d");
	
	
	file.scroller = file.container.find('.editor-container');
	
	file.addlayer = function(layer) {
		layer.redraw(width, height);
		layer.container.appendTo(editor);
		layer.ind = layers.length;
		layers.push(layer);
		file.orderLayers();
	};
	file.removeLayer = function() {
	
	};
	file.getMask = function() {
		mask.attr({width: editor.width(), height: editor.height()});
		return mask;
	};
	file.eachPx = function(cb) {
	};
	file.removeMask = function() {
		mask.remove();
	};
	file.getSelection = function() {
		return selection;
	};
	file.setSelection = function(sel) {
		selection = sel;
	};
	file.clearSelection = function() {
	
	};
	file.addSelection = function(startPos, endPos) {
		var startX = Math.min(startPos[0], endPos[0]),
			startY = Math.min(startPos[1], endPos[1]),
			endX = Math.max(startPos[0], endPos[0]),
			endY = Math.max(startPos[1], endPos[1]),
			width = Math.abs(endX - startX),
			height = Math.abs(endY - startY),
			top = startY,
			left = startX;
			
		selection = [[startX, startY], [endX, endY]];
		
		file.getSelectedCanvas();
		maskContext.strokeRect(left, top, width, height);
		//var sel = $("<div class='selection'></div>").css({ top: top, left: left }).width(width).height(height);
		//file.editor.append(sel);
	};
	
	file.getSelectedCanvas = function() {
		if (!selection.length) return null;
		
		var startX = selection[0][0],
			startY = selection[0][1],
			endX = selection[1][0],
			endY = selection[1][1],
			width = endX - startX,
			height = endY - startY,
			layer = layers[0],
			canvas = document.createElement('canvas'),
			context = canvas.getContext('2d');
		
		canvas.width = width;
		canvas.height = height;
		context.drawImage(layer.canvas, startX, startY, width, height, 0, 0, width, height);
		return canvas;
	};
	file.setSelectedCanvas = function(canvas) { 
		if (!selection.length) return null;
		
		var startX = selection[0][0],
			startY = selection[0][1],
			endX = selection[1][0],
			endY = selection[1][1],
			width = endX - startX,
			height = endY - startY,
			layer = layers[0];
			
		layer.context.drawImage(canvas, startX, startY);
	};
	
	file.process = function(effect) {
		var image = layers[0].images[0]; 
		var options = { };
		var selectedCanvas = file.getSelectedCanvas();
		Pixastic.process(selectedCanvas, effect, options);
		file.setSelectedCanvas(options.resultCanvas);
		return options;
	};
	file.removeSelection = function() {
		file.editor.find(".selection").remove();
	};
	
	file.orderLayers = function() {
		var j = layers.length;
		for (var i = 0; i < layers.length; i++) {
			layers[i].container.css({zIndex: j--});
		}
	};
	file.resetLayerOrder = function(newOrder) {
	
		var newLayers = [];
		
		for (var i = 0; i < newOrder.length; i++) {
			var layer = layers[newOrder[i]];
			layer.ind = i;
			newLayers.push(layer);
			
		}
		
		layers = newLayers;
		file.orderLayers();
		file.makeActive();
	};
	
	file.makeActive = function() {
		app.files.current && app.files.current.container.removeClass("active");
		app.files.current = file;
		container.addClass("active");
		var allLayers = $("#templateLayer").tmpl(layers);
		$("#layer-list").empty().append(allLayers).sortable({
			update: function(e, ui) {
				file.resetLayerOrder($(this).find("li").map(function() {
					return $(this).attr("data-ind");
				}).get());
				
			}
		});
	};
	
	file.editor.width(width).height(height);
	file.container.appendTo(app.container).width(width + file.editor.position().left).height(height + 70);
	
	file.container.draggable({ 
		handle: '.file-title',
		containment: 'parent'
	});
	
	file.container.resizable({
		alsoResize: file.scroller[0],
		stop: app.resize,
		minHeight: 100,
		minWidth: 200,
		containment: 'parent'
	});
	
	file.container.find(".file-title").mousedown(function() {
		file.makeActive();
	});
	
	// position is set to relative by resizable, we need it to be absolute
	file.container.css({ 
		top: opts.position[0], 
		left: opts.position[1],
		position: 'absolute'
	});
	
	$(file.editor).bind("mousemove mousedown mouseup", { file: file }, app.controldispatcher.dispatch);
	
	return file;
};

})(window.app);