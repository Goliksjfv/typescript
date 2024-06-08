import Point from "../entites/Point";
import Edge from "../entites/Edge";
import Polygon from "../entites/Polygon";
import Surface from "../entites/Surface";

class doubleStripHyperboloid extends Surface {
    constructor(
        count: number = 30,
        a: number = 1,
        b: number = 1,
        c: number = 1
    ) {
        super();
        const points: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        // точки
        const dt: number = Math.PI * 2 / count;
        for (let i: number = 0; i <= Math.PI; i += dt) {
            for (let j: number = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    a * Math.sinh(i) * Math.cos(j),
                    c * Math.cosh(i),
                    b * Math.cosh(i) * Math.sin(j)
                ));
            }
        }
        for (let i: number = 0; i <= Math.PI; i += dt) {
            for (let j: number = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(-a * Math.sinh(i) * Math.cos(j), -c * Math.cosh(i), -b * Math.cosh(i) * Math.sin(j)));
            }
        }

        // ребра
        for (let i: number = 0; i < points.length / 2; i++) {
            // вдоль
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            }
            // поперек
            if (i < points.length / 2 - count) {
                edges.push(new Edge(i, i + count));
            }
        }
        for (let i: number = points.length / 2 + count; i < points.length; i++) {
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
        for (let i: number = 0; i < points.length / 2 - count; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]))
            }
        }
        for (let i: number = points.length / 2; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]))
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default doubleStripHyperboloid;