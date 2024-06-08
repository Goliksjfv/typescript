import Point from "../entites/Point";
import Edge from "../entites/Edge";
import Polygon from "../entites/Polygon";
import Surface from "../entites/Surface";

class Ellipsoid extends Surface {
    constructor(
        count = 30,
        a = 18,
        b = 14,
        c = 10,
        color = '#ffff00',
        center = new Point()
    ) {
        super();
        const points = [];
        const edges = [];
        const polygons = [];

        const dt = Math.PI * 2 / count;
        for (let i = 0; i <= 2 * Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    center.x + a * Math.sin(i) * Math.cos(j),
                    center.y + b * Math.sin(i) * Math.sin(j),
                    center.z + c * Math.cos(i)
                ));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            }
            if (i < points.length - count) {
                edges.push(new Edge(i, i + count));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));
            }
        }

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
    }
}

export default Ellipsoid;