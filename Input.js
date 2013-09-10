var Input = function() {
	var that = {};

	// Arrays for holding all key input
	that.buttons = [false, false, false, false];
	oldButtons = [false, false, false, false];
	
	// System keys. private variables
	var KEY_W = 87;
	var KEY_A = 65;
	var KEY_S = 83;
	var KEY_D = 68;
	var KEY_ESACPE = 27;
	var KEY_ENTER = 13;
	var KEY_SPACE = 32;

	// Game buttons. public variables
	that.BUTTON_LEFT = 0;
	that.BUTTON_RIGHT = 1;
	that.BUTTON_JUMP = 2;
	that.BUTTON_START = 3;
	
    // Sets button pressed or not pressed
	var set = function(keynr, pressed) {
		var button = -1;
		
		if(keynr === KEY_A) { button = that.BUTTON_LEFT; }
		if(keynr === KEY_D) { button = that.BUTTON_RIGHT; }
		if(keynr === KEY_W) { button = that.BUTTON_JUMP; }
		if(keynr === KEY_ENTER) { button = that.BUTTON_JUMP; }
	
		if(button != -1) {
			that.buttons[button] = pressed;
		}
	}

    // Listener for key down
	document.onkeydown = function(event){
		var keynr = event.which;
		set(keynr, true);
	}

    // Listener for key up
	document.onkeyup = function(event){
		var keynr = event.which;
		set(keynr, false);
	}
	
	that.update = function() {
        for (var i=0; i<that.buttons.length; i++) {
            oldButtons[i] = that.buttons[i];
        }
	}

	return that;
}