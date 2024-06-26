import Surface from "../entites/Surface";
import Point from "../entites/Point";
import Edge from "../entites/Edge";
import Polygon from "../entites/Polygon";

class Pyramid extends Surface{
   constructor(){ super(
        [
            new Point(10, -10, 10), // A - 0
            new Point(10, -10, -10), // B - 1
            new Point(-10, -10, -10), // C - 2
            new Point(-10, -10, 10), // D - 3
            new Point(0, 10, 0), // E - 4

        ],
        [
            new Edge(0, 1),
            new Edge(1, 2),
            new Edge(2, 3),
            new Edge(3, 0),
            new Edge(0, 4),
            new Edge(1, 4),
            new Edge(2, 4),
            new Edge(3, 4),
        ],
        [
            new Polygon([0, 1, 2, 3], 'ffa500'),
            new Polygon([0, 4, 3], 'ffa500'),
            new Polygon([4, 2, 3], 'ffa500'),
            new Polygon([4, 1, 2], 'ffa500'),
            new Polygon([4, 0, 1], 'ffa500'),
        ]
    );}
}

export default Pyramid;