var Player = function() {
    var that = {};
    
    var FPS = 25;    
    var GROUND_Y = 133;

    // !TODO Setup up these at one place
    var canvas = document.getElementById('canvas');
    var width = canvas.width;
    var height = canvas.height;    
    var context = canvas.getContext('2d');          

    var image = new Image();
    image.src = "MM.png";

    var position = {x:50, y:-20};
    var x = 50;
    var y = -20;
	that.getX = function() {
		return x;
	}
	that.getY = function() {
		return y;
	}
    // speed
    var speed = {vx:5, vy:-14};
    var vx = 5;
    var vy = -14;
    var gravity = 3;
    
    // animations
    var runningRight = [
        {spriteX: 0, spriteY:0, spriteW:25, spriteH:30},
        {spriteX: 25, spriteY:0, spriteW:25, spriteH:30},
        {spriteX: 50, spriteY:0, spriteW:25, spriteH:30},
        {spriteX: 25, spriteY:0, spriteW:25, spriteH:30}        
    ];
    var runningLeft = [
        {spriteX: 0, spriteY:30, spriteW:25, spriteH:30},
        {spriteX: 25, spriteY:30, spriteW:25, spriteH:30},
        {spriteX: 50, spriteY:30, spriteW:25, spriteH:30},
        {spriteX: 25, spriteY:30, spriteW:25, spriteH:30}        
    ];
    var standingLeft = [
        {spriteX: 0, spriteY:60, spriteW:25, spriteH:30},
        {spriteX: 0, spriteY:60, spriteW:25, spriteH:30},
        {spriteX: 0, spriteY:60, spriteW:25, spriteH:30},
        {spriteX: 0, spriteY:60, spriteW:25, spriteH:30},
        {spriteX: 0, spriteY:60, spriteW:25, spriteH:30},
        {spriteX: 0, spriteY:60, spriteW:25, spriteH:30},        
        {spriteX: 25, spriteY:60, spriteW:25, spriteH:30}            
    ];
    var standingRight = [
        {spriteX: 0, spriteY:90, spriteW:25, spriteH:30},
        {spriteX: 0, spriteY:90, spriteW:25, spriteH:30},
        {spriteX: 0, spriteY:90, spriteW:25, spriteH:30},
        {spriteX: 0, spriteY:90, spriteW:25, spriteH:30},
        {spriteX: 0, spriteY:90, spriteW:25, spriteH:30},
        {spriteX: 0, spriteY:90, spriteW:25, spriteH:30},            
        {spriteX: 25, spriteY:90, spriteW:25, spriteH:30}         
    ];
    var jumpingLeft = [
        {spriteX: 59, spriteY:87, spriteW:30, spriteH:35},
        {spriteX: 59, spriteY:87, spriteW:30, spriteH:35}            
    ];
    var jumpingRight = [
        {spriteX: 90, spriteY:87, spriteW:30, spriteH:35},
        {spriteX: 90, spriteY:87, spriteW:30, spriteH:35}            
    ];        
    
    var animationFrames = jumpingRight;
    var currentFrame = 0;
    var timeBetweenFrames = 1/FPS;
    // Time until the next frame
    var timeSinceLastFrame = timeBetweenFrames;
    var lastFrame = new Date().getTime(); 

	// !TODO Should this be here?
	var level;
	that.setLevel = function(newLevel) {
		level = newLevel;
	}
    
    var moving = false;
    var jumping = true;       
    var direction = 1; // right
	
	// Check player boundaries
	var onGround = function() {
		var colorLeft = level.getPixelColor(Math.round(x/16), Math.round((y+23)/16));
		var colorRight = level.getPixelColor(Math.round((x+25)/16), Math.round((y+23)/16));
		if(colorLeft !== 'rgba(0,0,0,255)' && colorRight !== 'rgba(0,0,0,255)') {
			$('#pixelOutput').html('<strong>Falling down!</strong><br>' + colorLeft + "<br>" + colorRight);
		} else {
			$('#pixelOutput').html('<strong>Ok!</strong><br>' + colorLeft + "<br>" + colorRight);
		}
	}
    	
    that.update = function(input) {
        // Calculate time since the last frame
        var thisFrame = new Date().getTime();
        var dt = (thisFrame - lastFrame) / 1000;
        lastFrame = thisFrame;
        timeSinceLastFrame = timeSinceLastFrame - dt;
        
        // Moving? Update animation type and state
        if(input.buttons[input.BUTTON_RIGHT]) {
            animationFrames = runningRight;
            moving = true;
            direction = 1;
        } else if(input.buttons[input.BUTTON_LEFT]) {
            animationFrames = runningLeft;
            moving = true;
            direction = -1;
        } else if(!jumping){
            moving = false;
            if(direction == 1) {
                animationFrames = standingRight;
            } else {
                animationFrames = standingLeft;
            }  
        }
        
        // Jumping?
        if(input.buttons[input.BUTTON_JUMP]) {
            jumping = true;
            if(direction == 1) {
                animationFrames = jumpingRight;
            } else {
                animationFrames = jumpingLeft;
            }              
        }
        
        // Update movement
        if(moving) {
            x = x + (vx * direction);
        }        
		
        if(jumping) {
            vy = vy + gravity;
            y = y + vy;
			if(y > GROUND_Y) {
				y = GROUND_Y;
				vy = -14;
				jumping = false;
			}
		}

		onGround();
		
        // Update current animation frame 
        // at constant FPS disregarding CPU speed
        if(timeSinceLastFrame <= 0) {
            timeSinceLastFrame = timeBetweenFrames;
            currentFrame += 1;
        }
        
        // Set to start frame check
        if(currentFrame >= animationFrames.length) {
            currentFrame = 0;
        }
    };
    
    that.draw = function() {
        var text = 'pos (' + x + ', ' + y + ')';
		context.fillStyle = "#fff"; // text color
        context.fillText(text, 5, 15);

        context.drawImage(image, 
            animationFrames[currentFrame].spriteX, 
            animationFrames[currentFrame].spriteY, 
            animationFrames[currentFrame].spriteW, 
            animationFrames[currentFrame].spriteH, 
            x, 
            y, 
            animationFrames[currentFrame].spriteW, 
            animationFrames[currentFrame].spriteH
        );
    }
    
    return that;
};