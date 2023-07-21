export class Gizmo {
    constructor(t) {
        this._tool = t;
    }
    OnUpdate() {
        if (this._tool && this._tool.DrawGizmos()) {
            let t = this._tool.GetTransform();
            let c = this._tool.GetContexts();
            c.lineWidth = 1;
            c.strokeStyle = 'black';
            c.beginPath();
            c.arc(t._boundingBox._minX, t._boundingBox._minY, 4, 0, 2 * Math.PI);
            c.stroke();
            c.beginPath();
            c.moveTo(t._boundingBox._minX, t._boundingBox._minY);
            c.lineTo(t._boundingBox._maxX, t._boundingBox._minY);
            c.lineTo(t._boundingBox._maxX, t._boundingBox._maxY);
            c.lineTo(t._boundingBox._minX, t._boundingBox._maxY);
            c.lineTo(t._boundingBox._minX, t._boundingBox._minY);
            c.stroke();
        }
    }
}
//# sourceMappingURL=Gizmo.js.map