
var x = 0;
var y = 0;

var randomBlockingElements = [];
var started = false;

function fillRect(x, y)
{
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.save();
    ctx.fillStyle = "#aaaaaa";
    ctx.fillRect(x, y, 25, 25);
    ctx.restore();
}

function clearRect(x, y)
{
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.clearRect(x, y, 25, 25);
    ctx.restore();
}

function start()
{
    started = true;
    enableButtons(true);
    fillRect(x, y);
}
function end()
{
    started = false;
    enableButtons(false);
}

function enableButtons(enabled)
{
    var butUp = document.getElementById("up");
    butUp.disabled = !enabled;
    var butDown = document.getElementById("down");
    butDown.disabled = !enabled;
    var butLeft = document.getElementById("left");
    butLeft.disabled = !enabled;
    var butRight = document.getElementById("right");
    butRight.disabled = !enabled;

    var startButton = document.getElementById("start");
    startButton.disabled = enabled;

    var endButton = document.getElementById("end");
    endButton.disabled = !enabled;
}

function moveUp()
{
    if(started)
    {
        var newY = y + increment(true);
        if(newY >= 0 && !collision(x, newY))
        {
            clearRect(x, y);
            y = newY;
        }
        fillRect(x, y);
    }
}

function moveDown()
{
    if(started)
    {
        var newY = y + increment(false);
        if(newY <= 475 && !collision(x, newY))
        {
            clearRect(x, y);
            y = newY;
        }
        fillRect(x, y);
    }
}

function moveLeft()
{
    if(started)
    {
        var newX = x + increment(true);
        if(newX >= 0 && !collision(newX, y))
        {
            clearRect(x, y);
            x = newX;
        }
        fillRect(x, y);
    }
}

function moveRight()
{
    if(started)
    {
        var newX = x + increment(false);
        if(newX <= 475 && !collision(newX, y))
        {
            clearRect(x, y);
            x = newX;
        }
        fillRect(x, y);
    }
}

function move(event)
{
    var key = event.keyCode;
    if(key == 37)
    {
        moveLeft();
    }
    else if(key == 38)
    {
        moveUp()
    }
    else if(key == 39)
    {
        moveRight();
    }
    else if(key == 40)
    {
        moveDown();
    }
}

function increment(negative)
{
    if(negative) {
        return -25;
    }
    else
    {
        return 25;
    }
}

function randomRect()
{
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.save();
    ctx.fillStyle = "#ff00ff";
    var randomX = (Math.random() * 20); // 20 == canvas size / rectangle size
    var randomY = (Math.random() * 20);
    randomX = Math.floor(randomX) * 25;
    randomY = Math.floor(randomY) * 25;
    randomBlockingElements.push({x: randomX, y: randomY});
    ctx.fillRect(randomX, randomY , 25, 25);
    ctx.restore();
}

function collision(xCoor, yCoor)
{
    for(var i = 0; i < randomBlockingElements.length; i++) {
        if (xCoor === randomBlockingElements[i].x && yCoor === randomBlockingElements[i].y)
        {
            return true;
        }
    }
    return false;
}

function moveTo(event)
{
    console.log(event.x);
    console.log(event.y);
}