
window.app.controldispatcher = (function(app) {

	var controls = [];
	var activeControl;
	var eventMap = { 
		'mousemove': 'mousemove',
		'mousedown': 'mousestart',
		'mouseup': 'mouseend'
	};
	
	function drawControls() {
		var allControls = $.tmpl("control", controls);
		$("#control-list").append(allControls);
	}
	
	function bindControls() {
					
		$("#control-list").click(function(e) {	
			if ($(e.target).is("li")) {
				
				var clickedControl = $(e.target),
					oldActiveControl = activeControl,
					newActiveControl = controls[clickedControl.attr("data-index")],
					shouldActivate = true;
				
				
				if (oldActiveControl && oldActiveControl.deactivate) {
					oldActiveControl.deactivate();
				} 
				if (newActiveControl.activate) {
					newActiveControl.activate();
				} 
				
				// TODO: allow a control to return false on activate to prevent
				// from becoming active
				if (shouldActivate) {
					activeControl = newActiveControl;
					clickedControl.addClass("active").siblings().removeClass("active");
				}
				
			}
		});
	
	}
		
	function dispatch(e) {
		var mappedCallback = eventMap[e.type];
		if (activeControl && activeControl[mappedCallback]) {
		    var fileOffset = e.data.file.editor.offset();
		    e.data.fileX = e.pageX - fileOffset.left;
		    e.data.fileY = e.pageY- fileOffset.top;
		    
		    activeControl[mappedCallback](e);
		}
	}

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
