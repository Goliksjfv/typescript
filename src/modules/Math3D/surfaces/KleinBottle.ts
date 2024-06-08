import Surface from "../entites/Surface";
import Point from "../entites/Point";
import Edge from "../entites/Edge";
import Polygon from "../entites/Polygon";

class KleinBottle extends Surface {
    constructor(count = 30, color = '42aaff') {
        super();
        const points = [];
        const edges = [];
        const polygons = [];
        const deltaU = 2 * Math.PI / count;
        const deltaV = 2 * Math.PI / count;

        // точки
        for (let i = 0; i <= count; i++) {
            for (let j = 0; j <= count; j++) {
                const u = i * deltaU;
                const v = j * deltaV;
                let x, y, z;

                if (u < Math.PI) {
                    x = 6 * Math.cos(u) * (1 + Math.sin(u)) + 4 * (1 - Math.cos(u) / 2) * Math.cos(v);
                    y = 16 * Math.sin(u);
                    z = 4 * (1 - Math.cos(u) / 2) * Math.sin(v);
                } else {
                    x = 6 * Math.cos(u) * (1 + Math.sin(u)) + 4 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI);
                    y = 16 * Math.sin(u);
                    z = 4 * (1 - Math.cos(u) / 2) * Math.sin(v);
                }

                points.push(new Point(x, y, z));
            }
        }

        // рёбра
        for (let i = 0; i < points.length; i++) {
            if ((i + 1) % (count + 1) !== 0) {
                edges.push(new Edge(i, i + 1));
            }
            if (i + count + 1 < points.length) {
                edges.push(new Edge(i, i + count + 1));
            }
        }

        // полигоны
        for (let i = 0; i < points.length - count - 1; i++) {
            if ((i + 1) % (count + 1) !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count + 1, i + count + 1], color));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default KleinBottle;