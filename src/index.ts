import {Game} from "./Game";
import {Queue} from "./Queue";
import {IPoint, Renderer} from "./Renderer";
import Timeout = NodeJS.Timeout;

const canvas = document.getElementById("arena") as HTMLCanvasElement;
const renderer = new Renderer(canvas, "#FFF");
renderer.scale(10, 10);
const queue = new Queue<IPoint>();
const game = new Game(queue);
let handler: Timeout = null;

const draw = (queue: Queue<IPoint>, frog: IPoint, renderer: Renderer) => {
    renderer.clear();
    renderer.draw([...queue.getAll(), frog]);
    document.getElementById("score").innerText = game.getCurrentScore().toString();
};

game.onGameOver((reason: string) => {
    console.log(reason);
});

game.onDirectionChange(() => {
    clearTimeout(handler);
    game.step();
    performStep();
});

window.addEventListener("keyup", (e) => {
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

const performStep = () => {
    handler = setTimeout(() => {
        game.step();
        performStep();
    }, 200);
};
performStep();
