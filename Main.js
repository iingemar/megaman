$(function() {
    var canvas = document.getElementById('canvas');
    var width = canvas.width;
    var height = canvas.height;    
    var context = canvas.getContext('2d');     
    context.lineWidth = 0.5;
    
	// Initialize components
	var input = Input();
    var level = Level();    
    var player = Player();
	player.setLevel(level);
    
	// Update
    var update = function(input) {
        level.update(player.getX(), player.getY());  // start, escape etc should be handled here?
        player.update(input);
    }
    
	// Draw
    var draw = function() {
        context.clearRect(0, 0, width, height);    
        level.draw();        
        player.draw();
    }
        
    setInterval(function() {
        update(input);
        draw();
    }, 1000/25);
});