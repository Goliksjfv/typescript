import Point from "../entites/Point";
import Edge from "../entites/Edge";
import Polygon from "../entites/Polygon";
import Surface from "../entites/Surface";

class ellipsoid extends Surface {
    constructor(
        count:number = 80,
        rX:number = 20,
        rY:number = 10,
        rZ:number = 6,
        color:string = '#ffff00',
        center:Point = new Point()
    ) {
        super();
        const points:Point[] = [];
        const edges:Edge[] = [];
        const polygons:Polygon[] = [];
        const da: number = Math.PI * 2 / count;
        
        for (let phi = 0; phi < Math.PI * 2; phi += da) { //psi => 0 ... Pi //phi => 0 ... 2Pi
            for (let psi = 0; psi < Math.PI * 2; psi += da) {
                const x = center.x + rX * Math.sin(phi) * Math.cos(psi);
                const y = center.y + rY * Math.sin(phi) * Math.sin(psi);
                const z = center.z + rZ * Math.cos(phi);
                points.push(new Point(x, z, y));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (points[i + 1]) {
                if ((i + 1) % count === 0) {
                    edges.push(new Edge(i, i + 1 - count));
                } else {
                    edges.push(new Edge(i, i + 1));
                }
            }
            if (points[i + count]) {
                edges.push(new Edge(i, i + count));
            } else {
                edges.push(new Edge(i, i % count));
            }
        }

        for (let i = 0; i < points.length; i++) {
            if (points[i + count + 1]) {
                polygons.push(new Polygon([
                    i,
                    i + 1,
                    i + count + 1,
                    i + count
                ], color));
            }
        }

        let i = 0;
        polygons.forEach((poly) => {
            /*if (i<count*3+count/2 && i>count*3-8+count/2) {
                poly.color = { r: 0, g: 0, b: 0 };
            }*/
            if (i<count*7 && i>count*7-8) {
                poly.color = { r: 128, g: 64, b: 48 };
            }
            if (i<count*8-1 && i>count*8-7) {
                poly.color = { r: 128, g: 64, b: 48 };
            }
            if (i===count*6-5 || i===count*5-5 || i===count*4-5) {
                poly.color = { r: 0, g: 0, b: 0 };
            }
            if (i===count*5-4 || i===count*4-4 || i===count*5-3 || i===count*4-3 || i===count*5-2 || i===count*4-2) {
                poly.color = { r: 234, g: 63, b: 37 };
            }
            if (i>count*8-2 && i<count*9) {
                poly.color = { r: 126, g: 205, b: 250 };
            }

            
        i++;
        })

        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
        this.center = center;
    }
}
export default ellipsoid;