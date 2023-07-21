import {Tool} from "./Tools/Tool.js"
import {Mouse} from "./Mouse.js"
import { App } from "./App.js";
import { ToolsFactory } from "./Tools/ToolsFactory.js";

export class Sheet
{
	private _canvas:HTMLCanvasElement = null;
	private _context = null;
	private _lastTime = 0;
	private _curTool:Tool = null;
	private _mouse:Mouse;
	private _currentShapes:Tool[];
	private _releaseTool:boolean;

	constructor()
	{
		this._canvas = document.getElementById("sheet") as HTMLCanvasElement;
		this._context = this._canvas.getContext("2d");
		this._currentShapes = [];
		this._mouse = new Mouse(this._canvas);
		this._releaseTool = false;
		window.requestAnimationFrame(this.drawFrame.bind(this));
	}

	GetCanvas():HTMLCanvasElement
	{
		return this._canvas;
	}

	clearCanvas(): void
	{
		this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
	}
	SetTool(t:Tool):void
	{
		this._curTool = t;
	}
	ReleaseTool():void
	{
		this._releaseTool = true;
	}

	updateMousePointer(): void
	{
		let d:Mouse.MouseData = this._mouse.getMouseData();
		let p:number = 4;
		let x1 = d._x - p;
		let x2 = d._x + p;
		let y1 = d._y - p;
		let y2 = d._y + p;
		this._context.fillStyle = "#000000";
		this._context.strokeStyle = "#000000";
        this._context.lineWidth = 1;
		this._context.beginPath();
        this._context.moveTo(x1, y1);
        this._context.lineTo(x2, y2);
		this._context.moveTo(x1, y2);
        this._context.lineTo(x2, y1);
        this._context.stroke();
	}
	
	drawFrame(timeStamp):void
	{
		if (this._lastTime == 0) {
			this._lastTime = timeStamp;
		}
		const elapsed = timeStamp - this._lastTime;
		this.clearCanvas();
		for( let i:number = 0; i < this._currentShapes.length; i++)
		{
			this._currentShapes[i].OnUpdate();
		}
		if(this._releaseTool)
		{
			if(this._curTool)
			{
				this._currentShapes.push(this._curTool);
				let name:string = this._curTool.GetToolInfo().name;
				ToolsFactory.GetInstance().SetCurrentToolByName(name);
			}
			this._releaseTool = false;
		}
		this._mouse.UpdateMouse();
		if(this._curTool)
		{
			this._curTool.OnMouseUpdate(this._mouse);
			this._curTool.OnUpdate();
			this._curTool.OnDrawGizmos();
		}
		this.updateMousePointer();
		window.requestAnimationFrame(this.drawFrame.bind(this))
	}
}