import Point from "../entites/Point";
import Edge from "../entites/Edge";
import Polygon from "../entites/Polygon";
import Surface from "../entites/Surface";

class singleStripHyperboloid extends Surface {
    constructor(
        count: number = 40,
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
        for (let i: number = -Math.PI; i <= Math.PI; i += dt) {
            for (let j: number = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    a * Math.cosh(i) * Math.cos(j),
                    c * Math.sinh(i),
                    b * Math.cosh(i) * Math.sin(j)
                ));
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
            if (i < points.length - count) {
                edges.push(new Edge(i, i + count));
            }
        }

        for (let i: number = points.length / 2; i < points.length; i++) {
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
        for (let i: number = 0; i < count / 2; i++) {
            for (let j: number = 0; j < count - 1; j++) {
                polygons.push(new Polygon([
                    i * count + j,
                    (i + 1) * count + j,
                    (i + 1) * count + j + 1,
                    i * count + j + 1,
                ], '#0000FF')); // синий цвет
            }

            polygons.push(new Polygon([
                i * count,
                (i + 1) * count - 1,
                (i + 2) * count - 1,
                (i + 1) * count,
            ], '#0000FF')); // синий цвет
        }

        for (let i: number = count / 2; i < count; i++) {
            for (let j: number = 0; j < count - 1; j++) {
                polygons.push(new Polygon([
                    i * count + j,
                    (i + 1) * count + j,
                    (i + 1) * count + j + 1,
                    i * count + j + 1,
                ], '#0000FF')); // синий цвет
            }

            polygons.push(new Polygon([
                i * count,
                (i + 1) * count - 1,
                (i + 2) * count - 1,
                (i + 1) * count,
            ], '#0000FF')); // синий цвет
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default singleStripHyperboloid;