var levelManager = function(g, difficulty){
	var generateBoss = function(){
		var temp = g.sprite(g.frames('assets/spritemap.png', constants.bossSpriteMap, 45.33, 49)); //91, 98
		temp.fps = 6;
		temp.scaleX = 2;
		temp.scaleY = 2;
		g.stage.putRight(temp, -91, -(120));
		return temp;
	};
	
	var createLifeText = function(){
		var temp = 	g.text('Lives left: ' + lives, '24px Wawati SC', 'white');
		g.stage.putLeft(temp, temp.width + 10, 200);
		return temp;
	};	
	
	var levelModifier = difficulty;
	var levels = [1,3 + levelModifier,4 + levelModifier,5 + levelModifier,6 + levelModifier];
	var currentLevel = 0;
	var gameover, shapes, pattern, reversedPattern, clicks;	
	var boss = generateBoss();
	var lives = 5 - difficulty <= 1 ? 2 : 5 - difficulty;
	var lifeText = createLifeText();
	
	var shuffle = function(array){
		for(var i = array.length - 1; i > 0; i--){
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}	
		
		return array;
	};
	
	var startLevels = function(endCallback){
		playBossAnimationSequence();
		shapes = null;
		pattern = [];
		reversedPattern = [];
		clicks = 0;
		gameover = endCallback;
		
		if(currentLevel == 0){
			shapes = g.circle(250, "rgba("+constants.colors[0]+",.5)", "rgba("+constants.colors[0]+",.8)", 3);
			g.stage.putCenter(shapes);
			pattern.push(shapes);
			shapes.soundIndex = 0;
			
			shapes.release = function(){
				g.remove(shapes);
				checkForNextLevel();
			};
		} else {
			shapes = g.complexShape(levels[currentLevel], 150, 0, 0);
			shapes.boardShapes.forEach(function(shape){
					g.stage.putCenter(shape);
					pattern.push(shape);
						
					shape.soundIndex = pattern.length % 6;
					
					shape.press = function(){
						shape.alpha = 0.0;
						shape.singleFlash = true;
						shape.flash = true;
						soundManager.playFlashSound(shape.soundIndex);
					};
					
					shape.release = function() {
						clicks++;
						if(checkClickOrder(shape, reversedPattern, clicks)) {																		
							// Did we click the last shape corretly?
							if(clicks >= shapes.boardShapes.length){
								cleanupShapes();
								checkForNextLevel();
							}	
						}
						else{
							soundManager.playFail();
							shapes.boardShapes.forEach(function(s){
								s.interactive = false;
							});
							document.getElementById('canvas').className = 'flash';
							clicks = 0;
							lives--;
							updateLifeText();
							playBossAnimationSequence();
							if(lives == 0) {
								callGameOver();
							}
							else{
								g.wait(2500, function(){
									document.getElementById('canvas').className = '';
									startSequence(pattern[0]);
								});
							}
						}
					};
				});
			
			pattern = shuffle(pattern);
		}
		
		for(var i = 0; i < pattern.length; i ++)
		{
			pattern[i].patternOrder = i;  // need to reverse this
			reversedPattern[i] = i;
			
			if(i == pattern.length - 1){
				pattern[i].lastShape = function(){
					shapes.boardShapes.forEach(function(shape){
						shape.interactive = true;
					});
				};
				break;
			}
				
			pattern[i].nextShape = pattern[i + 1];
		}
		
		reversedPattern.reverse();
		startSequence(pattern[0]);
	};
	
	var startSequence = function(shape){
		g.wait(1000, function(){
			shape.alpha = 0.0;
			shape.flash = true;
			soundManager.playFlashSound(shape.soundIndex != undefined ? shape.soundIndex : 0);
		});
	};
	
	var checkClickOrder = function(shape, matchPattern, clickNumber){
		return matchPattern[clickNumber - 1] == shape.patternOrder;
	};
	
	var checkForNextLevel = function(){
		playBossExplosion();
		
		g.wait(3000, function(){
			currentLevel++;
		
			if(currentLevel == levels.length)
			{
				callGameOver();
			}
			else{
				startLevels(gameover);	
			}
		});
	};
	
	var playBossExplosion = function(){
		soundManager.playExplosion();
		boss.playSequence(constants.bossSpriteSquence[1]);
	};
	
	var playBossAnimationSequence = function(){
		boss.playSequence(constants.bossSpriteSquence[0]);
		g.wait(Math.random() * 3000, function(){
			boss.stop();
		});
	};
	
	var updateLifeText = function(){
		lifeText.content = 'Lives Left: ' + lives;
	};
	
	var cleanupShapes = function(){
		shapes.boardShapes.forEach(function(s){
			s.press = null;
			s.release = null;
			g.remove(s);
		});
		g.remove(shapes);
	};
	
	var callGameOver = function(){
		cleanupShapes();
		g.remove(boss);
		g.remove(lifeText);
		gameover();
	};
	
	return {
		startLevels: startLevels
	};
};