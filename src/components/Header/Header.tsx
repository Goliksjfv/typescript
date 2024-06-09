import React, { CSSProperties } from "react";
import { EPAGES } from "../../App";

type THeader = {
    setPageName: (name: EPAGES) => void;
}

const Header: React.FC<THeader> = (props: THeader) => {
    const { setPageName } = props;

    return (
        <div style={headerStyle}>
            <button
                style={buttonStyle}
                onClick={() => setPageName(EPAGES.GRAPH_2D)}
            >
                Графика 2D
            </button>
            <button
                style={buttonStyle}
                onClick={() => setPageName(EPAGES.GRAPH_3D)}
            >
                Графика 3D
            </button>
            <button
                style={buttonStyle}
                onClick={() => setPageName(EPAGES.CALC)}
            >
                Калькулятор
            </button>
        </div>
    );
}

export default Header;

const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "linear-gradient(to right, #427ceb, #1dad6f)",
    padding: "10px 0",
};

const buttonStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "linear-gradient(to right, #427ceb, #1dad6f)",
    padding: "10px",
    margin: "0 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
    outline: "none",
};