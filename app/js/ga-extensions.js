GA.custom = function (ga) {
    ga.complexShapes = [];
    
    ga.triangle = function(x,y,radians,radius,offset,slice){
        var o  = {};
        
        ga.makeDisplayObject(o);
        o.mask = false;
        o.fillStyle = "rgba("+constants.colors[slice%6]+",.5)";
        o.strokeStyle = "rgba("+constants.colors[slice%6]+",.8)";
        o.lineWidth = 3;
        o.x = x || 0;
        o.y = y || 0;
        o.flash = false;
        o.singleFlash = false;
        o.triangular = true;
        o.triangle = null;
        o.interactive = false;
        ga.complexShapes.push(o);
        ga.stage.addChild(o);
        
        function coordCalc(slice,radians,offset){
            return (slice * radians - offset);
        }
        
        function createPath2d(x, y){
            var temp = new Path2D();
       
            temp.moveTo(x,y);
            temp.lineTo(x + (Math.cos(slice * radians - offset) * radius), y + (Math.sin( slice * radians - offset) * radius));
            temp.lineTo(x + (Math.cos((slice + 1) * radians - offset) * radius), y + (Math.sin((slice + 1) * radians - offset) * radius));
            temp.closePath();
            
            return temp;
        }
        
        o.updateFlash = function() {
          if(o.flash){
                if(o.alpha >= 1) {
                    o.flash = false;
                    o.alpha = 0.5;
                    if(o.singleFlash){
                        o.singleFlash = false;
                    }
                    else if(o.nextShape != null && o.nextShape != undefined){
                        o.nextShape.alpha = 0.0;
                        o.nextShape.flash = true;
                        soundManager.playFlashSound(o.nextShape.soundIndex);
                    }
                    if(o.lastShape != null && o.lastShape != undefined)
                    {
                        o.lastShape();
                    }
                }
                else {
                    o.alpha += .02;
                }
                o.strokeStyle = 'rgba(' + constants.colors[slice%6] + ',' + o.alpha + ')';
                o.fillStyle = 'rgba(' + constants.colors[slice%6] + ',' + o.alpha + ')';
            }
            else {
                o.alpha = 0.5;
            }
        };
        
        o.render = function(ctx) {
            var expand = 10;
            // ga is doing a translation so we do not need to add x and y to our new positions
            o.triangle = createPath2d(o.x + (Math.cos(coordCalc(slice+.5, radians, offset)) * expand), o.y + (Math.sin(coordCalc(slice+.5, radians, offset)) * expand));

            var temp = createPath2d((Math.cos(coordCalc(slice+.5, radians, offset)) * expand), (Math.sin(coordCalc(slice+.5, radians, offset)) * expand));
            
            ctx.strokeStyle = o.strokeStyle;
            ctx.lineWidth = o.lineWidth;
            ctx.fillStyle = o.fillStyle;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowColor = "rgb("+constants.colors[slice%6]+")";
            ctx.shadowBlur = 5;
            
            if (o.mask === true) {
                ctx.clip();
            } else {
                if (o.strokeStyle !== "none") ctx.stroke(temp);
                if (o.fillStyle !== "none") ctx.fill(temp);
            }
        };
        return o;
    };
    
    ga.complexShape = function(slices, radius, x, y){
        var o  = {};
        o.x = x || 0;
        o.y = y || 0;
        o.boardShapes = [];              
        ga.stage.addChild(o);
        
        for(var i = 0; i < slices; i++){
            var radians = ((Math.PI * 2) / slices);
            var offset = (slices % 2 == 0) ? 0 : ((Math.PI) / 2)
            o.boardShapes.push(ga.triangle(o.x, o.y, radians, radius, offset,i));
        }
        
        return o;
    };
    
      ga.updateComplexShapes = function() {
        if (ga.complexShapes.length > 0) {
        for(var i = ga.complexShapes.length - 1; i >= 0; i--) {
            var cs = ga.complexShapes[i];
            if (cs) cs.updateFlash();
            }
        }
    };
    
    ga.updateFunctions.push(ga.updateComplexShapes);
    
    ga.wait = function(duration, callBack) {
        setTimeout(callBack, duration);
    };
   
};