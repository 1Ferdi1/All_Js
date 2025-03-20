class Target extends Component {
    constructor(options) {
        super(options);
        this.initHandlers();
    }

    initHandlers() {
        document.getElementById('shootButton').addEventListener('click', () => this.shoot());
    }

    shoot() {
        const count = +document.getElementById('count').value || 0;
        const isRandom = document.getElementById('random').checked;
        const x = parseFloat(document.getElementById('x').value) || 0;
        const y = parseFloat(document.getElementById('y').value) || 0;

        if (!isRandom && (isNaN(x) || isNaN(y))) {
            alert("Введите корректные координаты!");
            return;
        }

        const points = this.calculatePoints(count, isRandom, x, y);
        document.getElementById('result').textContent = points;
    }

    calculatePoints(count, isRandom, x, y) {
        let total = 0;
        for (let i = 0; i < count; i++) {
            const dx = isRandom ? Math.random() * 10 : x;
            const dy = isRandom ? Math.random() * 10 : y;
            const distance = Math.sqrt(dx ** 2 + dy ** 2);
            total += Math.max(0, 10 - distance);
        }
        return Math.round(total);
    }

    destroy() {
        document.getElementById('shootButton')?.removeEventListener('click', this.shoot);
        document.getElementById(this.id)?.remove();
      }
}