export class Singleton
{
    private static _instance:Singleton; 
    public static GetInstance<T>():T
    {
        if( !Singleton._instance )
        {
            Singleton._instance = new Singleton();
            //throw "Singleton not initialized";
        }
        return <T>Singleton._instance;
    }

    constructor()
    {
        console.log("create singleton");
    }
}