import { App } from "../App.js";
export class ToolsFactory {
    static GetInstance() {
        if (!ToolsFactory._instance) {
            ToolsFactory._instance = new ToolsFactory();
            //throw "ToolsFactory not initialized";
        }
        return ToolsFactory._instance;
    }
    constructor() {
        this._toolbar = document.getElementById("toolbar");
        this._bottombar = document.getElementById("bottombar");
        //this._sheet = sheet;
        this._tools = [];
    }
    RegisterTool(c) {
        let info = c.GetToolInfo();
        this._tools.push(c);
        let d = document.createElement("div");
        d.className = "toolicon";
        d.id = info.name;
        d.innerHTML = info.name;
        d.onclick = (e) => {
            let targetDiv = e.target;
            this.SetCurrentToolByName(targetDiv.id);
        };
        this._toolbar.append(d);
        //this.SetCurrentTool(this._tools[0]);
    }
    Clone(instance) {
        const copy = new instance.constructor();
        Object.assign(copy, instance);
        return copy;
    }
    GetToolByName(name) {
        for (let i = 0; i < this._tools.length; i++) {
            if (this._tools[i].GetToolInfo().name === name) {
                return this._tools[i];
            }
        }
        return null;
    }
    CloneTool(t) {
        let name = t.GetToolInfo().name;
        this.SetCurrentToolByName(name);
    }
    SetCurrentToolByName(name) {
        let toolClass = this.GetToolByName(name);
        let t = new toolClass();
        App.GetInstance().GetSheet().SetTool(t);
        this._bottombar.innerHTML = toolClass.GetToolInfo().name;
    }
}
//# sourceMappingURL=ToolsFactory.js.map