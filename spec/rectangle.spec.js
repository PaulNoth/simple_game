describe("Rectangle", function() {

    var rectangle;
    beforeEach(function() {
        rectangle = new Rectangle(0, 0);
    });

    it("should get same corner x coordinate as initialized", function() {
        expect(rectangle.getX()).toBe(0);
    });

    it("should get same corner y coordinate as initialized", function() {
        expect(rectangle.getY()).toBe(0);
    });

    it("should not have access to private variables", function() {
        expect(rectangle.x).toBe(undefined);
        expect(rectangle.y).toBe(undefined);
    });

    it('should move up correctly', function() {
        var moved = rectangle.moveUp();
        expect(moved.getX()).toBe(0);
        expect(moved.getY()).toBe(-canvasConstants.COMPONENT_SIZE);
    });

    it('should not change corner coordinates of former rectangle after moving up', function() {
        var moved = rectangle.moveUp();
        expect(rectangle.getX()).toBe(0);
        expect(rectangle.getY()).toBe(0);
    });

    it('should move down correctly', function() {
        var moved = rectangle.moveDown();
        expect(moved.getX()).toBe(0);
        expect(moved.getY()).toBe(canvasConstants.COMPONENT_SIZE);
    });

    it('should not change corner coordinates of former rectangle after moving down', function() {
        rectangle.moveDown();
        expect(rectangle.getX()).toBe(0);
        expect(rectangle.getY()).toBe(0);
    });

    it('should move left correctly', function() {
        var moved = rectangle.moveLeft();
        expect(moved.getX()).toBe(-canvasConstants.COMPONENT_SIZE);
        expect(moved.getY()).toBe(0);
    });

    it('should not change corner coordinates of former rectangle after moving left', function() {
        rectangle.moveLeft();
        expect(rectangle.getX()).toBe(0);
        expect(rectangle.getY()).toBe(0);
    });

    it('should move right correctly', function() {
        var moved = rectangle.moveRight();
        expect(moved.getX()).toBe(canvasConstants.COMPONENT_SIZE);
        expect(moved.getY()).toBe(0);
    });

    it('should not change corner coordinates of former rectangle after moving right', function() {
        rectangle.moveRight();
        expect(rectangle.getX()).toBe(0);
        expect(rectangle.getY()).toBe(0);
    });

    it('should move up left correctly', function() {
        var moved = rectangle.moveUpLeft();
        expect(moved.getX()).toBe(-canvasConstants.COMPONENT_SIZE);
        expect(moved.getY()).toBe(-canvasConstants.COMPONENT_SIZE);
    });

    it('should not change corner coordinates of former rectangle after moving up left', function() {
        rectangle.moveUpLeft();
        expect(rectangle.getX()).toBe(0);
        expect(rectangle.getY()).toBe(0);
    });

    it('should move up right correctly', function() {
        var moved = rectangle.moveUpRight();
        expect(moved.getX()).toBe(canvasConstants.COMPONENT_SIZE);
        expect(moved.getY()).toBe(-canvasConstants.COMPONENT_SIZE);
    });

    it('should not change corner coordinates of former rectangle after moving up right', function() {
        rectangle.moveUpRight();
        expect(rectangle.getX()).toBe(0);
        expect(rectangle.getY()).toBe(0);
    });

    it('should move down left correctly', function() {
        var moved = rectangle.moveDownLeft();
        expect(moved.getX()).toBe(-canvasConstants.COMPONENT_SIZE);
        expect(moved.getY()).toBe(canvasConstants.COMPONENT_SIZE);
    });

    it('should not change corner coordinates of former rectangle after moving down left', function() {
        rectangle.moveDownLeft();
        expect(rectangle.getX()).toBe(0);
        expect(rectangle.getY()).toBe(0);
    });

    it('should move down right correctly', function() {
        var moved = rectangle.moveDownRight();
        expect(moved.getX()).toBe(canvasConstants.COMPONENT_SIZE);
        expect(moved.getY()).toBe(canvasConstants.COMPONENT_SIZE);
    });

    it('should not change corner coordinates of former rectangle after moving down right', function() {
        rectangle.moveDownRight();
        expect(rectangle.getX()).toBe(0);
        expect(rectangle.getY()).toBe(0);
    });

    //it('should set default values if no values given', function() {
    //    var rect = new Rectangle();
    //    expect(rect.getX()).toBe(0);
    //    expect(rect.getY()).toBe(0);
    //});

    //it('should throw an exception if x value is not a number', function() {
    //   expect(function() {new Rectangle('x', 0)}).toThrow(new Error("xCorner should be a number"))
    //});

    //it('should throw an exception if y value is not a number', function() {
    //    expect(function() {new Rectangle(0, 'y')}).toThrow(new Error("yCorner should be a number"))
    //});

    it('should equal to an another rectangle with same coordinates', function(){
        var another = new Rectangle(0, 0);
        expect(rectangle.equals(another)).toBe(true);
    });
});
