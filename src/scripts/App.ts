import { Sheet } from "./Sheet.js";
import { IToolInfo, Tool } from "./Tools/Tool.js";
import { Ellipse } from "./Tools/Ellipse.js";
import { Line } from "./Tools/Line.js";
import { ToolsFactory } from "./Tools/ToolsFactory.js";
import { Singleton } from "./Singleton.js";

export class App
{

    private static _instance:App; 
    public static GetInstance():App
    {
        if( !App._instance )
        {
            throw "App not initialized";
        }
        return App._instance;
    }

    public static Init(app:App, sheet:Sheet): void
    {
        
    }

    _sheet:Sheet;

    constructor()
    {
        this._sheet = new Sheet();
        //ToolsFactory.Init(this, this._sheet);
        debugger;
        let toto:ToolsFactory = ToolsFactory.GetInstance();
        toto.RegisterTool(Line);
        ToolsFactory.GetInstance().RegisterTool(Ellipse);
        App._instance = this;
    }

    public GetSheet():Sheet
    {
        return this._sheet;
    }
}