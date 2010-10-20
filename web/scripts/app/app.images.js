
app.images = { };
app.images.active = [];
app.images.add = function(opts) {
	var image = app.images.instance(opts);
	app.images.active.push(image);
	return image;
};
app.images.instance = function(opts) {

	var image = { };
	
	var img = image.img = new Image();
	var canvas = image.canvas = document.createElement("canvas");
	var context = image.context = canvas.getContext('2d');
	var left = image.left = opts.position[0];
	var top = image.top = opts.position[1];
	var isReady = false;
	var readyCB = null;
		
	img.onload = function() {
		image.width = img.width;
		image.height = img.height;
		
		$(canvas).attr({
			width: image.width,
			height: image.height
		});
		
	    context.drawImage(img, 0, 0, image.width, image.height);
	    
	    isReady = true;
	    readyCB && readyCB();
	}
	
	img.src = opts.src;
	$(img).addClass("hide").appendTo("body");
	
	image.onready = function(cb) {
		if (isReady) {cb();}
		else {readyCB = cb;}
	};
	
	return image;

};
