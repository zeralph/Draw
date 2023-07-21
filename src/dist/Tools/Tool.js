import { Transform } from "../Interfaces.js";
import { Gizmo } from "../Gizmo.js";
import { App } from "../App.js";
export class Tool {
    constructor() {
        let c = App.GetInstance().GetSheet();
        this._sheet = c;
        this._tranform = new Transform();
        this._canvas = c.GetCanvas();
        this._context = this._canvas.getContext("2d");
        this._gizmo = new Gizmo(this);
        this._drawGizmos = false;
    }
    ;
    //abstract
    OnUpdate() { }
    OnMouseUpdate(mouse) { }
    //functions
    DrawGizmos() {
        return this._drawGizmos;
    }
    OnDrawGizmos() {
        if (this._gizmo) {
            this._gizmo.OnUpdate();
        }
    }
    Release() {
        this._sheet.ReleaseTool();
    }
    //getters
    GetCanvas() {
        return this._canvas;
    }
    GetTransform() {
        return this._tranform;
    }
    GetContexts() {
        return this._context;
    }
    static GetToolInfo() {
        return this._toolInfo;
    }
    GetToolInfo() {
        var c = this.constructor;
        return c.GetToolInfo();
    }
}
Tool._toolInfo = {
    name: "unset",
    icon: "unset"
};
//# sourceMappingURL=Tool.js.map