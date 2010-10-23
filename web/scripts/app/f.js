(function() {

// the file stores data that will be needed for import/export
// layers, paths, images, etc
app.file2 = Backbone.Model.extend({
	initialize: function() {
			
	},
	export: function() {
	
	},
	getImageData: function() {
	
	},
	setImageData: function() {
	
	}
});

// the fileset manages all the files stored on the page
// it includes both open and closed files, and currently handles the
// view logic as well.
app.fileset = Backbone.Collection.extend({
  model: app.file2,
  url: '/files',
  initialize: function(options) {
  	log("initializing collection", this, options);
  }, 
  openedIds: function() {
  
  },
  openAll: function(ids) {
  	
  },
  closeAll: function(ids) {
  
  }
});

log("todo: implement file model and collections", app.file2, app.fileset);
})(window.app)