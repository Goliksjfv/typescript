import React from "react";
import { EPAGES } from "../../App";


type THeader = {
    setPageName: (name: EPAGES) => void;
}

const Header: React.FC<THeader> = (props: THeader) => {
    const { setPageName } = props;

    return (<div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
            "linear-gradient(to right, #427ceb, #1dad6f)",
            
    }}>
        <button style={{ display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
            "linear-gradient(to right, #427ceb, #1dad6f)",}} onClick={() => setPageName(EPAGES.GRAPH_2D)}>Графика 2Д</button>
        <button style={{ display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
            "linear-gradient(to right, #427ceb, #1dad6f)",}} onClick={() => setPageName(EPAGES.GRAPH_3D)}>Графика 3Д</button>
        <button style={{ display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
            "linear-gradient(to right, #427ceb, #1dad6f)",}} onClick={() => setPageName(EPAGES.CALC)}>Бульбулятор</button>
    </div>);
}

export default Header;


