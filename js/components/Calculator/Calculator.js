class Calculator extends Component {
    constructor(options) {
        super(options);
        
        this.handlers = []; // Хранилище для ссылок на обработчики
        this.initHandlers();
    }

    initHandlers() {
        // Сохраняем ссылки на обработчики для последующего удаления
        const operandHandler = (e) => this.operandHandler(e);
        const getValueHandler = () => this.getValueHandler();
        
        document.querySelectorAll('.operand').forEach(button => {
            button.addEventListener('click', operandHandler);
            this.handlers.push({element: button, type: 'click', handler: operandHandler});
        });
        
        const getValueButton = document.getElementById('get-value');
        if (getValueButton) {
            getValueButton.addEventListener('click', getValueHandler);
            this.handlers.push({element: getValueButton, type: 'click', handler: getValueHandler});
        }
    }

    operandHandler(event) {
        try {
            const a = this.getEntity(document.getElementById('a').value);
            const b = this.getEntity(document.getElementById('b').value);
            const operand = event.target.dataset.operand;
            const result = this[operand](a, b);
            document.getElementById('c').value = result.toString();
        } catch (e) {
            document.getElementById('c').value = "Ошибка: " + e.message;
        }
    }

    getValueHandler() {
        try {
            const a = this.getEntity(document.getElementById('a').value);
            const matrix = document.getElementById('b').value.split('\n')
                .map(row => row.split(',').map(c => this.parseInput(c.trim())));
            if (!(a instanceof Polynomial)) {
                throw new Error("Первый операнд должен быть полиномом");
            }
            const result = matrix.map(row =>
                row.map(c => a.getValue(c).toString()).join(', ')
            ).join('\n');
            document.getElementById('c').value = result;
        } catch (e) {
            document.getElementById('c').value = "Ошибка: " + e.message;
        }
    }

    getEntity(str) {
        str = str.replace(/\s/g, "");
        if (str.includes("[")) return this.getMatrix(str);
        if (str.includes("(")) return this.getVector(str);
        if (this.isPolynomial(str)) return this.parsePolynomial(str);
        return this.getComplex(str);
    }

    isPolynomial(str) {
        return /[xX]/.test(str);
    }

    parsePolynomial(str) {
        const members = [];
        const arrStr = str.replace(/\s+/g, '').replace(/-/g, ' -').split(/[+ ]/g);
        arrStr.forEach(s => s && members.push(this.getMember(s)));
        return new Polynomial(members);
    }

    getMember(str) {
        if (typeof str === 'number') return new Member(str);
        const arrStr = str.split('*x^');
        return new Member(this.parseInput(arrStr[0]), arrStr[1] - 0);
    }

    getMatrix(str) {
        return new Matrix(
            str.slice(1, -1).split("|")
                .map(row => row.split(";").map(elem => this.parseInput(elem)))
        );
    }

    getVector(str) {
        return new Vector(
            str.slice(1, -1).split(",").map(elem => this.parseInput(elem))
        );
    }

    getComplex(str) {
        const complexRegex = /([-+]?\d*\.?\d*)([+-]i\d*\.?\d*)?/;
        const match = str.match(complexRegex);
        if (!match) throw new Error("Некорректный формат комплексного числа");
        let re = parseFloat(match[1]) || 0;
        let im = parseFloat((match[2] || 'i0').replace('i', '')) || 0;
        if (str.includes('-i')) im = -im;
        return new Complex(re, im);
    }

    add(a, b) {
        if (a instanceof Complex && b instanceof Complex) {
            return new Complex(a.re + b.re, a.im + b.im);
        }
        throw new Error("Несовместимые типы данных");
    }

    sub(a, b) {
        if (a instanceof Complex && b instanceof Complex) {
            return new Complex(a.re - b.re, a.im - b.im);
        }
        throw new Error("Несовместимые типы данных");
    }

    mult(a, b) {
        if (a instanceof Complex && b instanceof Complex) {
            const re = a.re * b.re - a.im * b.im;
            const im = a.re * b.im + a.im * b.re;
            return new Complex(re, im);
        }
        throw new Error("Несовместимые типы данных");
    }

    div(a, b) {
        if (a instanceof Complex && b instanceof Complex) {
            const denominator = b.re ** 2 + b.im ** 2;
            if (denominator === 0) throw new Error("Деление на ноль");
            const re = (a.re * b.re + a.im * b.im) / denominator;
            const im = (a.im * b.re - a.re * b.im) / denominator;
            return new Complex(re, im);
        }
        throw new Error("Несовместимые типы данных");
    }

    pow(a, n) {
        if (!Number.isInteger(n) || n < 0) throw new Error("Степень должна быть целым неотрицательным числом");
        let result = new Complex(1, 0);
        for (let i = 0; i < n; i++) {
            result = this.mult(result, a);
        }
        return result;
    }

    prod(a) {
        if (a instanceof Vector) {
            return a.values.reduce((product, v) => this.mult(product, v), new Complex(1, 0));
        }
        if (a instanceof Matrix) {
            return a.values.flat().reduce((product, v) => this.mult(product, v), new Complex(1, 0));
        }
        throw new Error("Операция prod поддерживается только для векторов и матриц");
    }
}

class Complex {
    constructor(re, im = 0) {
        this.re = re;
        this.im = im;
    }
    toString() {
        if (this.im === 0) return `${this.re}`;
        return `${this.re}${this.im >= 0 ? '+' : ''}${this.im}i`;
    }
}

class Vector {
    constructor(values) {
        this.values = values;
    }
    toString() {
        return `(${this.values.map(v => v.toString()).join(', ')})`;
    }
}

class Matrix {
    constructor(values) {
        this.values = values;
    }
    toString() {
        return `[${this.values.map(row => row.map(v => v.toString()).join('; ')).join('|')}]`;
    }
}

class Polynomial {
    constructor(members) {
        this.members = members;
    }
    getValue(x) {
        return this.members.reduce((sum, member) => {
            const term = member.coefficient.mult(x.pow(member.power));
            return sum.add(term);
        }, new Complex(0, 0));
    }
    toString() {
        return this.members.map(member => member.toString()).join(' + ');
    }
}

class Member {
    constructor(coefficient, power = 0) {
        this.coefficient = coefficient;
        this.power = power;
    }
    getValue(x) {
        return this.coefficient.mult(x.pow(this.power));
    }
    toString() {
        return `${this.coefficient}${this.power > 0 ? `*x^${this.power}` : ''}`;
    }
}