import {Game} from "./Game";
import {Queue} from "./Queue";
import {IPoint, Renderer} from "./Renderer";

const canvas = document.getElementById("arena") as HTMLCanvasElement;
const renderer = new Renderer(canvas, "#FFF");
renderer.scale(10, 10);
const queue = new Queue<IPoint>();
const game = new Game(queue);

const draw = (queue: Queue<IPoint>, frog: IPoint, renderer: Renderer) => {
    renderer.clear();
    renderer.draw([...queue.getAll(), frog]);
    document.getElementById("score").innerText = game.getCurrentScore().toString();
};

game.onGameOver((reason: string) => {
    console.log(reason);
});

game.onDirectionChange(() => {
    game.forceStep()
});

window.addEventListener("keyup", (e) => {
    switch (e.code) {
        case "ShiftLeft":
            game.decelerate();
            break;
        default:
            break;
    }
});

window.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "ArrowUp":
            game.setUp();
            break;
        case "ArrowDown":
            game.setDown();
            break;
        case "ArrowLeft":
            game.setLeft();
            break;
        case "ArrowRight":
            game.setRight();
            break;
        case "ShiftLeft":
            game.accelerate();
            break;
        default:
            break;
    }
});

const loop = () => {
    const frog = game.getCurrentFrog();
    draw(queue, frog, renderer);
    requestAnimationFrame(loop);
};

loop();


const gameStep = (dt: number) => {
    game.step(dt);
    requestAnimationFrame(gameStep);
};
gameStep(0);
