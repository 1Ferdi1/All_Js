class Cube extends Figure{
    constructor(size=10){
        super();
        this.points=[
            new Point(-size,size,size), //0
            new Point(size,size,size), //1
            new Point(size,-size,size), //2
            new Point(-size,-size,size), //3
            new Point(-size, size, -size),  //4
            new Point(size, size, -size),   //5
            new Point(size, -size, -size),  //6
            new Point(-size, -size, -size)  //7
        ]

        this.edges=[
            new Edge(0, 1),
            new Edge(0, 3),
            new Edge(0, 4),
            new Edge(2, 1),
            new Edge(5, 1),
            new Edge(3, 2),
            new Edge(3, 7),
            new Edge(6, 7),
            new Edge(4, 7),
            new Edge(5, 6),
            new Edge(5, 4),
            new Edge(2, 6)
        ]

        this.polygons=[
            new Polygon([0, 1, 2, 3]),
            new Polygon([0, 4, 7, 3]),
            new Polygon([0, 4, 5, 1]),
            new Polygon([1, 2, 6, 5]),
            new Polygon([2, 3, 7, 6]),
            new Polygon([4, 5, 6, 7])
        ]
    }
}