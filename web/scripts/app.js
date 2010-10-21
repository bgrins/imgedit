/* If app has not been defined, create an object for it,
but unless if app.run exists, we will not run the scripts.

This allows us to pull down the js for the app 
*/

window.app = { };
require([
	"lib/common", 
	"lib/util", 
	"lib/jquery.tmpl",
	"lib/jquery.hotkeys",
	"lib/jquery-ui-1.8.5.min",
	"lib/fake",
	"lib/pixastic",
	"lib/colorpicker",
	"app/app.init",
	"app/app.clipboard",
	"app/app.controls",
	"app/app.files",
	"app/app.images",
	"app/app.clipboard",
	"app/app.layers",
	"app/app.loader"
]);
