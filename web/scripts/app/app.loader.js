
app.load = function(files) {
	for (var i = 0; i < files.length; i++) {
		var file = app.load.file(files[i]);
	}
};

app.load.file = function(fileData) {
	var file = app.files.add(fileData);
	var layers = fileData.layers;
	
	for (var i = 0; i < layers.length; i++) {
	    var layer = app.load.layer(fileData.layers[i]);
	    file.addlayer(layer);
	}

	return file;
};
app.load.layer = function(layerData) {
	var layer = app.layers.add(layerData);
	var images = layerData.images;
	
	for (var i = 0; i < images.length; i++) {
		var image = app.load.image(images[i]);
		layer.addimage(image);
	}
	
	return layer;
};
app.load.image = function(imageData) {
	return app.images.add(imageData);
};