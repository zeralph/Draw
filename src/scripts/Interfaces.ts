export class Box 
{
    constructor()
    {
        this._minX = 0;
        this._minY = 0;
        this._maxX = 0;
        this._maxY = 0;
    }
    _minX: number;
    _minY: number;
    _maxX: number;
    _maxY: number;
};

export class Scale 
{    
    constructor()
    {
        this._scaleX = 1;
        this._scaleY = 1;
    }
    _scaleX: number;
    _scaleY: number;
}

export class Transform
{
    constructor()
    {
        this._boundingBox = new Box();
        this._scale = new Scale();
        this._rotation = 0;
    }
    _boundingBox: Box;
    _scale: Scale;
    _rotation: number;
}
