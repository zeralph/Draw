export class Box {
    constructor() {
        this._minX = 0;
        this._minY = 0;
        this._maxX = 0;
        this._maxY = 0;
    }
}
;
export class Scale {
    constructor() {
        this._scaleX = 1;
        this._scaleY = 1;
    }
}
export class Transform {
    constructor() {
        this._boundingBox = new Box();
        this._scale = new Scale();
        this._rotation = 0;
    }
}
//# sourceMappingURL=Interfaces.js.map