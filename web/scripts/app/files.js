
(function(app) {

app.files = { };
app.files.active = [];
app.files.current = null;
app.files.dom = $([]);
app.files.template = "#templateFile";

app.files.setActive = function(file) {
	if (app.files.current) {
		app.files.current.container.removeClass("active");
		app.files.current.editor.unbind("mousemove mousedown mouseup");	
	}
	
	app.files.current = file;
	file.container.addClass("active");
	file.editor.bind("mousemove mousedown mouseup", { file: file }, app.controldispatcher.dispatch);
	file.drawLayers();
};
app.files.add = function(opts) {
	var file = app.file(opts);
	app.files.active.push(file);
	app.files.dom.add(file.container);
	return file;
};

})(window.app);
  