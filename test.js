
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
        var result = 17;
        result = 31 * result + x;
        result = 31 * result + y;
        return result.toString();
    };

    this.equals = function(other)
    {
        return _.isEqual(this, other);
    }
}

function fillRect(x, y)
{
    var ctx = getCanvas().getContext("2d");
    ctx.save();
    ctx.fillStyle = "#aaaaaa";
    ctx.fillRect(x, y, 25, 25);
    ctx.restore();
}

function clearRect(x, y)
{
    var ctx = getCanvas().getContext("2d");
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

function moveUp(rect)
{
    var newX = rect.x;
    var newY = rect.y + increment(true);
    if(newY >= 0 && !collision(newX, newY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function moveDown(rect)
{
    var newX = rect.x;
    var newY = rect.y + increment(false);
    if(newY <= 475 && !collision(newX, newY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function moveLeft(rect)
{
    var newX = rect.x + increment(true);
    var newY = rect.y;
    if(newX >= 0 && !collision(newX, newY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function moveRight(rect)
{
    var newX = rect.x + increment(false);
    var newY = rect.y;
    if(newX <= 475 && !collision(newX, newY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function moveUpLeft(rect)
{
    var newX = rect.x + increment(true);
    var newY = rect.y + increment(true);
    if(newX >= 0 && newY >= 0 && !collision(newX, newY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function moveUpRight(rect)
{
    var newX = rect.x + increment(false);
    var newY = rect.y + increment(true);
    if(newX <= 475 && newY >= 0 && !collision(newX, newY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function moveDownLeft(rect)
{
    var newX = rect.x + increment(true);
    var newY = rect.y + increment(false);
    if(newX >= 0 && newY <= 475 && !collision(newX, newY))
    {
        return new Rectangle(newX, newY);
    }
    return null;
}

function moveDownRight(rect)
{
    var newX = rect.x + increment(false);
    var newY = rect.y + increment(false);
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
            redrawRectangle(moveLeft({x: actualX, y: actualY}));
        }
        else if(key === 38)     //up arrow
        {
            redrawRectangle(moveUp({x: actualX, y: actualY}));
        }
        else if(key === 39)     //right arrow
        {
            redrawRectangle(moveRight({x: actualX, y: actualY}));
        }
        else if(key === 40)     //down arrow
        {
            redrawRectangle(moveDown({x: actualX, y: actualY}));
        }
        else if(key === 33)     // page up
        {
            redrawRectangle(moveUpRight({x: actualX, y: actualY}));
        }
        else if(key === 34)     // page down
        {
            redrawRectangle(moveDownRight({x: actualX, y: actualY}));
        }
        else if(key === 35)     // end
        {
            redrawRectangle(moveDownLeft({x: actualX, y: actualY}));
        }
        else if(key === 36)     // home
        {
            redrawRectangle(moveUpLeft({x: actualX, y: actualY}));
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
    var ctx = getCanvas().getContext("2d");
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
    function Node(rect, previous)
    {
        this.rectangle = rect;
        this.previous = previous;

        this.hashcode = function()
        {
            if(rect !== null)
            {
                return rect.hashcode();
            }
            return "";
        }
    }

    function euclideanDist(node)
    {
        return Math.floor(Math.sqrt(Math.pow(actualX - node.rectangle.x, 2) + Math.pow(actualY - node.rectangle.y, 2)));
    }

    if(started)
    {
        var endX = Math.floor((event.x - getCanvas().offsetLeft) / 25) * 25;
        var endY = Math.floor((event.y - getCanvas().offsetTop) / 25) * 25;

        var pq = new PriorityQueue({comparator: function(node1, node2) {
            return euclideanDist(node1) - euclideanDist(node2)}
        });

        // A*
        var visited = {};
        var actual = new Node(new Rectangle(actualX, actualY), null);
        visited[actual.hashcode()] = actual;
        pq.queue(actual);


        var found = null;
        while(pq.length > 0)
        {
            var that = pq.dequeue();
            if(that.rectangle.x === endX && that.rectangle.y === endY)
            {
                found = that;
                break;
            }

            var up = new Node(moveUp(that.rectangle), that);
            if(up.rectangle !== null && visited[up.hashcode()] === undefined && !collision(up.rectangle.x, up.rectangle.y))
            {
                visited[up.hashcode()] = up;
                pq.queue(up);
            }

            var down = new Node(moveDown(that.rectangle), that);
            if(down.rectangle !== null && visited[down.hashcode()] === undefined && !collision(down.rectangle.x, down.rectangle.y))
            {
                visited[down.hashcode()] = down;
                pq.queue(down);
            }

            var left = new Node(moveLeft(that.rectangle), that);
            if(left.rectangle !== null && visited[left.hashcode()] === undefined && !collision(left.rectangle.x, left.rectangle.y))
            {
                visited[left.hashcode()] = left;
                pq.queue(left);
            }

            var right = new Node(moveRight(that.rectangle), that);
            if(right.rectangle !== null && visited[right.hashcode()] === undefined && !collision(right.rectangle.x, right.rectangle.y))
            {
                visited[right.hashcode()] = right;
                pq.queue(right);
            }

            var upLeft = new Node(moveUpLeft(that.rectangle), that);
            if(upLeft.rectangle !== null && visited[upLeft.hashcode()] === undefined && !collision(upLeft.rectangle.x, upLeft.rectangle.y))
            {
                visited[upLeft.hashcode()] = upLeft;
                pq.queue(upLeft);
            }

            var upRight = new Node(moveUpRight(that.rectangle), that);
            if(upRight.rectangle !== null && visited[upRight.hashcode()] === undefined && !collision(upRight.rectangle.x, upRight.rectangle.y))
            {
                visited[upRight.hashcode()] = upRight;
                pq.queue(upRight);
            }

            var downLeft = new Node(moveDownLeft(that.rectangle), that);
            if(downLeft.rectangle !== null && visited[downLeft.hashcode()] === undefined && !collision(downLeft.rectangle.x, downLeft.rectangle.y))
            {
                visited[downLeft.hashcode()] = downLeft;
                pq.queue(downLeft);
            }

            var downRight = new Node(moveDownRight(that.rectangle), that);
            if(downRight.rectangle !== null && visited[downRight.hashcode()] === undefined && !collision(downRight.rectangle.x, downRight.rectangle.y))
            {
                visited[downRight.hashcode()] = downRight;
                pq.queue(downRight);
            }
        }

        var path = [];
        if(found != null)
        {
            var node = found;
            while(node != null)
            {
                path.push(node.rectangle);
                node = node.previous;
            }
        }
        if(path.length > 0)
        {

            path.reverse();

            console.log(path.length - 1 + " moves");
            // excludes start frame from path
            for (var i = 1; i < path.length; i++)
            {
                redrawRectangle(path[i]);
            }
        }
    }
}

function getCanvas()
{
    return document.getElementById("canvas");
}