import Point from "../entites/Point";
import Edge from "../entites/Edge";
import Polygon from "../entites/Polygon";
import Surface from "../entites/Surface";

class parabolicCylinder extends Surface {
    constructor(
        countX: number = 20,
        countY: number = 20,
        a: number = 5,
        b: number = 2,
        color: string = '#ffff00'
    ) {
        super();
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        const dtX: number = 2 * Math.PI / countX;
        const dtY: number = 2 * Math.PI / countY;

        for (let i: number = -Math.PI; i <= Math.PI; i += dtX) {
            for (let j: number = -Math.PI; j < Math.PI; j += dtY) {
                points.push(new Point(
                    b * Math.sinh(i),
                    a * Math.cosh(i),
                    j * 2,
                ));
            }
        }

        for (let i: number = 0; i < points.length - countY; i++) {
            if (i + 1 < points.length && (i + 1) % countY !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % countY === 0) {
                edges.push(new Edge(i, i + 1 - countY));
            }
            if (i < points.length - countY) {
                edges.push(new Edge(i, i + countY));
            }
        }

        for (let i: number = 0; i < points.length - countY; i++) {
            if (i + 1 + countY < points.length && (i + 1) % countY !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + countY, i + countY], color));
            } else if (i + countY < points.length && (i + 1) % countY === 0) {
                polygons.push(new Polygon([i, i + 1 - countY, i + 1, i + countY], color));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default parabolicCylinder;