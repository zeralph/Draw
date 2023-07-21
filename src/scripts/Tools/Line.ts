import { IToolInfo, Tool } from "./Tool.js";
import { Mouse } from "../Mouse.js";
import { Sheet } from "../Sheet.js";

export class Line extends Tool
{
    private _tracing:boolean;
    protected static _toolInfo:IToolInfo = {
        name:"Line",
        icon:"line.gif"
    };

    constructor()
    {
        super();
        this._tracing = false;
    }

    OnUpdate(): void
    {
        this._drawGizmos = this._tracing;
        this._context.strokeStyle = 'red';
        this._context.lineWidth = 5;
        this._context.beginPath();
        this._context.moveTo(this._tranform._boundingBox._minX, this._tranform._boundingBox._minY);
        this._context.lineTo(this._tranform._boundingBox._maxX, this._tranform._boundingBox._maxY);
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
    OnMouseUpdate(mouse: Mouse):void
    {
        let d:Mouse.MouseData = mouse.getMouseData();
        if(d._status == Mouse.MouseStatus.Pressed)
        {
            if(!this._tracing)
            {
                this._tracing = true;
                this._tranform._boundingBox._minX = d._x;
                this._tranform._boundingBox._minY = d._y;
                this._tranform._boundingBox._maxX = d._x;
                this._tranform._boundingBox._maxY = d._y;
            }
            else
            {
                this._tranform._boundingBox._maxX = d._x;
                this._tranform._boundingBox._maxY = d._y;
            }
        }
        else
        {
            if(this._tracing)
            {
                //this._tracing = false;
                //this.Release();
            }
        }
    }
}