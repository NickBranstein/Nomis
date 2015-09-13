var Nomis = function () {
    var levelsRunning = false;
    var story = document.getElementById('storyText');
    
    var g = new ga(640, 480, function(){
        // this is the setup function
        g.state = startGame;
    }, ['assets/spritemap.png']); //195 x 195, 91 x 98, 41 x 49, 45 x 49

    // Start Game State
    var startGame = function() {
        if(g.stage.children.length > 0)
            return;
            
        createStart('Welcome to nomiS!');
    };
    
    var level = function (difficulty) {
        if(levelsRunning)
            return;
            
        var endLevels = function(){
            levelsRunning = false;
            g.state = endGame;
        };
        
        soundManager.playBg();
        
        var lm = new levelManager(g, difficulty);
        lm.startLevels(endLevels);
        levelsRunning = true;
    }
    
    // End Game State
    var endGame = function(){
        if(g.stage.children.length > 0)
            return;
            
        soundManager.stopBg();
        
        soundManager.playGameOver();
        createStart('Game Over!');
    };
    
    var createStart = function(message){
        var startMessage = g.text(message, '40px Wawati SC', 'white');
        var easy = g.text('easy', 'Wawati SC', 'rgba('+constants.colors[1]+',1)')
        easy.scaleX = easy.scaleY = 2;
        var medium = g.text('medium', 'Wawati SC', 'rgba('+constants.colors[3]+',1)')
        medium.scaleX = medium.scaleY = 2;
        var hard = g.text('hard', 'Wawati SC', 'rgba('+constants.colors[0]+',1)')
        hard.scaleX = hard.scaleY = 2;
               
        g.stage.putCenter(startMessage, -100);
        g.stage.putCenter(easy, -75, 100);
        g.stage.putCenter(medium, 0, 100);
        g.stage.putCenter(hard, 75, 100);
        
        hard.interactive = medium.interactive = easy.interactive = true;      
        
        hard.over = medium.over= easy.over = function(){
            soundManager.playStartHover();  
        };
        
        hard.release = function() {
            createContinueButton(5);            
            
            g.remove(startMessage);
            g.remove(easy);
            g.remove(medium);
            g.remove(hard);
            hard.release = medium.release = easy.release = null;
            hard.over = medium.over = easy.over = null;
            story.style.display = '';
            story.className = 'story';
            soundManager.playStory();
        };
        
        medium.release = function() {
            createContinueButton(2);            
            
            g.remove(startMessage);
            g.remove(easy);
            g.remove(medium);
            g.remove(hard);
            hard.release = medium.release = easy.release = null;
            hard.over = medium.over = easy.over = null;
            story.style.display = '';
            story.className = 'story';
            soundManager.playStory();
        };
        
        easy.release = function() {
            createContinueButton(0);            
            
            g.remove(startMessage);
            g.remove(easy);
            g.remove(medium);
            g.remove(hard);
            hard.release = medium.release = easy.release = null;
            hard.over = medium.over = easy.over = null;
            story.style.display = '';
            story.className = 'story';
            soundManager.playStory();
        };
    };

    var init = function() {
        g.start();
    };
    
    var createContinueButton = function(difficulty) {
        var continueButton = g.text('Continue', 'Wawati SC', 'white');
            continueButton.interactive = true;
            g.stage.putCenter(continueButton, 0, 50);
            
            continueButton.release = function(){
                g.remove(continueButton);
                continueButton.release = null;
                story.style.display = 'none';
                story.className = '';
                soundManager.playEntrance();
                g.state = level(difficulty);
            };
    }
	
	return {
		init: init
	}
};

document.addEventListener("DOMContentLoaded", function(event) { 
    var game = new Nomis();
    game.init();
});