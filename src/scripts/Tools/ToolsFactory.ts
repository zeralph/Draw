import { App } from "../App.js";
import { Sheet } from "../Sheet";
import { Singleton } from "../Singleton";
import { Tool, /*Line, Ellipse,*/ IToolInfo } from "./Tool";

export class ToolsFactory
{
    private static _instance:ToolsFactory; 
    public static GetInstance():ToolsFactory
    {
        if( !ToolsFactory._instance )
        {
            ToolsFactory._instance = new ToolsFactory();
            //throw "ToolsFactory not initialized";
        }
        return ToolsFactory._instance;
    }

    private _tools:typeof Tool[];
    private _toolbar:HTMLDivElement;
    private _bottombar:HTMLDivElement;

    private constructor()
    {
        this._toolbar = document.getElementById("toolbar") as HTMLDivElement;
        this._bottombar = document.getElementById("bottombar") as HTMLDivElement;
        //this._sheet = sheet;
        this._tools = [];   
    }

    public RegisterTool(c:typeof Tool): void
    {
        let info:IToolInfo = c.GetToolInfo();
        this._tools.push(c);
        let d:HTMLDivElement = document.createElement("div");
        d.className = "toolicon";
        d.id = info.name;
        d.innerHTML = info.name;
        d.onclick = (e) => {
            let targetDiv:HTMLDivElement = e.target as HTMLDivElement;
            this.SetCurrentToolByName(targetDiv.id);
        }
        this._toolbar.append(d);
        //this.SetCurrentTool(this._tools[0]);
    }

    public Clone<Tool>(instance: Tool): Tool
    {
        const copy = new (instance.constructor as { new (): Tool })();
        Object.assign(copy, instance);
        return copy;
    }

    private GetToolByName(name:string):typeof Tool
    {
        for(let i:number=0; i<this._tools.length; i++)
        {
            if(this._tools[i].GetToolInfo().name === name)
            {
                return this._tools[i];
            }
        }
        return null;
    } 

    public CloneTool(t:Tool):void
    {
        let name:string = t.GetToolInfo().name;
        this.SetCurrentToolByName(name);
    }

    public SetCurrentToolByName(name:string):void
    {
        let toolClass: typeof Tool = this.GetToolByName(name); 
        let t:Tool = new toolClass();
        App.GetInstance().GetSheet().SetTool(t);
        this._bottombar.innerHTML = toolClass.GetToolInfo().name;
    }
}