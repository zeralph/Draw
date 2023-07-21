import { Tool } from "./Tool.js";
import { Mouse } from "../Mouse.js";
export class Ellipse extends Tool {
    constructor() {
        super();
        this._tracing = false;
    }
    OnUpdate() {
        this._drawGizmos = this._tracing;
        let x = (this._tranform._boundingBox._maxX - this._tranform._boundingBox._minX) / 2;
        let y = (this._tranform._boundingBox._maxY - this._tranform._boundingBox._minY) / 2;
        let rx = Math.abs(x);
        let ry = Math.abs(y);
        this._context.lineWidth = 1;
        this._context.strokeStyle = 'black';
        this._context.beginPath();
        this._context.ellipse(x + this._tranform._boundingBox._minX, y + this._tranform._boundingBox._minY, rx, ry, 0, 0, 2 * Math.PI);
        this._context.stroke();
    }
    /*
        OnDrawGizmos(): void
        {
            if(this._tracing)
            {
                this._context.strokeStyle = 'black';
                this._context.lineWidth = 1;
                this._context.beginPath();
                this._context.arc(this._tranform._boundingBox._minX, this._tranform._boundingBox._minY, 10, 0, 2 * Math.PI);
                this._context.stroke();
            }
        }
    */
    OnMouseUpdate(mouse) {
        let d = mouse.getMouseData();
        if (d._status == Mouse.MouseStatus.Pressed) {
            if (!this._tracing) {
                this._tracing = true;
                this._tranform._boundingBox._minX = d._x;
                this._tranform._boundingBox._minY = d._y;
                this._tranform._boundingBox._maxX = d._x;
                this._tranform._boundingBox._maxY = d._y;
            }
            else {
                this._tranform._boundingBox._maxX = d._x;
                this._tranform._boundingBox._maxY = d._y;
            }
        }
        if (d._status == Mouse.MouseStatus.Released) {
            if (this._tracing) {
                this.Release();
            }
        }
    }
}
Ellipse._toolInfo = {
    name: "Ellipse",
    icon: "Ellipse.gif"
};
//# sourceMappingURL=Ellipse.js.map