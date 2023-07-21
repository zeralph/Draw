import { Mouse } from "../Mouse.js";
import { Transform } from "../Interfaces.js";
import { Gizmo } from "../Gizmo.js";
import { Sheet } from "../Sheet.js";
import { App } from "../App.js";

export interface IToolInfo
{
    name:string;
    icon:string;
}

export class Tool 
{
    protected static _toolInfo:IToolInfo = {
        name:"unset",
        icon:"unset"
    };
    protected _sheet: Sheet;
    protected _canvas: HTMLCanvasElement;
    protected _context: CanvasRenderingContext2D;
    protected _tranform: Transform;
    protected _gizmo: Gizmo;
    protected _drawGizmos: boolean;

    constructor()
    {
        let c:Sheet = App.GetInstance().GetSheet();
        this._sheet = c;
        this._tranform = new Transform();
        this._canvas = c.GetCanvas();
        this._context = this._canvas.getContext("2d");
        this._gizmo = new Gizmo(this);
        this._drawGizmos = false;
    };

    //abstract
    OnUpdate(): void {}
    OnMouseUpdate(mouse: Mouse):void {}

    //functions
    DrawGizmos():boolean
    {
        return this._drawGizmos;
    }
    OnDrawGizmos(): void
    {
        if(this._gizmo)
        {
            this._gizmo.OnUpdate();
        }
    }
    Release():void{
        this._sheet.ReleaseTool();
    }
    //getters
    GetCanvas():HTMLCanvasElement
    {
        return this._canvas;
    }
    GetTransform():Transform
    {
        return this._tranform;
    }
    GetContexts():CanvasRenderingContext2D
    {
        return this._context;
    }
    public static GetToolInfo():IToolInfo
    {
        return this._toolInfo;
    }

    public GetToolInfo():IToolInfo
    {
        var c = <typeof Tool>this.constructor; 
        return c.GetToolInfo();
    }
}