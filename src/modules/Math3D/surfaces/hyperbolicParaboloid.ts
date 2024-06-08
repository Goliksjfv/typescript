import Surface from "../entites/Surface";
import Point from "../entites/Point";
import Edge from "../entites/Edge";
import Polygon from "../entites/Polygon";

class hyperbolicParaboloid extends Surface{ 
    constructor(count = 20, color = '#ffff00'){
        super();
        const points = [];
        const edges = [];
        const polygons = [];
        // z = x**2 / 2q - y**2 / 2p
        const size = 10;
        const delta = size / count;

        // точки
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
                const x = i * delta - size / 2;
                const y = j * delta - size / 2;
                const z = x * x / 2 - y * y / 2;
                points.push(new Point(x, y, z));
            }
        }

        // рёбра
        for (let i = 0; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1))
            }
            if (i + count < points.length) {
                edges.push(new Edge(i, i + count));
            }
        }

        // полигоны
        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default hyperbolicParaboloid;