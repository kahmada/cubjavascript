const TILE_SIZE = 32;
const MAP_NUM_ROWS = 11;
const MAP_NUM_COLS = 15;
const WINDOW_WIDTH = TILE_SIZE * MAP_NUM_COLS;
const WINDOW_HEIGHT = TILE_SIZE * MAP_NUM_ROWS;

class Map {
    constructor() {
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }

    render() {
        for (let i = 0; i < MAP_NUM_ROWS; i++) {
            for (let j = 0; j < MAP_NUM_COLS; j++) {
                let tileX = j * TILE_SIZE;
                let tileY = i * TILE_SIZE;
                let tileColor = this.grid[i][j] === 1 ? "black" : "white";
                fill(tileColor);
                stroke(0);
                rect(tileX, tileY, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

class Player {
    constructor() {
        this.x = WINDOW_WIDTH / 2;
        this.y = WINDOW_HEIGHT / 2;
        this.radius = 8;  // Größerer Radius, damit der Player sichtbar ist
        this.turnDirection = 0; // -1 für links, 1 für rechts
        this.walkDirection = 0; // -1 für zurück, 1 für vorwärts
        this.rotationAngle = Math.PI / 2;
        this.moveSpeed = 2.0;
        this.rotationSpeed = 3 * (Math.PI / 180);
    }

    update() {
        // Bewegung und Drehung aktualisieren
        this.rotationAngle += this.turnDirection * this.rotationSpeed;

        let moveStep = this.walkDirection * this.moveSpeed;
        let newX = this.x + Math.cos(this.rotationAngle) * moveStep;
        let newY = this.y + Math.sin(this.rotationAngle) * moveStep;

        // Stelle sicher, dass der Spieler im Fenster bleibt
        if (newX >= 0 && newX < WINDOW_WIDTH) this.x = newX;
        if (newY >= 0 && newY < WINDOW_HEIGHT) this.y = newY;
    }

    render() {
        fill("red");
        noStroke();
        circle(this.x, this.y, this.radius * 2);
    }
}

let grid = new Map();
let player = new Player();  // Player-Instanz erstellen

function keyPressed() {
    if (keyCode === UP_ARROW) player.walkDirection = 1;
    if (keyCode === DOWN_ARROW) player.walkDirection = -1;
    if (keyCode === LEFT_ARROW) player.turnDirection = -1;
    if (keyCode === RIGHT_ARROW) player.turnDirection = 1;
}

function keyReleased() {
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) player.walkDirection = 0;
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) player.turnDirection = 0;
}

function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function update() {
    player.update();
}

function draw() {
    background(220);  // Hintergrund für jedes Frame neu zeichnen
    update();
    grid.render();
    player.render();
}
