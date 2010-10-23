
(function() {

var app = this.app || (this.app = { });

app.files = { };
app.files.active = [];
app.files.current = null;
app.files.dom = $([]);
app.files.template = "#templateFile";

app.files.add = function(opts) {
	var file = app.file(opts);
	app.files.active.push(file);
	app.files.dom.add(file.container);
	return file;
};

})();
  