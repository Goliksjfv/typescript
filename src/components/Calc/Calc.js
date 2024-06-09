import React from "react";

import Calculator from "../../modules/Calculator/Calculator";
import PolynomialCalculator from "../../modules/Calculator/PolynomialCalculator";

class Calc extends React.Component {
    constructor(props) {
        super(props);

        this.aRef = React.createRef();
        this.bRef = React.createRef();
    }

    getCalculator(value) {
        if (value.includes('*x^')) {
            return new PolynomialCalculator();
        }
        return new Calculator();
    }

    operandHandler(operand) {
        const aValue = this.aRef.current.value;
        const bValue = this.bRef.current.value;
        const calc = this.getCalculator(aValue);
        const a = calc.getValue(aValue);
        const b = operand === 'prod' ?
            (new Calculator()).getValue(bValue) :
            calc.getValue(bValue);
        const result = calc[operand](a, b);
        if (result === null) {
            document.getElementById('c').value = 'чё-то не так, товарищ... :(';
        } else {
            document.getElementById('c').value = result.toString();
        }
    }

    polyAtAPointHandler() {
        const universalCalc = new Calculator();
        const calc = new PolynomialCalculator();
        const poly = calc.getPolynomial(document.getElementById('poly').value);
        const x = universalCalc.getValue(document.getElementById('x').value);
        const polyAtAPoint = poly.getValue(x);
        document.getElementById('polyAtAPoint').value = polyAtAPoint;
    }

    render() {
        return (
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundImage: "linear-gradient(to right, #427ceb, #1dad6f)",
            }}>
                <div align="center" className="beautyDiv">
                    <p className="beautyP">калькулятор⭢</p>
                </div>
                <div align="center" className="beautyDiv">
                    <textarea ref={this.aRef} placeholder="a" style={textareaStyle}></textarea>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        <button style={buttonStyle} onClick={() => this.operandHandler("add")}>+</button>
                        <button style={buttonStyle} onClick={() => this.operandHandler("sub")}>-</button>
                        <button style={buttonStyle} onClick={() => this.operandHandler('mult')}>*</button>
                        <button style={buttonStyle} onClick={() => this.operandHandler("div")}>/</button>
                        <button style={buttonStyle} onClick={() => this.operandHandler("pow")}>^</button>
                        <button style={buttonStyle} onClick={() => this.operandHandler('prod')}>prod</button>
                        <button style={buttonStyle} onClick={() => this.operandHandler('one')}>1</button>
                        <button style={buttonStyle} onClick={() => this.operandHandler('zero')}>0</button>
                    </div>
                    <textarea ref={this.bRef} placeholder="b" style={textareaStyle}></textarea>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <p style={{ margin: "10px 0" }}> = </p>
                        <textarea id="c" placeholder="результат" style={textareaStyle}></textarea>
                    </div>
                </div>
                <div align="center" className="beautyDiv">
                    <p className="beautyP">⭢ посчитать значение полинома в точке ⭢</p>
                </div>
                <div align="center" className="beautyDiv">
                    <textarea id="poly" placeholder="введите полином" style={textareaStyle}></textarea>
                    <textarea id="x" placeholder="введите икс" style={textareaStyle}></textarea>
                    <div>
                        <button style={buttonStyle} onClick={() => this.polyAtAPointHandler()}>=</button>
                    </div>
                    <div>
                        <textarea id="polyAtAPoint" placeholder="результат" style={textareaStyle}></textarea>
                    </div>
                </div>
            </div>
        );
    }
}

const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "linear-gradient(to right, #427ceb, #1dad6f)",
    padding: "10px",
    margin: "5px",
};

const textareaStyle = {
    width: "200px",
    height: "40px",
    margin: "5px",
    padding: "5px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
};

export default Calc;