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
	"app/init",
	"app/clipboard",
	"app/controls",
	"app/files",
	"app/images",
	"app/layers",
	"app/loader",
	"app/sidebar"
], function() { log(app.initialize); $(app.initialize) });
