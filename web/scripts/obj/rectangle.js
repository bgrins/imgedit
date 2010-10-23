// todo: would be great to define this dependancy in the main require() call
// so that this could run inside a normal self executing closure...
require(["obj/base"], function() {

var obj = window.app.obj;

obj.rectangle = obj.base.extend({
	init: function() {
		this.ctx = ctx;
		this._super();
	}
});


});

 