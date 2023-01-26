window.onload = function()                                                  // FUNCTION LOAD PAGE
{
    var canvasWidth = 900;                                                  // WIDTH OF CANVAS
    var canvasHeight = 600;                                                 // HEIGHT OF CANVAS
    var blockSize = 30;                                                     // SIZE OF EACH BLOCK (PIXELS)
    var ctx;                                                                // CONTEXT
    var delay = 100;                                                        // DELAY (0.1s)
    var snakee;                                                             // OBJECT SNAKEE
    var applee;                                                             // OBJECT APPLEE
    var widthInBlocks = canvasWidth / blockSize;                            // NUMBER OF BLOCK (WIDTH)
    var heightInBlocks = canvasHeight / blockSize;                          // NUMBER OF BLOCK (HEIGHT)
    var score;                                                              // STOCK score
    var timeOut;                                                            // STOCK setTimeOut
    var checkDoubleSwitch = 1;                                              // CHECK IF 2 CONTROLS IN 1 DELAY

    init();                                                                 // START FUNCTION INIT

    function init()                                                         // INIT THE START
    {
        var canvas = document.createElement('canvas');                      // INSERT OBJECT CANVAS
        canvas.width = canvasWidth;                                         // WIDTH OF CANVAS IN CANVAS
        canvas.height = canvasHeight;                                       // HEIGHT OF CANVAS IN CANVAS
        canvas.style.border = "20px solid #808080";                         // CREATE BORDER OF CANVAS
        canvas.style.margin = "50px auto";                                  // CENTER CANVAS
        canvas.style.display = "block";                                     // CREATE A DISPLAY ON THIS CANVAS
        canvas.style.backgroundColor = "#eaeaea";                           // BACKGROUND COLOR OF THIS CANVAS
        document.body.appendChild(canvas);                                  // ?????
        ctx = canvas.getContext('2d');                                      // CREATE A 2D CANVAS
        snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4]], "right");      // CREATE SNAKE OBJECT WITH FIXED POS TO THE RIGHT
        applee = new Apple([Math.floor(Math.random() * widthInBlocks),      // CREATE APPLE OBJECT WITH RANDOM POS
                             Math.floor(Math.random() * heightInBlocks)]);
        score = 0;                                                          // INIT SCORE TO 0
        refreshCanvas();                                                    // EXEC refreshCanvas() FUNCTION
    }

    function refreshCanvas()                                                // REFRESH EACH ELEMENT IN , DEPEND DELAY
    {
        snakee.advance();                                                   // EXEC advance() OF snakee
        if (snakee.checkCollision())                                        // CHECK COLLISION OF SNAKE
        {
            playSongGameOver();                                             // PLAY SOUND GAME OVER
            gameOver();                                                     // GAME OVER SCREEN FUNCTION
        }
        else
        {
            if (snakee.isEatingApple(applee))                               // CHECK IF SNAKE TOUCH APPLE
            {
                playSongApple();                                            // PLAY SOUND APPLE
                score++;                                                    // INCREASE SCORE
                snakee.ateApple = true;                                     // CONFIRM APPLE IS EAT
                do
                {
                    applee.setNewPosition();                                // CHANGE POSITION OF APPLE
                }
                while(applee.isOnSnake(snakee))                             // IF APPLE IS ON SNAKE
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);                 // CLEAR CANVAS ON X AND Y
            drawScore();                                                    // PRINT SCORE IN BACKGROUND
            snakee.draw();                                                  // DRAW THE NEW POSITION OF SNAKE
            applee.draw();                                                  // DRAW THE APPLE
            checkDoubleSwitch = 1;                                          // CHECK FOR ONE INPUT
            timeOut = setTimeout(refreshCanvas, delay);                     // REFRESH EACH "DELAY"
        }
    }

    function playSongApple()                                                // FUNCTION FOR SOUND OF APPLE
    {
        var audio = new Audio("music/Apple.mp3");                           // SEARCH THE SONG
        audio.play();                                                       // PLAY THE SONG
    }

    function playSongGameOver()                                             // FUNCTION FOR SOUND OF GAME OVER
    {
        var audio = new Audio("music/GameOver.wav");                        // SEARCH THE SONG
        audio.play();                                                       // PLAY THE SONG
    }

    function gameOver()                                                     // FUNCTION OF "GAME OVER"
    {
        var centreX = canvasWidth / 2;                                      // CENTER IN X
        var centreY = canvasHeight / 2;                                     // CENTER IN Y

        ctx.save();                                                         // SAVE THE CONTEXT
        ctx.font = "bold 70px sans-serif";                                  // FONT OF NEXT CONTEXT
        ctx.fillStyle = "gray";                                             // COLOR OF CONTEXT
        ctx.textAlign = "center";                                           // CENTER THE CONTEXT
        ctx.textBaseline = "middle";                                        // TAKE THE MIDDLE OF CONTEXT
        ctx.strokeStyle = "white";                                          // BORDER IN WHITE
        ctx.lineWidth = 5;                                                  // BORDER OF 5PX
        ctx.strokeText("Game Over", centreX, centreY - 180);                // BORDER OF "Game Over" WITH POSITION
        ctx.fillText("Game Over", centreX, centreY - 180);                  // TEXT OF "Game Over" WITH POSITION
        ctx.font = "bold 30px sans-serif";                                  // FONT OF NEXT CONTEXT
        ctx.strokeText("Press Spacebar to play again", centreX, centreY - 120); // BORDER OF "Press Space To play again" WITH POSITION
        ctx.fillText("Press Spacebar to play again", centreX, centreY - 120);   // TEXT OF "Press Space To play again" WITH POSITION
        ctx.font = "20px Verdana";                                                // FONT OF NEXT CONTEXT
        ctx.fillText("score : " + score.toString(), centreX, canvasHeight - 10);  // PRINT THE SCORE BELOW THE GAME
        ctx.restore();                                                            // RESTORE THE CONTEXT
    }

    function restart()                                                      // FUNCTION RESTART
    {
        snakee = new Snake([[6, 4], [5, 4], [4, 4], [3, 4]], "right");      // REPLACE SNAKE ON THIS POSITION
        applee = new Apple([Math.floor(Math.random() * widthInBlocks), Math.floor(Math.random() * heightInBlocks)]); // REPLACE APPLE ON RANDOM POSITION
        score = 0;                                                          // RESTART THE SCORE
        clearTimeout(timeOut);                                              // CLEAR THE TIMEOUT
        refreshCanvas();                                                    // GO TO "RefreshCanvas"
    }

    function drawScore()                                                    // DRAW SCORE
    {
        var centreX = canvasWidth / 2;                                      // CENTER OF X
        var centreY = canvasHeight / 2;                                     // CENTER OF Y

        ctx.save();                                                         // SAVE THE CONTEXT
        ctx.font = "bold 200px Verdana";                                    // FONT OF NEXT CONTEXT
        ctx.fillStyle = "gray";                                             // COLOR OF CONTEXT
        ctx.textAlign = "center";                                           // CENTER THE CONTEXT
        ctx.textBaseline = "middle";                                        // TAKE THE CENTER OF THIS CONTEXT
        ctx.fillText(score.toString(), centreX, centreY);                   // PRINT THE CONTEXT
        ctx.restore();                                                      // RESTOR THE CONTEXT
    }

    function drawBlock(ctx, position)                                       // DEFINE POSITION OF BLOCKS
    {
        var x = position[0] * blockSize;                                    // STOCK THE POSITION IN X
        var y = position[1] * blockSize;                                    // STOCK THE POSITION IN Y
        ctx.fillRect(x, y, blockSize, blockSize);                           // DRAW THE BLOCK
    }

    function Snake(body, direction)                                         // FUNCTION OF SNAKES
    {
        var headColor = true;                                               // CHECK FOR HEAD COLOR

        this.body = body;                                                   // TAKE THE BODY
        this.direction = direction;                                         // TAKE THE DIRECTION
        this.ateApple = false;                                              // CHECK IF APPLE IS EAT
        this.draw = function()                                              // DRAW THE SNAKE
        {
            ctx.save();                                                     // SAVE THE CONTEXT
            for(var i = 0; i < this.body.length; i++)                       // PRINT EACH BLOCK OF SNAKE'S BODY
            {
                if(headColor)                                               // CHECK IF HEAD
                {
                    ctx.fillStyle = "#a8b46b";                              // COLOR OF HEAD
                    headColor = false;                                      // REMOVE THE HEAD CHECK
                }
                else
                {
                    ctx.fillStyle = "#6bb486";                              // COLOR OF BODY
                }
                drawBlock(ctx, this.body[i]);                               // PRINT THE SNAKE BLOCK PER BLOCK
            }
            headColor = true;                                               // CHECK HEAD AGAIN
            ctx.restore();                                                  // RESTOR THE CONTEXT
        };
        this.advance = function()                                           // FUNCTION OF DIRECTION
        {
            var nextPostition = this.body[0].slice();                       // NEXT POSITION OF THE SNAKE'S BODY
            switch(this.direction)                                          // SWITCH ON HIS DIRECTON
            {
                case "left":                                                // IF "LEFT"
                    nextPostition[0] -= 1;                                  // INCREASE TO LEFT
                    break;
                case "right":                                               // IF "RIGHT"
                    nextPostition[0] += 1;                                  // INCREASE TO RIGHT
                    break;
                case "up":                                                  // IF "UP"
                    nextPostition[1] -= 1;                                  // INCREASE TO TOP
                    break;
                case "down":                                                // IF "DOWN"
                    nextPostition[1] += 1;                                  // INCREASE TO DOWN
                    break;
                default:                                                    // ELSE
                    throw("Invalid Direction");                             // ERROR
            }
            this.body.unshift(nextPostition);                               // ADD NEW BLOCK OF BODY
            if (!this.ateApple)                                             // IF NOT EAT APPLE
                this.body.pop();                                            // LAST BLOCK IS DESTOYED
            else
                this.ateApple = false;                                      // CHECK TO FALSE FOR APPLE EAT
        };
        this.setDirection = function(newdirection)                          // POSSIBILITIES OF DIRECTION
        {
            var allowedDirection;                                           // POSSIBLE DIRECTION
            switch(this.direction)                                          // CHECK DIRECTION
            {
                case "left":                                                // IF LEFT OR RIGHT
                case "right":
                    allowedDirection = ["up", "down"];                      // ONLY "UP" OR "DOWN"
                    break;
                case "down":                                                // IF DOWN OR UP
                case "up":
                    allowedDirection = ["left", "right"];                   // ONLY "LEFT" OR "RIGHT"
                    break;
                default:                                                    // ELSE
                    throw("Invalid Direction");                             // ERROR
            }
            if (allowedDirection.indexOf(newdirection) > -1)                // ???
            {
                this.direction = newdirection;
            }
        };
        this.checkCollision = function()                                    // CHECK ALL COLLISION
        {
            var wallCollision = false;                                      // CHECK WALL FALSE
            var snakeCollision = false;                                     // CHECK BODY FALSE
            var head = this.body[0];                                        // HEAD OF SNAKE
            var rest = this.body.slice(1);                                  // BODY OF SNAKE
            var snakeX = head[0];                                           // POSITION X HEAD SNAKE
            var snakeY = head[1];                                           // POSITION Y HEAD SNAKE
            var minX = 0;                                                   // BORDER MIN X CANVAS
            var minY = 0;                                                   // BORDER MIN Y CANVAS
            var maxX = widthInBlocks - 1;                                   // BORDER MAX X CANVAS
            var maxY = heightInBlocks - 1;                                  // BORDER MAX Y CANVAS
            var isNotBetweenX = snakeX < minX || snakeX > maxX;             // OUT OF X
            var isNotBetweenY = snakeY < minY || snakeY > maxY;             // OUT OF Y

            if(isNotBetweenX || isNotBetweenY)                              // IF OUT OF CANVAS
                wallCollision = true;                                       // WALL COLLISION DETECTED

            for(var i = 0; i < rest.length; i++)                            // CHECK EACH CASE OF SNAKE'S BODY
            {
                if(snakeX === rest[i][0] && snakeY === rest[i][1])          // IF Y and X OF SNAKE ARE EQUAL
                    snakeCollision = true;                                  // SNAKE COLLISION DETECTED
            }
            return (wallCollision || snakeCollision);                       // RETURN COLLISSION WALL OR SNAKE
        };
        this.isEatingApple = function(appleToEat)                           // FUNCTION FOR EAT APPLE
        {
            var head = this.body[0];                                        // HEAD OF SNAKE

            if (head[0] === appleToEat.position[0] && head[1] === appleToEat.position[1])      // IF THE HEAD IS ON APPLE
                return (true);                                                                  // SNAKE ON APPLE
            else
                return (false);                                                                 // SNAKE NOT ON APPLE
        };
    }

    function Apple(position)                                                                    // CONSTUCTOR OF APPLE
    {
        this.position = position;                                                               // POSITION OF THIS APPLE
        this.draw = function()                                                                  // FUNCTION DRAW APPLE
        {
            ctx.save();                                                                         // CONTEXT SAVE
            ctx.fillStyle = "#cd5555";                                                          // COLOR OF APPLE
            ctx.beginPath();                                                                    // NEW PATCH OF CONTEXT
            var radius = blockSize / 2;                                                         // ROUND APPLE
            var x = this.position[0] * blockSize + radius;                                      // CALCULATE THE X RADIUS
            var y = this.position[1] * blockSize + radius;                                      // CALCULATE THE Y RADIUS
            ctx.arc(x, y, radius, 0, Math.PI*2, true);                                          // CREATE THE ROUND
            ctx.fill();                                                                         // PRINT APPLE
            ctx.restore();                                                                      // RESTORE THE CONTEXT
        };
        this.setNewPosition = function()                                                        // FUNCTION OF NEW POSITION OF APPLE
        {
           var newX = Math.round(Math.random() * (widthInBlocks - 1));                          // NEW RANDOM POSITION IN X
           var newY = Math.round(Math.random() * (heightInBlocks - 1));                         // NEW RANDOM POSITION IN Y
           this.position = [newX, newY];                                                        // SEND THE NEW POSITION
        };
        this.isOnSnake = function(snakeToCheck)                                                 // FUNCTION TO CHECK IF APPLE ON SNAKE
        {
            var isOnSnake = false;                                                              // IS NOT ON SNAKE

            for(var i = 0; i < snakeToCheck.body.length; i++)                                   // CHECK EACH BLOCK OF BODY
            {
                if (this.position[0] === snakeToCheck.body[i][0] && this.position[1] === snakeToCheck.body[i][1])   // IF APPLE ON BODY
                    isOnSnake = true;                                                                               // APPLE ON SNAKE
            }
            return (isOnSnake);                                                                 // RETURN THE VALUE
        };
    }

    document.onkeydown = function handleKeyDown(e)                                              // TAKE INPUT
    {
        var key = e.keyCode;                                                                    // KEYCODE
        var newdirection;                                                                       // NEW DIRECTION IN STRING
        if (checkDoubleSwitch == 1 || snakee.checkCollision())                                  // CHECK IF ONLY 1 INPUT AND IF COLLISION
        {
            switch(key)                                                                         // CHECK INPUT
            {
                case 37:                                                                        // LEFT ARROW INPUT
                    newdirection = "left";                                                      // GO TO "LEFT"
                    break;
                case 38:                                                                        // UP ARROW INPUT
                    newdirection = "up";                                                        // GO TO "UP"
                    break;
                case 39:                                                                        // RIGHT ARROW INPUT
                    newdirection = "right";                                                     // GO TO "RIGHT"
                    break;
                case 40:                                                                        // DOWN ARROW INPUT
                    newdirection ="down";                                                       // GO TO "DOWN"
                    break;
                case 32:                                                                        // SPACEBAR INPUT
                    restart();                                                                  // RESTART FUNCTION
                    return;
                default:                                                                        // ELSE NOTHING
                    return;
            }
            checkDoubleSwitch = 0;                                                              // FIRST INPUT IS DONE
        }
        snakee.setDirection(newdirection);                                                      // SEND THE NEW DIRECTION
    }
}
