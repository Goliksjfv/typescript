import { Complex, Vector, Matrix } from "./types";
import {
    RealCalculator,
    ComplexCalculator,
    VectorCalculator,
    MatrixCalculator
} from "./calculators";
import ICalculator from "./calculators/ICalculator";
import AnyType from "./types/AnyType";

class Calculator implements ICalculator<AnyType>{

    getValue(str) {
        if (str.includes('\n')) { return this.getMatrix(str) };
        if (str.includes('(')) { return this.getVector(str) };
        if (str.includes('i')) { return this.getComplex(str) };
        return str - 0;
    }

    getMatrix(str:string):Matrix {
        if (str instanceof Array) return new Matrix(str);
        if (str && typeof str === 'string') {
            const arr = str.replace(' ', '').split('\n');
            const values = [];
            for (let i = 0; i < arr.length; i++) {
                values.push(arr[i].split(',').map(el => this.getValue(el)));
            }
            if (values[0] instanceof Array) {
                return new Matrix(values);
            }
        }
        return null;
    }

    getVector(str:string):Vector {
        if (str instanceof Array) return new Vector(str);
        if (str && typeof str === 'string') {
            const arr = str.replace(' ', '').replace('(', '').replace(')', '').split(';').map(el => this.getValue(el));
            return new Vector(arr);
        }
        return null;
    }

    getComplex(str:string):Complex {
        if (typeof str === 'number') return new Complex(str);
        if (str && typeof str === 'string') {
            const arrStr = str.split('i*');
            if (arrStr.length === 2) {
                //2+i*5
                if (arrStr[0].includes('+')) {
                    arrStr[0] = arrStr[0].replace('+', '');
                    return new Complex(arrStr[0] - 0, arrStr[1] - 0);
                }
                //2-i*5
                if (arrStr[0].includes('-')) {
                    arrStr[0] = arrStr[0].replace('-', '');
                    return new Complex(arrStr[0] - 0, - arrStr[1] - 0);
                }
            }
            if (arrStr.length === 1) {
                if (isNaN(arrStr[0] - 0)) return null;
                return new Complex(arrStr[0] - 0);
            }
        }
        return null;
    }

    complex(re?:number, im?:number):Complex { return new Complex(re, im); }
    vector(values?:AnyType[]):Vector { return new Vector(values); }
    matrix(values?:AnyType[][]):Matrix { return new Matrix(values); }

    export enum EOperand{
        add='add',
        sub='sub',
        mult='mult',
        div='div',
        prod='prod',
        pow='pow',
        one='one',
        zero='zero'
    } 

    get(elem?:AnyType):ICalculator<AnyType> {
        if (elem instanceof Matrix) {
            return new MatrixCalculator(this.get(elem.values[0][0]));
        }
        if (elem instanceof Vector) {
            return new VectorCalculator(this.get(elem.values[0]));
        }
        if (elem instanceof Complex) {
            return new ComplexCalculator();
        }
        return new RealCalculator();
    }

    [EOperand.add](a:AnyType, b:AnyType):AnyType {
        return this.get(a).add(a, b);
    }

    [EOperand.sub](a:AnyType, b:AnyType):AnyType{
        return this.get(a).sub(a, b);
    }

    [EOperand.mult](a:AnyType, b:AnyType):AnyType {
        return this.get(a).mult(a, b);
    }

    [EOperand.div](a:AnyType, b:AnyType):AnyType {
        return this.get(a).div(a, b);
    }

    [EOperand.pow](a:AnyType, n:AnyType):AnyType|null {
        if (typeof n === 'number') {
            return this.get(a).pow(a, n);
        }
        return null;
    }

    [EOperand.prod](a:AnyType, p:AnyType):AnyType|null{
        if (typeof p === 'number') {
            return this.get(a).prod(a, p);
        }
        return null;
    }

    [EOperand.one](type:AnyType, elem:AnyType):AnyType{
        type = type ? type : elem ? elem.constructor.name : null;
        switch (type) {
            case 'Complex': return this.get(this.complex()).one();
            case 'Vector': return this.get(elem).one(elem.values.length);
            case 'Matrix': return this.get(elem).one(elem.values.length);
            default: return this.get().one();
        }
    }

    [EOperand.zero](type:AnyType, elem:AnyType):AnyType {
        type = type ? type : elem ? elem.constructor.name : null;
        switch (type) {
            case 'Complex': return this.get(this.complex()).zero();
            case 'Vector': return this.get(elem).zero(elem.values.length);
            case 'Matrix': return this.get(elem).zero(elem.values.length);
            default: return this.get().zero();
        }
    }
}

export default Calculator;