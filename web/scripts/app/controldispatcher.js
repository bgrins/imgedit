
window.app.controldispatcher = (function(app) {

	var controls = [];
	
	function drawControls() {
		var allControls = $.tmpl("control", controls);
		$("#control-list").append(allControls);
	}
	function dispatchControl(e) {
		$(app.container).trigger("control." + e.type, [e]);
	}
	function bindControl(control, eventName, callbackName) {
		var cb = control[callbackName];
		cb && $(app.container).bind(eventName, function(e, oe) {
		    var fileOffset = oe.data.file.editor.offset();
		    oe.data.fileX = oe.pageX - fileOffset.left;
		    oe.data.fileY = oe.pageY- fileOffset.top;
		    cb(oe)
		});
	}
	
	function bindControls() {
	
		var events = ["control.mousemove", "control.mouseup", "control.click", "control.mousedown"],
			activeControl = null;
		
		$("#control-list").click(function(e) {	
			if ($(e.target).is("li")) {
				
				var clickedControl = $(e.target),
					oldActiveControl = activeControl,
					activeControl = controls[clickedControl.attr("data-index")];
					
				oldActiveControl && oldActiveControl.deactivate && oldActiveControl.deactivate();
				activeControl.activate && activeControl.activate();
				
				clickedControl.addClass("active").siblings().removeClass("active");
				
				$.each(events, function(i,el) { $(app.container).unbind(el); });
				bindControl(activeControl, "control.mousemove", "mousemove");
				bindControl(activeControl, "control.mousedown", "mousestart");
				bindControl(activeControl, "control.mouseup", "mouseend");
			}
		});
	
	}
		
	function dispatch(e) {
		$(app.container).trigger("control." + e.type, [e]);
	};

	function init() {
		var ind = 0;
		
		for (var i in app.controls) {
			var control = app.controls[i];
			control.id = i;
			control.ind = ind++;
			controls.push(control);
		}
		
		drawControls();
		bindControls();
	}
	
	return {
		init: init,
		dispatch: dispatch		
	};
	
})(window.app);
