import { Singleton } from "./Singleton.js";
export class Mouse extends Singleton {
    constructor(c) {
        super();
        this.gridSize = 10;
        this.canvas = c;
        document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        document.addEventListener("mousedown", this.onMouseDown.bind(this), false);
        document.addEventListener("mouseup", this.onMouseUp.bind(this), false);
        document.addEventListener("click", this.onMouseClick.bind(this), false);
        this.status = Mouse.MouseStatus.None;
    }
    setGridSize(s) {
        this.gridSize = s;
    }
    getGridSize() {
        return this.gridSize;
    }
    getMouseData() {
        return {
            _x: this.canvasX,
            _y: this.canvasY,
            _status: this.status
        };
    }
    getMousePositionInCanvas() {
        let rect = this.canvas.getBoundingClientRect();
        let x = Math.floor((this.pageX - rect.left) / (rect.right - rect.left) * this.canvas.width);
        let y = Math.floor((this.pageY - rect.top) / (rect.bottom - rect.top) * this.canvas.height);
        this.canvasX = Math.floor(x / this.gridSize) * this.gridSize;
        this.canvasY = Math.floor(y / this.gridSize) * this.gridSize;
    }
    onMouseMove(e) {
        this.pageX = e.pageX;
        this.pageY = e.pageY;
    }
    UpdateMouse() {
        if (this.status != this.nextStatus) {
            this.status = this.nextStatus;
            console.log("Status : " + this.status);
        }
        if (this.status == Mouse.MouseStatus.Clicked || this.status == Mouse.MouseStatus.Released) {
            this.nextStatus = Mouse.MouseStatus.None;
        }
        this.getMousePositionInCanvas();
    }
    onMouseClick(e) {
        //this.nextStatus = Mouse.MouseStatus.Clicked;
    }
    onMouseDown(e) {
        this.nextStatus = Mouse.MouseStatus.Pressed;
        this.interval = Date.now();
    }
    onMouseUp(e) {
        if (Date.now() - this.interval > 100) {
            this.nextStatus = Mouse.MouseStatus.Released;
        }
        else {
            this.nextStatus = Mouse.MouseStatus.Clicked;
        }
    }
}
(function (Mouse) {
    let MouseStatus;
    (function (MouseStatus) {
        MouseStatus[MouseStatus["None"] = 0] = "None";
        MouseStatus[MouseStatus["Pressed"] = 1] = "Pressed";
        MouseStatus[MouseStatus["Released"] = 2] = "Released";
        MouseStatus[MouseStatus["Clicked"] = 3] = "Clicked";
    })(MouseStatus = Mouse.MouseStatus || (Mouse.MouseStatus = {}));
})(Mouse || (Mouse = {}));
//# sourceMappingURL=Mouse.js.map