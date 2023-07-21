export class Singleton {
    static GetInstance() {
        if (!Singleton._instance) {
            Singleton._instance = new Singleton();
            //throw "Singleton not initialized";
        }
        return Singleton._instance;
    }
    constructor() {
        console.log("create singleton");
    }
}
//# sourceMappingURL=Singleton.js.map