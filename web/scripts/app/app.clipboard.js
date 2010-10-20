
app.clipboard = (function() {

var clipboard = { };
var board = null;
clipboard.copy = function() {
	log("here");
	board = { touhed: true };
	//board = app.files.active.getSelection();
	
};
clipboard.paste = function() {
	log("HERE", clipboard.getData())
	//app.files.active.setSelection(clipboard.getData);
}
clipboard.getData = function() {
	return board;
};

return clipboard;

})();