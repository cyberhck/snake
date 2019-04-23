export interface ICords {
    x: number;
    y: number;
}
export interface IPoint {
    location: ICords;
    soft?: boolean;
    color: string;
}
export class Renderer {
    private context: CanvasRenderingContext2D;
    private scaleFactor: {x: number, y: number} = {x: 1, y: 1};
    constructor(private canvas: HTMLCanvasElement, private backgroundColor: string) {
        this.context = canvas.getContext("2d");
    }
    public scale(x: number, y: number): void {
        this.scaleFactor = {x, y};
        this.context.scale(x, y);
    }
    public draw(cords: IPoint[]): void {
        cords.forEach((c) => {
            this.context.fillStyle = c.color;
            this.context.fillRect(c.location.x, c.location.y, 1, 1);
            this.context.fillStyle = this.backgroundColor;
        });
    }
    public clear(): void {
        this.context.clearRect(0, 0, this.canvas.height * this.scaleFactor.y, this.canvas.width * this.scaleFactor.x);
    }
}
