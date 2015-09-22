
var actualX = 0;
var actualY = 0;

var randomBlockingElements = [];
var started = false;


function Rectangle(x, y)
{
    this.x = x;
    this.y = y;

    this.hashcode = function()
    {
        return (this.x * this.y).toString();
    }
}

function Node()
{

}

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
    fillRect(actualX, actualY);
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
    var newX = actualX;
    var newY = actualY + increment(true);
    if(newY >= 0 && !collision(actualX, newY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function moveDown()
{
    var newX = actualX;
    var newY = actualY + increment(false);
    if(newY <= 475 && !collision(actualX, newY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function moveLeft()
{
    var newX = actualX + increment(true);
    var newY = actualY;
    if(newX >= 0 && !collision(newX, actualY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function moveRight()
{
    var newX = actualX + increment(false);
    var newY = actualY;
    if(newX <= 475 && !collision(newX, actualY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function moveUpLeft()
{
    var newX = actualX + increment(true);
    var newY = actualY + increment(true);
    if(newX >= 0 && newY >= 0 && !collision(newX, newY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function moveUpRight()
{
    var newX = actualX + increment(false);
    var newY = actualY + increment(true);
    if(newX <= 475 && newY >= 0 && !collision(newX, newY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function moveDownLeft()
{
    var newX = actualX + increment(true);
    var newY = actualY + increment(false);
    if(newX >= 0 && newY <= 475 && !collision(newX, newY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function moveDownRight()
{
    var newX = actualX + increment(false);
    var newY = actualY + increment(false);
    if(newX <= 475 && newY <= 475 && !collision(newX, newY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function redrawRectangle(rectangle)
{
    if(rectangle !== null)
    {
        clearRect(actualX, actualY);
        actualX = rectangle.x;
        actualY = rectangle.y;
        fillRect(actualX, actualY);
    }
}

function move(event)
{
    if(started)
    {
        var key = event.keyCode;
        if(key === 37)          //left arrow
        {
            redrawRectangle(moveLeft());
        }
        else if(key === 38)     //up arrow
        {
            redrawRectangle(moveUp());
        }
        else if(key === 39)     //right arrow
        {
            redrawRectangle(moveRight());
        }
        else if(key === 40)     //down arrow
        {
            redrawRectangle(moveDown());
        }
        else if(key === 33)     // page up
        {
            redrawRectangle(moveUpRight());
        }
        else if(key === 34)     // page down
        {
            redrawRectangle(moveDownRight());
        }
        else if(key === 35)     // end
        {
            //moveDownLeft();
            redrawRectangle(moveDownLeft());
        }
        else if(key === 36)     // home
        {
            redrawRectangle(moveUpLeft());
        }
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
    if(!started || (actualX != randomX && actualY != randomY))
    {
        randomBlockingElements.push(new Rectangle(randomX, randomY));
    }
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
    var endX = Math.floor(event.x / 25) * 25;
    var endY = Math.floor(event.y / 25) * 25;
    var pq = new PriorityQueue({comparator: function(rect1, rect2) {
        return euclideanDist(rect1) - euclideanDist(rect2)}
    });
    var visited = {};

    var actual = new Rectangle(actualX, actualY);
    visited[actual.hashcode()] = actual;

}

function euclideanDist(rectangle)
{
    return Math.floor(Math.sqrt(Math.pow(actualX - rectangle.x, 2) + Math.pow(actualY - rectangle.y, 2)));
}