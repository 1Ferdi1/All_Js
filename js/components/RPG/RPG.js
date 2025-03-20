class rpg extends Component {
    constructor(options) {
        super(options);
        this.current = "start";
        this.hp = 100;
        this.money = 0;
        this.botRoom = "start";
        this.Rooms = {
            start: { 
                title: "Комната в общаге", 
                description: "Надо меньше пить!", 
                img: "/RPGImg/obshaga.jpg", 
                exits: ["hall"] 
            },
            hall: { 
                title: "Холл", 
                description: "Широкий коридор с несколькими дверьми.", 
                img: "/RPGImg/holl.jpg", 
                exits: ["toilet", "start", "diningRoom"] 
            },
            toilet: { 
                title: "Туалет", 
                description: "Уютный туалет с мылом и бумагой.", 
                img: "/RPGImg/toilet.jpg", 
                exits: ["hall", "diningRoom"] 
            },
            diningRoom: { 
                title: "Столовая", 
                description: "Купи еду за монеты!", 
                img: "/RPGImg/diningRoom.jpg", 
                exits: ["hall", "toilet"] 
            }
        };
        this.renderUI();
        this.moveBot();
    }

    renderUI() {
        const room = this.Rooms[this.current];
        document.getElementById('room-title').textContent = room.title;
        document.getElementById('room-image').src = room.img;
        document.getElementById('room-description').textContent = room.description;
        document.getElementById('health').textContent = this.hp;
        document.getElementById('coins').textContent = this.money;
        
        const exitsContainer = document.getElementById('exits-container');
        exitsContainer.innerHTML = '';
        room.exits.forEach(exit => {
            const button = document.createElement('button');
            button.textContent = `Идти в ${this.Rooms[exit].title}`;
            button.addEventListener('click', () => this.moveToRoom(exit));
            exitsContainer.appendChild(button);
        });

        if (this.current === 'diningRoom') {
            const foodButton = document.createElement('button');
            foodButton.textContent = 'Купить еду (30 монет - +10 HP)';
            foodButton.addEventListener('click', () => this.buyFood());
            document.getElementById('food-button-container').appendChild(foodButton);
        }
    }

    moveToRoom(roomName) {
        this.hp -= 10;
        if (this.hp <= 0) {
            alert("Вы потеряли все HP!");
            window.location.reload();
        }
        this.current = roomName;
        this.moveBot();
        this.renderUI();
    }

    moveBot() {
        const room = this.Rooms[this.botRoom];
        if (room.exits.length > 0) {
            const randomExit = room.exits[Math.floor(Math.random() * room.exits.length)];
            this.botRoom = randomExit;
        }
        this.botQuestion();
    }

    botQuestion() {
        if (this.current === this.botRoom) {
            const answer = prompt('Вы встретились с Родионовой. Что такое производная функции в точке?');
            if (answer?.toLowerCase() === 'касательная') {
                this.hp += 30;
                alert('Правильно!');
            } else {
                this.hp = 0;
                alert('Неправильно! Вас ударили ножом, ваши HP = 0');
                window.location.reload();
            }
            this.renderUI();
        }
    }

    buyFood() {
        if (this.money >= 30) {
            this.money -= 30;
            this.hp += 10;
            alert(`Вы купили еду! HP: ${this.hp}, монеты: ${this.money}`);
        } else {
            alert('Недостаточно монет!');
        }
        this.renderUI();
    }

    destroy() {
        document.getElementById(this.id)?.remove();
      }
}