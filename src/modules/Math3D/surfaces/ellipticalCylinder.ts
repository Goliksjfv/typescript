import Point from "../entites/Point";
import Edge from "../entites/Edge";
import Polygon from "../entites/Polygon";
import Surface from "../entites/Surface";

class EllipticalCylinder extends Surface {
    constructor(
        count: number = 30,
        h: number = 15,
        a: number = 6,
        b: number = 10,
        color: string = '#ffff00'
    ) {
        super();
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        // точки
        const dt: number = 2 * Math.PI / count;
        for (let p: number = -h; p < h; p += 2) {
            for (let i: number = 0; i <= Math.PI; i += 2 * dt + count) {
                for (let j: number = 0; j < 2 * Math.PI; j += dt) {
                    points.push(new Point(
                        a * Math.cos(i) * Math.cos(j),
                        p,
                        b * Math.sin(j)
                    ));
                }
            }
        }

        // ребра
        for (let i: number = 0; i < points.length; i++) {
            // вдоль
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            }
            // поперек
            if (i < points.length - count) {
                edges.push(new Edge(i, i + count));
            }
        }

        // полигоны
        for (let i: number = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default EllipticalCylinder;