import { Singleton } from "./Singleton.js";

export class Mouse extends Singleton
{
    private pageX:number;
    private pageY:number;
    private canvasX:number;
    private canvasY:number;
    private status:Mouse.MouseStatus;
    private nextStatus:Mouse.MouseStatus;
    private canvas:HTMLCanvasElement;
    private gridSize: number = 10;
    private interval:number;

    constructor(c:HTMLCanvasElement)
    {
        super();
        this.canvas = c;
        document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        document.addEventListener("mousedown", this.onMouseDown.bind(this), false);
        document.addEventListener("mouseup", this.onMouseUp.bind(this), false);
        document.addEventListener("click", this.onMouseClick.bind(this), false);
        this.status = Mouse.MouseStatus.None;
    }

    setGridSize(s:number): void
    {
        this.gridSize = s;

    }

    getGridSize():number
    {
        return this.gridSize;
    }

    getMouseData():Mouse.MouseData
    {
        return {
            _x:this.canvasX,
            _y:this.canvasY,
            _status:this.status
        };
    }

    getMousePositionInCanvas():void 
    {
        let rect = this.canvas.getBoundingClientRect();
        let x:number = Math.floor((this.pageX - rect.left) / (rect.right - rect.left) * this.canvas.width);
        let y:number = Math.floor((this.pageY - rect.top) / (rect.bottom - rect.top) * this.canvas.height);
        this.canvasX = Math.floor(x / this.gridSize) * this.gridSize;
        this.canvasY = Math.floor(y / this.gridSize) * this.gridSize;
    }

    onMouseMove(e):void
    {
        this.pageX = e.pageX;
        this.pageY = e.pageY;
    }

    UpdateMouse():void
    {
        if(this.status != this.nextStatus)
        {
            this.status = this.nextStatus;
            console.log("Status : " + this.status);
        }
        if(this.status == Mouse.MouseStatus.Clicked || this.status == Mouse.MouseStatus.Released)
        {
            this.nextStatus = Mouse.MouseStatus.None;
        }
        this.getMousePositionInCanvas();
    }
    
    onMouseClick(e):void
    {
        //this.nextStatus = Mouse.MouseStatus.Clicked;
    }
    
    onMouseDown(e):void
    {
        this.nextStatus = Mouse.MouseStatus.Pressed;
        this.interval = Date.now();
    }
    
    onMouseUp(e):void
    {
        if(Date.now() - this.interval > 100)
        {
            this.nextStatus = Mouse.MouseStatus.Released;
        }
        else
        {
            this.nextStatus = Mouse.MouseStatus.Clicked;
        }
    }
    

}

export namespace Mouse {
    export enum MouseStatus {
        None=0,
        Pressed=1,
        Released=2,
        Clicked=3,
    }

    export interface MouseData {
        _x:number;
        _y:number;
        _status:Mouse.MouseStatus;
    }
}