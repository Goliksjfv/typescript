import { useEffect, useRef, CSSProperties } from "react";
import useGraph, { TWIN3D, Graph } from '../../modules/Graph';
import Math3D, {
    Point, Light, Polygon, EDistance, Sphera, Cube,
} from "../../modules/Math3D";
import Surface from "../../modules/Math3D/entites/Surface";
import Checkbox3D from "./Checkbox3D/Checkbox3D";
import Pyramid from "../../modules/Math3D/surfaces/pyramid";
import Torus from "../../modules/Math3D/surfaces/torus";
import hyperbolicParaboloid from "../../modules/Math3D/surfaces/hyperbolicParaboloid";
import kleinBottle from "../../modules/Math3D/surfaces/KleinBottle";
import Cone from "../../modules/Math3D/surfaces/cone";
import Ellipsoid from "../../modules/Math3D/surfaces/ellipsoid";
import HyperbolicCylinder from "../../modules/Math3D/surfaces/hyperbolicCylinder";
import parabolicCylinder from "../../modules/Math3D/surfaces/parabolicCylinder";
import EllipticalCylinder from "../../modules/Math3D/surfaces/ellipticalCylinder";
import singleStripHyperboloid from "../../modules/Math3D/surfaces/singleStripHyperboloid";
import doubleStripHyperboloid from "../../modules/Math3D/surfaces/doubleStripHyperboloid";
import EllipticalParaboloid from "../../modules/Math3D/surfaces/ellipticalParaboloid";
import '../../Style.css';

export enum ECustom {
    showPoints = 'showPoints',
    showEdges = 'showEdges',
    showPolygons = 'showPolygons',
    animationOn = 'animationOn',
}

export enum changeColor {

}

const Graph3D = () => {
    const WIN: TWIN3D = {
        LEFT: -5,
        BOTTOM: -5,
        WIDTH: 10,
        HEIGHT: 10,
        CENTER: new Point(0, 0, -40),
        CAMERA: new Point(0, 0, -50)
    }
    let graph: Graph | null = null;
    const [getGraph, cancelGraph] = useGraph(renderScene);
    const LIGHT = new Light(-40, 15, 0, 1500);
    const math3D = new Math3D({ WIN });
    let scene: Surface[] = [new Sphera()];
    // флажки
    let canMove = false;
    const custom = {
        [ECustom.showPoints]: false,
        [ECustom.showEdges]: false,
        [ECustom.showPolygons]: true,
        [ECustom.animationOn]: false,
    }
    let dx = 0;
    let dy = 0;

    function mouseup() {
        canMove = false;
    }

    function mouseleave() {
        canMove = false;
    }

    function mousedown() {
        canMove = true;
    }

    // надо как-то поменять
    function mousemove(event: MouseEvent) {
        const gradus = Math.PI / 180 / 4;
        if (canMove) {
            scene.forEach(surface =>
                surface.points.forEach(point => {
                    const T1 = math3D.rotateOy((dx - event.offsetX) * gradus);
                    const T2 = math3D.rotateOx((dy - event.offsetY) * gradus);
                    const T = math3D.getTransform(T1, T2);
                    math3D.transform(T, point);
                })
            );
        }
        dx = event.offsetX;
        dy = event.offsetY;
    }

    function wheel(event: WheelEvent) {
        event.preventDefault();
        const delta = (event.deltaY > 0) ? 1.1 : 0.9;
        const matrix = math3D.zoom(delta);
        scene.forEach(surface =>
            surface.points.forEach(point =>
                math3D.transform(matrix, point)
            )
        );
    }
    const pointsRef = useRef<HTMLInputElement>(null);
    const edgesRef = useRef<HTMLInputElement>(null);
    const polygonsRef = useRef<HTMLInputElement>(null);
    

    function renderScene(FPS?: number): void {
        if (!graph) {
            return;
        }
        graph.clear();
        const colorOfPoints = pointsRef.current!.value;
        const colorOfEdges = edgesRef.current!.value;
        const colorOfPolygons = polygonsRef.current!.value;
        if (custom.showPolygons) {
            const polygons: Polygon[] = [];
            scene.forEach((surface, index) => {
                math3D.calcDistance(surface, WIN.CAMERA, EDistance.distance);
                math3D.calcDistance(surface, LIGHT, EDistance.lumen);
                surface.polygons.forEach(polygon => {
                    polygon.index = index;
                    polygon.color=polygon.hexToRgb(colorOfPolygons);
                    polygons.push(polygon);
                });
            });
            math3D.sortByArtistAlgorithm(polygons);
            polygons.forEach(polygon => {
                const points = polygon.points.map(index =>
                    new Point(
                        math3D.xs(scene[polygon.index].points[index]),
                        math3D.ys(scene[polygon.index].points[index])
                    )
                );
                const lumen = math3D.calcIllumination(polygon.lumen, LIGHT.lumen);
                let { r, g, b } = polygon.color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                graph && graph.polygon(points, polygon.rgbToHex(r, g, b));
            });
        }

        if (custom.showPoints) {
            scene.forEach(surface =>
                surface.points.forEach(point => {
                    graph && graph.point(
                        math3D.xs(point),
                        math3D.ys(point),
                        colorOfPoints
                    );
                })
            );
        }

        if (custom.showEdges) {
            scene.forEach(surface =>
                surface.edges.forEach(edge => {
                    const point1 = surface.points[edge.p1];
                    const point2 = surface.points[edge.p2];
                    graph && graph.line(
                        math3D.xs(point1), math3D.ys(point1),
                        math3D.xs(point2), math3D.ys(point2),
                        colorOfEdges || '#800080');
                })
            );
        }
    }

    const changeValue = (flag: ECustom, value: boolean) => {
        custom[flag] = value;
    }

    const changeScene = (event: React.ChangeEvent<HTMLSelectElement>) => {
        switch (event.target.value) {
            case 'Sphera': scene = [new Sphera()]; break;
            case 'Cube': scene = [new Cube()]; break;
            case 'pyramid': scene = [new Pyramid()]; break;
            case 'torus': scene = [new Torus()]; break;
            case 'hyperbolicParaboloid': scene = [new hyperbolicParaboloid()]; break;
            case 'KleinBottle': scene = [new kleinBottle()]; break;
            case 'cone': scene = [new Cone]; break;
            case 'ellipsoid': scene = [new Ellipsoid]; break;
            case 'hyperbolicCylinder': scene = [new HyperbolicCylinder]; break;
            case 'parabolicCylinder': scene = [new parabolicCylinder]; break;
            case 'ellipticalCylinder': scene = [new EllipticalCylinder]; break;
            case 'singleStripHyperboloid': scene = [new singleStripHyperboloid]; break;
            case 'doubleStripHyperboloid': scene = [new doubleStripHyperboloid]; break;
            case 'ellipticalParaboloid': scene = [new EllipticalParaboloid]; break;
            case 'hyperbolicParaboloid': scene = [new hyperbolicParaboloid]; break;
        }
    }

    useEffect(() => {
        graph = getGraph({
            WIN,
            id: 'graph3DCanvas',
            width: 500,
            height: 500,
            callbacks: {
                wheel,
                mousemove,
                mouseup,
                mousedown,
                mouseleave,
            },
        });

        const interval = setInterval(() => {
            if (custom.animationOn) {
                scene.forEach(surface => surface.doAnimation(math3D));
            }
        }, 50);

        return () => {
            clearInterval(interval);
            cancelGraph();
        }
    }, []);

    const containerStyle: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: "linear-gradient(to right, #427ceb, #1dad6f)",
    };

    return (
        <div style={containerStyle} className="beautyDiv">
            <canvas id='graph3DCanvas' />
            <div className="checkbox">
                <Checkbox3D
                    text="точки"
                    id="points"
                    custom={ECustom.showPoints}
                    customValue={custom[ECustom.showPoints]}
                    changeValue={changeValue}
                /><input type="color" ref={pointsRef} defaultValue="#ff0000"/><br></br>
                <Checkbox3D
                    text="рёбра"
                    id="edges"
                    custom={ECustom.showEdges}
                    customValue={custom[ECustom.showEdges]}
                    changeValue={changeValue}
                /><input type="color" ref={edgesRef} defaultValue="#00EEFF"/><br></br>
                <Checkbox3D
                    text="полигоны"
                    id="polygons"
                    custom={ECustom.showPolygons}
                    customValue={custom[ECustom.showPolygons]}
                    changeValue={changeValue}
                /><input type="color" ref={polygonsRef} defaultValue="#356520"/><br></br>
            </div>
            <div>
                <select onChange={changeScene} className="selectFigures">
                    <option value="Sphera">сфера</option>
                    <option value="Cube">кубик</option>
                    <option value="pyramid">пирамидка</option>
                    <option value="torus">Бублик</option>
                    <option value="KleinBottle">бутылка Клейна</option>
                    <option value="cone">конус</option>
                    <option value="ellipsoid">эллипсоид</option>
                    <option value="hyperbolicCylinder">гиперболический цилиндр</option>
                    <option value="parabolicCylinder">параболический цилиндр</option>
                    <option value="ellipticalCylinder">эллиптический цилиндр</option>
                    <option value="singleStripHyperboloid">однополосной гиперболоид</option>
                    <option value="doubleStripHyperboloid">двуполосной гиперболоид</option>
                    <option value="ellipticalParaboloid">эллиптический параболоид</option>
                    <option value="hyperbolicParaboloid">чипсина</option>
                </select>
            </div>
        </div>
    );
}

export default Graph3D;