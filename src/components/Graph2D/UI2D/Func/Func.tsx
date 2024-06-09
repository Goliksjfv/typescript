import React, { KeyboardEvent } from "react";
import { TFunction } from "../../Graph2D";
import useMyFunction from "../hooks/useMyFunction";

type TFunc = {
    func: TFunction;
    index: number;
    delFunction: (index: number) => void
}

const Func: React.FC<TFunc> = (props: TFunc) => {
    const { func, index, delFunction } = props;
    const [getFunction, getFunctionBody] = useMyFunction();

    const changeFunction = (event: KeyboardEvent<HTMLInputElement>) => {
        func.f = getFunction(event.currentTarget.value);
    }

    const changeColor = (event: KeyboardEvent<HTMLInputElement>) => {
        func.color = event.currentTarget.value;
    }

    const changeWidth = (event: KeyboardEvent<HTMLInputElement>) => {
        const width = Number(event.currentTarget.value);
        if (!isNaN(width) && width > 0 && width < 10) {
            func.width = width;
        }
    }

    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input 
                onKeyUp={changeFunction} 
                placeholder="f(x)" 
                defaultValue={getFunctionBody(func.f)}
                style={inputStyle}
            />
            <input 
                onKeyUp={changeColor} 
                placeholder="color" 
                defaultValue={func.color}
                style={inputStyle}
            />
            <input 
                onKeyUp={changeWidth}
                placeholder="width" 
                defaultValue={func.width.toString()}
                style={inputStyle}
            />
            <button
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: "linear-gradient(to right, #427ceb, #1dad6f)",
                    padding: "10px",
                    marginLeft: "10px",
                }}
                onClick={() => delFunction(index)}
            >
                -
            </button>
        </div>
    );
}

export default Func;

const inputStyle = {
    marginRight: "10px",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
};