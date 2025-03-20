class UI2D extends Component {
    constructor(options) {
        super(options);
        this.num = 0;
    }

    addEventListeners() {
        document.getElementById('addFunction').addEventListener('click', () => this.addFunction());
    }

    addFunction() {
        let button = document.createElement('button');
        button.setAttribute('id', 'delete');
        button.setAttribute('class', 'del');
        button.innerHTML = 'Удалить';
        button.addEventListener('click', () => {
            this.callbacks.delFunction(input.dataset.num);
            div.removeChild(input);
            div.removeChild(button);
            div.removeChild(color);
        });

        let color = document.createElement('input');
        color.setAttribute('placeholder', 'цвет');
        color.setAttribute('id', 'color' + this.num);
        color.setAttribute('class', 'params');
        color.dataset.num = this.num;
        color.addEventListener('keyup', () => this.getValue(color));

        let input = document.createElement('input');
        input.setAttribute('placeholder', `функция`);
        input.setAttribute('id', 'inp' + this.num);
        input.setAttribute('class', 'params');
        input.dataset.num = this.num;
        input.addEventListener('keyup', () => this.keyup(input));

        let div = document.createElement('div');

        let funcsInputs = document.getElementById('funcsInputs');
        funcsInputs.appendChild(div);
        div.appendChild(input);
        div.appendChild(color);
        div.appendChild(button);
        this.num++;
    }

    keyup(elem) {
        try {
            let f;
            eval(`f = function (x) {return ${elem.value};}`);
            let color = document.getElementById(`color${elem.dataset.num}`);

            this.callbacks.addFunction(f, elem.dataset.num, color.value);
        } catch (e) {
            console.log(e);
        }
    }

    getValue(elem) {
        let f;
        let color = document.getElementById(`color${elem.dataset.num}`);
        let graph = document.getElementById(`inp${elem.dataset.num}`);

        eval(`f = function (x) {return ${graph.value};}`);
        this.callbacks.addFunction(f, elem.dataset.num, color.value);
    }
}