import Surface from "../entites/Surface";
import Point from "../entites/Point";
import Edge from "../entites/Edge";
import Polygon from "../entites/Polygon";

class Cone extends Surface {
    constructor(count = 20, height = 10, radius = 5, color = '#ff0000') {
        super();
        const points = [];
        const edges = [];
        const polygons = [];

        // точки основания
        for (let i = 0; i < count; i++) {
            const theta = 2 * Math.PI * i / count;
            const x = radius * Math.cos(theta);
            const y = radius * Math.sin(theta);
            const z = 0;
            points.push(new Point(x, y, z));
        }

        // вершина конуса
        const apex = new Point(0, 0, height);
        points.push(apex);
        const apexIndex = points.length - 1;

        // рёбра основания
        for (let i = 0; i < count; i++) {
            edges.push(new Edge(i, (i + 1) % count));
        }

        // рёбра от основания к вершине
        for (let i = 0; i < count; i++) {
            edges.push(new Edge(i, apexIndex));
        }

        // полигоны основания
        for (let i = 0; i < count; i++) {
            const nextIndex = (i + 1) % count;
            polygons.push(new Polygon([i, nextIndex, apexIndex], color));
        }

        // основание (нижний полигон)
        const basePolygon = [];
        for (let i = 0; i < count; i++) {
            basePolygon.push(i);
        }
        polygons.push(new Polygon(basePolygon, color));

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default Cone;