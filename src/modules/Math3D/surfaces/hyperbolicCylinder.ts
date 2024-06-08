import Point from "../entites/Point";
import Edge from "../entites/Edge";
import Polygon from "../entites/Polygon";
import Surface from "../entites/Surface";

class HyperbolicCylinder extends Surface {
    constructor(
        count: number = 20,
        a: number = 5,
        b: number = 2,
        color: string = '#ffff00'
    ) {
        super();
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        // точки
        const dt: number = 2 * Math.PI / count;
        for (let i: number = -Math.PI; i <= Math.PI; i += dt) {
            for (let j: number = -Math.PI; j < Math.PI; j += dt) {
                points.push(new Point(
                    b * Math.sinh(i),
                    a * Math.cosh(i),
                    j * 2,
                ));
            }
        }
        for (let i: number = -Math.PI; i <= Math.PI; i += dt) {
            for (let j: number = -Math.PI; j < Math.PI; j += dt) {
                points.push(new Point(
                    -b * Math.sinh(i),
                    -a * Math.cosh(i),
                    j * 2,
                ));
            }
        }

        // ребра
        for (let i: number = 0; i < points.length / 2 - count; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            }
            if (i < points.length - count) {
                edges.push(new Edge(i, i + count));
            }
        }
        for (let i: number = points.length / 2; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            }
            if (i < points.length - count) {
                edges.push(new Edge(i, i + count));
            }
        }

        // полигоны
        for (let i: number = 0; i < points.length / 2 - count; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
        }
        for (let i: number = points.length / 2 + count / 2; i < points.length; i++) {
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

export default HyperbolicCylinder;