import Point from "../entites/Point"; 
import Edge from "../entites/Edge"; 
import Polygon from "../entites/Polygon"; 
import Surface from "../entites/Surface"; 
 
class Ellipsoid extends Surface { 
    constructor( 
        count = 50, 
        a = 18, 
        b = 14, 
        c = 10, 
        color = '#356520', 
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
                
                if(i<52){
                    polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], '#000000'));
                } else if(i%50===0 && i<200){
                    polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], '#000000'));
                    polygons.push(new Polygon([i+1, i + 2, i + 2 + count, i +1+ count], '#000000'));
                    polygons.push(new Polygon([i+2, i + 3, i + 3 + count, i +2+ count], '#000000'));
                    polygons.push(new Polygon([i+3, i + 4, i + 4 + count, i +3+ count], '#000000'));
                    polygons.push(new Polygon([i+4, i + 5, i + 5 + count, i +4+ count], '#000000'));
                    polygons.push(new Polygon([i+5, i + 6, i + 6 + count, i +5+ count], '#000000'));
                    if (i>70){//polygons.push(new Polygon([i+2, i + 3, i + 3 + count, i +2+ count], '#000000'));
                    //polygons.push(new Polygon([i-1, i, i -1 + count, i-1+ count], '#000000'));
                }
                }else if(i%50===0 && i>300&&i<350){
                    polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], '#000000'));
                    polygons.push(new Polygon([i+1, i + 2, i + 2 + count, i +1+ count], '#000000'));
                    polygons.push(new Polygon([i+2, i + 3, i + 3 + count, i +2+ count], '#000000'));
                    polygons.push(new Polygon([i+3, i + 4, i + 4 + count, i +3+ count], '#000000'));
                    polygons.push(new Polygon([i+4, i + 5, i + 5 + count, i +4+ count], '#000000'));
                    polygons.push(new Polygon([i+5, i + 6, i + 6 + count, i +5+ count], '#000000'));
                    if (i>70){//polygons.push(new Polygon([i+2, i + 3, i + 3 + count, i +2+ count], '#000000'));
                    //polygons.push(new Polygon([i-1, i, i -1 + count, i-1+ count], '#000000'));
                }}else if(i%50===0 && i>150 && i<300){
                    polygons.push(new Polygon([i+2, i + 3, i + 3 + count, i +2+ count], '#000000'));
                    polygons.push(new Polygon([i+3, i + 4, i + 4 + count, i +3+ count], '#000000'));
                   
                    if (i>70){//polygons.push(new Polygon([i+2, i + 3, i + 3 + count, i +2+ count], '#000000'));
                    //polygons.push(new Polygon([i-1, i, i -1 + count, i-1+ count], '#000000'));
                }}else {polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color));}

                
            }   else if (i + count < points.length && (i + 1) % count === 0) {

                if (i<52){polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], '#000000')); }else if(i%50===0 && i<100){
                    polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], '#000000'));
                    polygons.push(new Polygon([i+1, i + 2, i + 2 + count, i +1+ count], '#000000'));
                }else if(i%50===0 && i<200){
                    polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], '#000000'));
                    polygons.push(new Polygon([i+1, i + 2, i + 2 + count, i +1+ count], '#000000'));
                    polygons.push(new Polygon([i+2, i + 3, i + 3 + count, i +2+ count], '#000000'));
                    polygons.push(new Polygon([i+3, i + 4, i + 4 + count, i +3+ count], '#000000'));
                    polygons.push(new Polygon([i+4, i + 5, i + 5 + count, i +4+ count], '#000000'));
                    polygons.push(new Polygon([i+5, i + 6, i + 6 + count, i +5+ count], '#000000'));
                    if (i>70){//polygons.push(new Polygon([i+2, i + 3, i + 3 + count, i +2+ count], '#000000'));
                    //polygons.push(new Polygon([i-1, i, i -1 + count, i-1+ count], '#000000'));
                }
                }else polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color));

            }
        }

        
        
 
        this.points = points; 
        this.edges = edges; 
        this.polygons = polygons; 
        this.center = center; 
    } 
} 
 
export default Ellipsoid;