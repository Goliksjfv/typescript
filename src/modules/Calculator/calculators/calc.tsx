import { useRef } from "react"
import useCalculator from "./useCalculator";
import { EOperand } from "../Calculator";

const Calc: React.FC = () => {
    const refA = useRef<HTMLTextAreaElement>(null);
    const refB = useRef<HTMLTextAreaElement>(null);
    const refC = useRef<HTMLTextAreaElement>(null);
    const calc = useCalculator(refA,refB,refC);
    return(<>
        <textarea ref={refA}/>
        <textarea ref={refB}/>
        <textarea ref={refC}/>
        <div>  
            <button onClick={() => calc(EOperand.add)}>+</button>
            <button onClick={() => calc(EOperand.sub)}>-</button>
            <button onClick={() => calc(EOperand.mult)}>*</button>
            <button onClick={() => calc(EOperand.div)}>/</button>
            <button onClick={() => calc(EOperand.pow)}>^</button>
            <button onClick={() => calc(EOperand.prod)}>prod</button>
            <button onClick={() => calc(EOperand.one)}>1</button>
            <button onClick={() => calc(EOperand.zero)}>0</button>
        </div>
    </>)

}