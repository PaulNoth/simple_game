
var x = 0;
var y = 0;
function fillRect()
{
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.save();
    ctx.fillStyle = "#aaaaaa";
    ctx.fillRect(x, y, 25, 25);
    ctx.restore();
    enableButtons();
}

function enableButtons()
{
    var butUp = document.getElementById("up");
    butUp.disabled = false;
    var butDown = document.getElementById("down");
    butDown.disabled = false;
    var butLeft = document.getElementById("left");
    butLeft.disabled = false;
    var butRight = document.getElementById("right");
    butRight.disabled = false;

    var startButton = document.getElementById("start")
    startButton.disabled = true;
}

function moveUp()
{
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, 500, 500);
    y += increment(true);
    if (y < 0) {
        y = 0;
    }
    ctx.fillStyle = "#aaaaaa";
    ctx.fillRect(x, y, 25, 25);
    ctx.restore();
}

function moveDown() {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, 500, 500);
    y += increment(false);
    if (y > 475) {
        y = 475;
    }
    ctx.fillStyle = "#aaaaaa";
    ctx.fillRect(x, y, 25, 25);
    ctx.restore();
}

function moveLeft()
{
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, 500, 500);
    x += increment(true);
    if (x < 0) {
        x = 0;
    }
    ctx.fillStyle = "#aaaaaa";
    ctx.fillRect(x, y, 25, 25);
    ctx.restore();
}

function moveRight()
{
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.save();
    ctx.clearRect(0, 0, 500, 500);
    x += increment(false);
    if (x > 475) {
        x = 475;
    }
    ctx.fillStyle = "#aaaaaa";
    ctx.fillRect(x, y, 25, 25);
    ctx.restore();
}

function move(event)
{
    var key = event.keyCode;
    console.log(key);
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