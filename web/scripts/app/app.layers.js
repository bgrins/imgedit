
app.layers = { };
app.layers.active = [];

app.layers.add = function(opts) {
	var layer = app.layers.instance(opts);
	app.layers.active.push(layer);
	
	
	return layer;
};

app.layers.instance = function(opts) {
	var layer = { };
	layer.className = 'layer' + opts.name;
	layer.name = opts.name;
	layer.visible = opts.visible === false ? false : true;
	layer.images = [];
	
	var canvas = layer.canvas = document.createElement("canvas");
	var context = layer.context = canvas.getContext('2d');
	var container = layer.container = $(canvas).attr('name', layer.name);;
	
	layer.redraw = function(width, height) {
		layer.container.attr({width:width, height:height});
		layer.drawAllImages();
	};
	layer.drawAllImages = function() {
		for (var i = 0 ; i < layer.images.length; i++) {
			layer.drawImage(layer.images[i]);
		}
	};
	layer.drawImage = function(image) {
		context.drawImage(image.canvas, image.left, image.top);
	};
	layer.addimage = function(image) {
		$(image.canvas).attr("class", layer.className);
		layer.images.push(image);
		image.onready(layer.drawAllImages);
	};
	
	
	layer.getPx = function(coord) {
	
	};
	layer.removeimage = function(image) {
	
	};
	layer.hide = function() {
		layer.visible = false;
		$(container).hide();	
	};
	layer.show = function() {
		layer.visible = true;
		$(container).show();
	};
	return layer;
};

