class Graph2D extends Component {
    constructor(options) {
        super(options);
        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20
        };

        this.graph = new Canvas({
            id: 'canvas2D',
            width: 600,
            height: 600,
            WIN: this.WIN,
            callbacks: {
                mousemove: (event) => this.mousemove(event),
                wheel: (event) => this.wheel(event),
                mouseup: () => this.mouseup(),
                mousedown: () => this.mousedown(),
                mouseleave: () => this.mouseleave()
            }
        });

        new UI2D({
            id: 'ui',
            parent: this.id,
            template: template.uiTemplate,
            callbacks: {
                addFunction: (f, num, color, flag) => this.addFunction(f, num, color, flag),
                delFunction: (num) => this.delFunction(num),
            }
        });

        this.funcs = [];
        this.canMove = false;
        this.derivativeX = 0;
        this.currentMouseX = 0;
        this.ZOOM = 0.5;
        this.render2D();
    }

    addFunction(f, num, color, printDer) {
        this.funcs[num] = {
            f: f,
            color: color || 'blue',
            printDer: printDer || false
        };
        this.render2D();
    }

    delFunction(num) {
        this.funcs[num] = null;
        this.render2D();
    }

    setColor(color, num) {
        if (this.funcs[num]) {
            this.funcs[num].color = color;
            this.render2D();
        }
    }


    setFlag(flag, num) {
        if (this.funcs[num]) {
            this.funcs[num].flag = flag;
            this.render2D();
        }
    }

    mousemove(event) {
        if (this.canMove) {
            this.WIN.LEFT -= this.graph.sx(event.movementX);
            this.WIN.BOTTOM += this.graph.sy(event.movementY);
        }
        this.derivativeX = this.WIN.LEFT + this.graph.sx(event.offsetX);
        this.render2D();
    }

    wheel(event) {
        event.preventDefault();
        const delta = event.deltaY > 0 ? this.ZOOM : -this.ZOOM;
        this.WIN.WIDTH += delta;
        this.WIN.HEIGHT += delta;
        this.WIN.LEFT -= delta / 2;
        this.WIN.BOTTOM -= delta / 2;
        this.render2D();
    }

    mousedown() {
        this.canMove = true;
    }

    mouseup() {
        this.canMove = false;
    }

    mouseleave() {
        this.canMove = false;
    }

    printOXY() {
        const { LEFT, BOTTOM, HEIGHT, WIDTH } = this.WIN;
        
        // Упрощенная разметка без точек
        for (let i = Math.ceil(LEFT); i < LEFT + WIDTH; i++) {
            this.graph.line(i, BOTTOM, i, BOTTOM + HEIGHT, '#eee'); // Светло-серая сетка
        }
        for (let i = Math.ceil(BOTTOM); i < BOTTOM + HEIGHT; i++) {
            this.graph.line(LEFT, i, LEFT + WIDTH, i, '#eee');
        }
    
        // Оси цвета steelblue
        // Ось X
        this.graph.line(LEFT, 0, LEFT + WIDTH, 0, 'green', 2.5);
        // Ось Y
        this.graph.line(0, BOTTOM, 0, BOTTOM + HEIGHT, 'green', 2.5);
    
        // Стрелки с новым дизайном
        this.graph.line(LEFT + WIDTH, 0, LEFT + WIDTH - 0.9, 0.5, 'green', 2);
        this.graph.line(LEFT + WIDTH, 0, LEFT + WIDTH - 0.9, -0.5, 'green', 2);
        this.graph.line(0, BOTTOM + HEIGHT, 0.5, BOTTOM + HEIGHT - 0.9, 'green', 2);
        this.graph.line(0, BOTTOM + HEIGHT, -0.5, BOTTOM + HEIGHT - 0.9, 'green', 2);
    
        // Подписи осей
        this.graph.text("X", LEFT + WIDTH - 0.7, 0.7, 'black', '14px Arial');
        this.graph.text("Y", -0.7, BOTTOM + HEIGHT - 0.7, 'black', '14px Arial');
    }

    setDerivative(setDer, num) {
        if (this.funcs[num]) {
            this.funcs[num].setDer = setDer;
            this.render2D();
        }
    }

    printDerivative(f, x0, dx) {
        const k = Math.getDerivative(f, x0, dx);
        let b = f(x0) - k * x0;
        let x1 = this.WIN.LEFT;
        let x2 = this.WIN.LEFT + this.WIN.WIDTH;
        let y1 = k * x1 + b;
        let y2 = k * x2 + b;
        this.graph.line(x1, y1, x2, y2, 'black', 1, (9, 5));
        this.graph.point(x0, f(x0), 'green');
    }

    renderFunction(f, color) {
        let x = this.WIN.LEFT;
        const dx = this.WIN.WIDTH / 500;
        while (x < this.WIN.WIDTH + this.WIN.LEFT) {
            this.graph.line(x, f(x), x + dx, f(x + dx), color);
            x += dx;
        }
    }

    render2D() {
        this.graph.clear();
        this.printOXY();

        for (let i = 0; i < this.funcs.length; i++) {
            if (this.funcs[i]) {
                this.renderFunction(this.funcs[i].f, this.funcs[i].color, this.funcs[i].flag);
            }


        }
        this.funcs.forEach(element => {
            if (element?.printDer) {
                this.printDerivative(element.f, this.derivativeX);

            }
        })

    }
}