import React, { useState } from "react";
import { TFunction } from "../Graph2D";
import useMyFunction from "./hooks/useMyFunction";
import Func from "./Func/Func";

type TUI2D = {
    funcs: TFunction[];
}

const UI2D: React.FC<TUI2D> = (props: TUI2D) => {
    const { funcs } = props;
    const [count, setCount] = useState<number>(funcs.length);
    const [getFunction] = useMyFunction();

    const addFunction = () => {
        funcs.push({
            f: getFunction('0'),
            color: 'black',
            width: 2
        });
        setCount(funcs.length);
    }

    const delFunction = (index: number): void => {
        funcs.splice(index, 1)
        setCount(funcs.length);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: "linear-gradient(to right, #427ceb, #1dad6f)",
                    padding: "10px",
                    margin: "5px",
                }}
                onClick={addFunction}
                className="beautyButton"
            >
                +
            </button>
            <div>
                {funcs.map((func, index) =>
                    <Func
                        key={`${index}${Math.random()}`}
                        func={func}
                        index={index}
                        delFunction={delFunction}
                    />
                )}
            </div>
        </div>
    );
}

export default UI2D;