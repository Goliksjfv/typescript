import Point from "../entites/Point";
import Edge from "../entites/Edge";
import Polygon from "../entites/Polygon";
import Surface from "../entites/Surface";

class EllipticalCylinder extends Surface {
    constructor(
        a: number = 12,//12
        b: number = 20,//20
        h: number = 30,//30
        count: number = 80,//50
        color: string = '#00ffff', 
    ){
    const points: Point[] = [];
    const edges: Edge[] = [];
    const polygons: Polygon[] = [];

    //точки
    const dt = 2 * Math.PI / count;
    for (let p = 0; p < h; p = p + 2) {
        for (let i = 0; i <= Math.PI; i += 2 * dt + count) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(
                    a * Math.cos(i) * Math.cos(j),
                    b * Math.sin(j),
                    p
                ));
            }
        }
    }

    //ребра
    for (let i = 0; i < points.length; i++) {
        if (i + 1 < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(
                i,
                i + 1
            ));
        } else if ((i + 1) % count === 0) {
            edges.push(new Edge(
                i,
                i + 1 - count
            ));
        }
        if (i < points.length - count) {
            edges.push(new Edge(
                i,
                i + count
            ));
        }
    }

    //полигоны
    for (let i = 0; i < points.length; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count],color));
        } else if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count],color))
        }
    }
    let i = 0;
        polygons.forEach((poly) => {
            if (i<6) {
                poly.color = { r: 0, g: 0, b: 0 };
            }
            if ((i<count+7 && i>count-1)||i===2*count-1) {
                poly.color = { r: 0, g: 255, b: 0 };
            }
            if (i>2*count-1 && i<2*count+6) {
                poly.color = { r: 0, g: 255, b: 0 };
            }
            if (i>3*count+1 && i<3*count+4) {
                poly.color = { r: 0, g: 255, b: 0 };
            }
            if ((i<4*count && i>4*count-3)||i===3*count+1||i===3*count) {
                poly.color = { r: 30, g: 89, b: 69 };
            }
            if (i===4*count-4) {
                poly.color = { r: 255, g: 0, b: 0 };
            }
            
        i++;
        })
    super(points, edges, polygons);
    }
    
}

export default EllipticalCylinder;