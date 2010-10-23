
/* Author: Brian Grinstead
App are implemented using a variety of techniques
Controls are implemented using the module pattern
Obj are implemented using simple inheritance
*/

window.app = { controls: { }, obj: { } };
require([
	"lib/common", 
	"lib/util", 
	"lib/backbone",
	"lib/jquery.tmpl",
	"lib/jquery.hotkeys",
	"lib/jquery-ui-1.8.5.min",
	"lib/fake",
	"lib/pixastic",
	"lib/colorpicker",
	"app/init",
	"app/clipboard",
	"app/f",
	"app/file",
	"app/files",
	"app/images",
	"app/layers",
	"app/loader",
	"app/controldispatcher",
	"app/filemanager",
	"controls/blur",
	"controls/pointer",
	"controls/rect",
	"controls/selection",
	"controls/wand",
	"obj/base",
	"obj/image",
	"obj/rectangle"
], function() { $(app.initialize) });
