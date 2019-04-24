import {Queue} from "./Queue";
import {ICords, IPoint} from "./Renderer";

interface IDirection {
    x: 1 | 0 | -1;
    y: 1 | 0 | -1;
}

export class Game {
    private starting: IPoint = {
        location: {x: 0, y: 0},
        color: "#FF0"
    };
    private onDirectionChangeCallback: () => void;
    private onGameOverCallback: (reason: string) => void;
    private direction: IDirection = {x: 1, y: 0};
    private readonly MAX_X = 50;
    private readonly MAX_Y = 50;
    private currentFrog: IPoint = null;
    private isGameOver: boolean = false;
    private lastStep: number = 0;
    private currentFrame: number = 0;

    constructor(private arena: Queue<IPoint>, private snakeColor: string = "#FF0") {
        arena.insert(this.starting);
        arena.insert(this.getDirectedPoint(this.starting.location));
        this.starting.color = snakeColor;
        this.spawnNewFrog();
    }

    public getCurrentFrog(): IPoint {
        return this.currentFrog;
    }

    public getCurrentScore(): number {
        return this.arena.getAll().length;
    }

    public forceStep(): void {
        this.lastStep = this.currentFrame;
        const head = this.getDirectedPoint(this.arena.queryFirstElement().location);
        if (Game.areSameCoordinate(head.location, this.currentFrog.location)) {
            this.spawnNewFrog();
        } else {
            this.arena.remove();
        }
        if (this.snakeContainsCoordinates(head.location)) {
            this.onGameOverCallback("collided with body");
            this.isGameOver = true;
            return;
        }
        if (head.location.x > this.MAX_X || head.location.y > this.MAX_Y || head.location.x < 0 || head.location.y < 0) {
            this.onGameOverCallback("went through wall");
            this.isGameOver = true;
            return;
        }
        // if head collides with body, exit
        // if head collies with wall, exit
        this.arena.insert(head);
    }

    public step(dt: number): void {
        if (this.isGameOver) {
            return;
        }
        this.currentFrame = dt;
        if (dt - this.lastStep < 500) {
            return;
        }
        this.lastStep = dt;
        this.forceStep();
    }

    public onGameOver(fn: (reason: string) => void): void {
        this.onGameOverCallback = fn;
    }

    public setLeft(): void {
        this.getCurrentDirection() !== "RIGHT" && this.setDirection(-1, 0);
    }

    public setRight(): void {
        this.getCurrentDirection() !== "LEFT" && this.setDirection(1, 0);
    }

    public setDown(): void {
        this.getCurrentDirection() !== "UP" && this.setDirection(0, 1);
    }

    public setUp(): void {
        this.getCurrentDirection() !== "DOWN" && this.setDirection(0, -1);
    }

    public onDirectionChange(fn: () => void): void {
        this.onDirectionChangeCallback = fn;
    }

    private getCurrentDirection(): "UP" | "DOWN" | "LEFT" | "RIGHT" {
        if (this.direction.x == -1 && this.direction.y == 0) {
            return "LEFT";
        }
        if (this.direction.x == 1 && this.direction.y == 0) {
            return "RIGHT";
        }
        if (this.direction.x == 0 && this.direction.y == -1) {
            return "UP";
        }
        if (this.direction.x == 0 && this.direction.y == 1) {
            return "DOWN";
        }
    }

    private setDirection(x: 1 | 0 | -1, y: 1 | 0 | -1): void {
        this.direction.x = x;
        this.direction.y = y;
        this.onDirectionChangeCallback()
    }

    private getDirectedPoint(cords: ICords): IPoint {
        return {
            location: {
                x: cords.x + this.direction.x, y: cords.y + this.direction.y
            },
            color: this.snakeColor
        };
    }

    private spawnNewFrog(): void {
        this.currentFrog = this.getFrog();
    }

    private getFrog(): IPoint {
        let location = Game.getRandomLocation(this.MAX_X, this.MAX_Y);

        while(this.snakeContainsCoordinates(location)) {
            location = Game.getRandomLocation(this.MAX_X, this.MAX_Y);
        }
        // check if location exists on snake if so, then get a new one.
        return {
            location,
            color: "#0FF"
        };
    }

    private snakeContainsCoordinates(a: ICords): boolean {
        return this.arena.getAll().some((x) => Game.areSameCoordinate(x.location, a));
    }

    private static getRandomLocation(max_x: number, max_y: number): ICords {
        return {
            x: Game.getRandomNum(max_x),
            y: Game.getRandomNum(max_y),
        };
    }

    private static areSameCoordinate(a: ICords, b: ICords): boolean {
        return a.x == b.x && a.y == b.y;
    }

    private static getRandomNum(max: number): number {
        return Math.floor(Math.random() * 100) % max
    }

}
