class Cylinder extends Figure {
    constructor(segments = 20, height = 15, radius = 10) {
        super();
        this.segments = segments;
        this.height = height;
        this.radius = radius;
        this.points = [];
        this.edges = [];
        this.polygons = [];
        
        this.generatePoints();
        this.generateEdges();
        this.generatePolygons();
    }

    generatePoints() {
        const angleStep = (2 * Math.PI) / this.segments;
        
        // Генерация двух окружностей (верх и низ)
        for (let level = -this.height; level <= this.height; level += this.height * 2) {
            for (let i = 0; i < this.segments; i++) {
                const angle = angleStep * i;
                this.points.push(new Point(
                    this.radius * Math.cos(angle),
                    this.radius * Math.sin(angle),
                    level
                ));
            }
        }
    }

    generateEdges() {
        // Соединение точек в окружностях
        for (let i = 0; i < this.segments; i++) {
            this.edges.push(new Edge(i, (i + 1) % this.segments));
            this.edges.push(new Edge(
                i + this.segments, 
                ((i + 1) % this.segments) + this.segments
            ));
        }

        // Вертикальные рёбра между окружностями
        for (let i = 0; i < this.segments; i++) {
            this.edges.push(new Edge(i, i + this.segments));
        }
    }

    generatePolygons() {
        // Боковые грани
        for (let i = 0; i < this.segments; i++) {
            const next = (i + 1) % this.segments;
            this.polygons.push(new Polygon([
                i,
                next,
                next + this.segments,
                i + this.segments
            ], '#FF0000'));
        }

        // Верхняя и нижняя крышки
        this.polygons.push(new Polygon(
            Array.from({length: this.segments}, (_, i) => i), 
            '#00FF00'
        ));
        
        this.polygons.push(new Polygon(
            Array.from({length: this.segments}, (_, i) => i + this.segments), 
            '#0000FF'
        ));
    }
}