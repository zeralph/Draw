import { Transform, Box, Scale } from "./Interfaces";
import { Tool } from "./Tools/Tool";

export class Gizmo
{
    _tool: Tool;
    constructor(t: Tool)
    {
        this._tool = t;
    }

    OnUpdate(): void
    {
        if(this._tool && this._tool.DrawGizmos())
        {
            let t:Transform = this._tool.GetTransform(); 
            let c:CanvasRenderingContext2D = this._tool.GetContexts();
            c.lineWidth = 1;
            c.strokeStyle = 'black';
            c.beginPath();
            c.arc(t._boundingBox._minX, t._boundingBox._minY, 4, 0, 2 * Math.PI);
            c.stroke();
            c.beginPath();
            c.moveTo(t._boundingBox._minX, t._boundingBox._minY);
            c.lineTo(t._boundingBox._maxX, t._boundingBox._minY);
            c.lineTo(t._boundingBox._maxX, t._boundingBox._maxY);
            c.lineTo(t._boundingBox._minX, t._boundingBox._maxY);
            c.lineTo(t._boundingBox._minX, t._boundingBox._minY);
            c.stroke();   
        }
    }
}