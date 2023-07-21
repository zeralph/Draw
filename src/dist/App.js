import { Sheet } from "./Sheet.js";
import { Ellipse } from "./Tools/Ellipse.js";
import { Line } from "./Tools/Line.js";
import { ToolsFactory } from "./Tools/ToolsFactory.js";
export class App {
    static GetInstance() {
        if (!App._instance) {
            throw "App not initialized";
        }
        return App._instance;
    }
    static Init(app, sheet) {
    }
    constructor() {
        this._sheet = new Sheet();
        //ToolsFactory.Init(this, this._sheet);
        debugger;
        let toto = ToolsFactory.GetInstance();
        toto.RegisterTool(Line);
        ToolsFactory.GetInstance().RegisterTool(Ellipse);
        App._instance = this;
    }
    GetSheet() {
        return this._sheet;
    }
}
//# sourceMappingURL=App.js.map