import Surface from "../entites/Surface";
import Point from "../entites/Point";
import Edge from "../entites/Edge";
import Polygon from "../entites/Polygon";

class Cone extends Surface {
    constructor(
        radius: number = 2.5,
        heigth: number = 5,
        color: string = '#00ffff',
        center: Point = new Point(),
        verticalEdgeCount: number = 100,//80
        horizontalEdgeCount: number = 50//40
    ) {
        const vertices: Point[] = [];
        const edges: Edge[] = [];
        const polygons: Polygon[] = [];

        vertices.push(new Point(center.x, -heigth / 3 + center.y, center.z));
        for (let j = 0; j < horizontalEdgeCount; j++) {
            const h = j / horizontalEdgeCount;
            for (let i = 0; i < verticalEdgeCount; i++) {
                const alpha = 2 * Math.PI * i / verticalEdgeCount;
                vertices.push(new Point(
                    Math.sin(alpha) * radius * (1 - h) + center.x,
                    h * heigth - heigth / 3 + center.y,
                    Math.cos(alpha) * radius * (1 - h) + center.z
                ));
            }
        }
        vertices.push(new Point(center.x, 2 * heigth / 3 + center.y, center.z));

        for (let i = 0; i < verticalEdgeCount; i++) {
            edges.push(new Edge(0, i + 1));
        }
        for (let i = 0; i < verticalEdgeCount; i++) {
            for (let j = 0; j < horizontalEdgeCount - 1; j++) {
                edges.push(new Edge(j * verticalEdgeCount + 1 + i, (j + 1) * verticalEdgeCount + 1 + i))
            }
            edges.push(new Edge(verticalEdgeCount * (horizontalEdgeCount - 1) + i + 1, verticalEdgeCount * horizontalEdgeCount + 1));
        }
        for (let j = 0; j < horizontalEdgeCount; j++) {
            for (let i = 0; i < verticalEdgeCount - 1; i++) {
                edges.push(new Edge(i + 1 + j * verticalEdgeCount, i + 2 + j * verticalEdgeCount));
            }
            edges.push(new Edge(verticalEdgeCount + j * verticalEdgeCount, j * verticalEdgeCount + 1));
        }

        for (let i = 0; i < verticalEdgeCount; i++) {
            polygons.push(new Polygon([
                i + 1,
                0,
                (i + 1) % verticalEdgeCount + 1
            ], color));
        }
        for (let i = 0; i < verticalEdgeCount; i++) {
            for (let j = 0; j < horizontalEdgeCount - 1; j++) {
                polygons.push(new Polygon([
                    i + 1 + verticalEdgeCount * j,
                    verticalEdgeCount * (j + 1) + i + 1,
                    verticalEdgeCount * (j + 1) + (i + 1) % verticalEdgeCount + 1,
                    (i + 1) % verticalEdgeCount + 1 + verticalEdgeCount * j
                ], color));
            }
            polygons.push(new Polygon([
                i + 1 + verticalEdgeCount * (horizontalEdgeCount - 1),
                verticalEdgeCount * horizontalEdgeCount + 1,
                (i + 1) % verticalEdgeCount + 1 + verticalEdgeCount * (horizontalEdgeCount - 1)
            ], color));
        }
        let i = 0;
        polygons.forEach((poly)=>{
            if(i>verticalEdgeCount){
                if (i<horizontalEdgeCount/2+2+verticalEdgeCount && i>horizontalEdgeCount/2-4+verticalEdgeCount) {
                    poly.color = { r: 255, g: 255, b: 0 };
                }//центр линия
                if (i<horizontalEdgeCount/2+2+verticalEdgeCount+horizontalEdgeCount && i>horizontalEdgeCount/2-4+verticalEdgeCount+horizontalEdgeCount) {
                    poly.color = { r: 255, g: 255, b: 0 };
                }//левая линия
                if (i<horizontalEdgeCount/2+2+verticalEdgeCount+horizontalEdgeCount*(verticalEdgeCount-1) && i>horizontalEdgeCount/2-4+verticalEdgeCount+horizontalEdgeCount*(verticalEdgeCount-1)) {
                    poly.color = { r: 255, g: 255, b: 0 };
                }//правая линия
                if (i<horizontalEdgeCount/2+1+verticalEdgeCount+horizontalEdgeCount*2 && i>horizontalEdgeCount/2-3+verticalEdgeCount+horizontalEdgeCount*2) {
                    poly.color = { r: 255, g: 255, b: 0 };
                }//левая линия короткая
                if (i<horizontalEdgeCount/2+1+verticalEdgeCount+horizontalEdgeCount*(verticalEdgeCount-2) && i>horizontalEdgeCount/2-3+verticalEdgeCount+horizontalEdgeCount*(verticalEdgeCount-2)) {
                    poly.color = { r: 255, g: 255, b: 0 };
                }// правая линия короткая
                if (i<horizontalEdgeCount/2+6+verticalEdgeCount && i>horizontalEdgeCount/2+2+verticalEdgeCount) {
                    poly.color = { r: 255, g: 255, b: 0 };
                }// верхний лучик
                if (i<horizontalEdgeCount/2-4+verticalEdgeCount && i>horizontalEdgeCount/2-8+verticalEdgeCount) {
                    poly.color = { r: 255, g: 255, b: 0 };
                }//нижний лучик
                if (i===horizontalEdgeCount/2-1+verticalEdgeCount+horizontalEdgeCount*4 || i===horizontalEdgeCount/2-1+verticalEdgeCount+horizontalEdgeCount*5 || i===horizontalEdgeCount/2-1+verticalEdgeCount+horizontalEdgeCount*6) {
                    poly.color = { r: 255, g: 255, b: 0 };
                }//левый лучик
                if (i===horizontalEdgeCount/2-1+verticalEdgeCount+horizontalEdgeCount*(verticalEdgeCount-4) || i===horizontalEdgeCount/2-1+verticalEdgeCount+horizontalEdgeCount*(verticalEdgeCount-5) || i===horizontalEdgeCount/2-1+verticalEdgeCount+horizontalEdgeCount*(verticalEdgeCount-6)) {
                    poly.color = { r: 255, g: 255, b: 0 };
                }// правый лучик
                if (i===horizontalEdgeCount/2+2+verticalEdgeCount+horizontalEdgeCount*3 || i===horizontalEdgeCount/2+3+verticalEdgeCount+horizontalEdgeCount*4 || i===horizontalEdgeCount/2+4+verticalEdgeCount+horizontalEdgeCount*5) {
                    poly.color = { r: 255, g: 255, b: 0 };
                }//левый верхний лучик
                if (i===horizontalEdgeCount/2-4+verticalEdgeCount+horizontalEdgeCount*3 || i===horizontalEdgeCount/2-5+verticalEdgeCount+horizontalEdgeCount*4 || i===horizontalEdgeCount/2-6+verticalEdgeCount+horizontalEdgeCount*5) {
                    poly.color = { r: 255, g: 255, b: 0 };
                }//левый нижний лучик
                if (i===horizontalEdgeCount/2+2+verticalEdgeCount+horizontalEdgeCount*(verticalEdgeCount-3) || i===horizontalEdgeCount/2+3+verticalEdgeCount+horizontalEdgeCount*(verticalEdgeCount-4) || i===horizontalEdgeCount/2+4+verticalEdgeCount+horizontalEdgeCount*(verticalEdgeCount-5)) {
                    poly.color = { r: 255, g: 255, b: 0 };
                }// правый верхний лучик
                if (i===horizontalEdgeCount/2-4+verticalEdgeCount+horizontalEdgeCount*(verticalEdgeCount-3) || i===horizontalEdgeCount/2-5+verticalEdgeCount+horizontalEdgeCount*(verticalEdgeCount-4) || i===horizontalEdgeCount/2-6+verticalEdgeCount+horizontalEdgeCount*(verticalEdgeCount-5)) {
                    poly.color = { r: 255, g: 255, b: 0 };
                }// правый нижний лучик
            }
            i++;
        })
        polygons[0].color={r:0,g:0,b:0}

        super(vertices, edges, polygons, center);
    }
}

export default Cone;