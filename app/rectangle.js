function Rectangle(xCorner, yCorner)
{
    var x = xCorner;
    var y = yCorner;

    this.getX = function()
    {
        return x;
    };

    this.getY = function()
    {
        return y;
    };

    this.moveUp = function()
    {
        var newX = x;
        var newY = y - canvasConstants.COMPONENT_SIZE;
        return new Rectangle(newX, newY);
    };

    this.moveDown = function()
    {
        var newX = x;
        var newY = y + canvasConstants.COMPONENT_SIZE;
        return new Rectangle(newX, newY);
    };

    this.moveLeft = function()
    {
        var newX = x - canvasConstants.COMPONENT_SIZE;
        var newY = y;
        return new Rectangle(newX, newY);
    };

    this.moveRight = function()
    {
        var newX = x + canvasConstants.COMPONENT_SIZE;
        var newY = y;
        return new Rectangle(newX, newY);
    };

    this.moveUpLeft = function()
    {
        var newX = x - canvasConstants.COMPONENT_SIZE;
        var newY = y - canvasConstants.COMPONENT_SIZE;
        return new Rectangle(newX, newY);
    };

    this.moveUpRight = function()
    {
        var newX = x + canvasConstants.COMPONENT_SIZE;
        var newY = y - canvasConstants.COMPONENT_SIZE;
        return new Rectangle(newX, newY);
    };

    this.moveDownLeft = function()
    {
        var newX = x - canvasConstants.COMPONENT_SIZE;
        var newY = y + canvasConstants.COMPONENT_SIZE;
        return new Rectangle(newX, newY);
    };

    this.moveDownRight = function()
    {
        var newX = x + canvasConstants.COMPONENT_SIZE;
        var newY = y + canvasConstants.COMPONENT_SIZE;
        return new Rectangle(newX, newY);
    };

    this.hashcode = function()
    {
        var result = 17;
        result = 31 * result + x;
        result = 31 * result + y;
        return result.toString();
    };

    this.equals = function(other)
    {
        return other instanceof Rectangle && x === other.getX() && y === other.getY();
    };
}