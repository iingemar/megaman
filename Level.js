var Level = function() {
    var that = {};

    // !TODO Setup up these at one place
    var canvas = document.getElementById('canvas');
    var width = canvas.width;
    var height = canvas.height;    
    var context = canvas.getContext('2d');

    // Load tile sprite
    var tileImage = new Image();
    tileImage.src = "quickman.png";        
    // Set different tiles
    var tiles = {
        up: {x:1, y:18, w:16, h:16},
        left: {x:18, y:18, w:16, h:16},                
        right: {x:18, y:35, w:16, h:16},        
        filling: {x:1, y:52, w:16, h:16},
        fillingWithMiddleBeam: {x:35, y:1, w:16, h:16},
        edgeRight: {x:86, y:1, w:16, h:16},
        edgeLeft: {x:69, y:1, w:16, h:16},
        orangeFilling: {x:35, y:35, w:16, h:16}
    };
    
    // Sounds!
    // var soundtrack = new Audio("quickman.mp3");
    // soundtrack.play();    
    
    // Draws one tile at position (x, y)
    var drawTile = function(tile, x, y) {
        context.drawImage(tileImage,
            tile.x,
            tile.y,
            tile.w,
            tile.h,
            x,
            y,
            tile.w,
            tile.h
        );
    }        
    
    // Draws row of tiles til end of screen,
    // starting at position (x, y).
    var drawTiles = function(tile, x, y) {
        for(var x=0; x<width; x=x+tile.w) {
            drawTile(tile, x, y);
        }
    }
    
    // Draws row of tiles til given x position,
    // starting at position (x, y).
    var drawTiles = function(tile, startX, y, endX) {
        for(var x=startX; x<endX; x=x+tile.w) {
            drawTile(tile, x, y);
        }
    }    

    // Draws a 16x16 grid system
    var drawGrid = function() {
        var gridSize = 16;
        context.beginPath();
        // vertical lines
        for(var x=0; x<width; x=x+gridSize) {
            context.moveTo(x, 0);
            context.lineTo(x, height);           
        }
        // horizontal lines
        for(var y=0; y<height; y=y+gridSize) {
            context.moveTo(0, y);
            context.lineTo(width, y);           
        }        
        context.strokeStyle = "#ccc";            
        context.stroke();       
    }    


	// Public function. Gets a pixel
    that.getPixelColor = function(x, y) {
		// The values in the data array are arranged in groups of four. Each four ints 
		// represent the red, green, blue, and alpha value of a single pixel.
        var offset =  x * 4 + y * 4 * imageData.width;
		// They are arranged from the left to right and top to bottom of the image.
		// Thus imageData.data[0] would be the red value (0-255) of the top left pixel. 
        var r = imageData.data[offset];
		// And imageData.data[1] would be the green value (0-255) of the same pixel. 
        var g = imageData.data[offset + 1];
		// Blue (0-255)
        var b = imageData.data[offset + 2];
		// Alpha value (0-255)
        var a = imageData.data[offset + 3];        
        return "rgba("+r+","+g+","+b+","+a+")";        
    }

	// Tiles tiles ..
	var imageTiles = [];
    imageTiles['rgba(0,0,0,255)'] = {x:1, y:18, w:16, h:16};        // up
	imageTiles['rgba(178,0,255,255)'] = {x:86, y:1, w:16, h:16};    // edgeRight
	imageTiles['rgba(0,255,33,255)'] = {x:18, y:35, w:16, h:16};    // right
	imageTiles['rgba(0,38,255,255)'] = {x:69, y:1, w:16, h:16}      // edgeLeft
	imageTiles['rgba(0,255,255,255)'] = {x:18, y:18, w:16, h:16};   // left
	imageTiles['rgba(255,216,0,255)'] = {x:52, y:18, w:16, h:16};   // cornerLeft
	imageTiles['rgba(255,106,0,255)'] = {x:1, y:52, w:16, h:16};    // metalFilling
	imageTiles['rgba(128,128,128,255)'] = {x:35, y:35, w:16, h:16}    // orangeFilling

	// Get pixels for stage
	var stageCanvas = document.getElementById('stage');
	var stageContext = stageCanvas.getContext('2d');
	var stageImage = document.getElementById('image');
	var imageData;
    stageImage.onload = function() {
        stageContext.drawImage(stageImage, 0, 0);
		// canvas.getImageData(x, y, w, h)
        imageData = stageContext.getImageData(0, 0, stageCanvas.width, stageCanvas.height);
    }
	
	var playerX = 0;
	var playerY = 0;
	
    // Public function for updating this level
    that.update = function(playerX, playerY) {
        this.playerX = playerX;
		this.playerY = playerY;

		
    }
    
    // Public function for drawing this level
    that.draw = function() {
        drawGrid();
		
		// For each (x,y) in pixel stage
		for(var x=0; x<stageCanvas.width; x++) {
			for(var y=0; y<stageCanvas.height; y++) {
				// Get that color
				var color = that.getPixelColor(x, y);
				$('#output').html(color);
				// Get corresponding tile
				var tile = imageTiles[color];
				if(tile !== undefined) {
					// And draw! ^__^
					drawTile(tile, x*16, y*16);
				}
			}
		}
		
		// Draw player box
		context.strokeStyle = "#FFF";
		context.lineWidth = 1;
		context.strokeRect(this.playerX, this.playerY, 25, 30);
    }
    
    return that;
}