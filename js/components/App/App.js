class App extends Component {
    constructor(options) {
        super(options);

        new Menu({
            id: 'menu',
            parent: this.id,
            template: template.menuTemplate,
            callbacks: {
                show: (name) => this.showContent(name),
            }
        });

        this.esse = new Esse({
            id: 'esse',
            parent: this.id,
            template: template.esseTemplate,
        });

        this.calculator = new Calculator({
            id: 'calculator',
            parent: this.id,
            template: template.calculatorTemplate,
        });

        this.graph2D = new Graph2D({
            id: 'graph2D',
            parent: this.id,
            template: template.graph2DTemplate,
        });

        this.rpg = new rpg({
            id: 'rpg',
            parent: this.id,
            template: template.rpgTemplate,
        });

        this.target = new Target({
            id: 'target',
            parent: this.id,
            template: template.targetTemplate,
        });

        this.graph3D = new Graph3D({
            id: 'graph3D',
            parent: this.id,
            template: template.graph3DTemplate,
        })

        this.showContent('graph3D');
    }

    showContent(name) {
        this.esse.hide();
        this.calculator.hide();
        this.graph2D.hide();
        this.rpg.hide();
        this.target.hide();
        this.graph3D.hide();
        this[name].show();
    }
}