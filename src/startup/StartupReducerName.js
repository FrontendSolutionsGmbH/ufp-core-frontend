
class StartupReducerName {
    constructor() {
        this.setCalled=false
        Object.defineProperty(this, 'reducerNameOriginal', {
            value: 'ufpStartup',
            writable: false
        })
        this.reducerName = 'ufpStartup';
    }

    set=(newName) => {
        if(this.setCalled) {
            return this.reducerName
        } else {
            this.setCalled=true
            this.reducerName=newName
            return this.reducerName
        }
    }
    get=() => {
        return this.reducerName
    }
    reset=() => {
        this.reducerName = this.reducerNameOriginal;
        this.setCalled=false
        return this.reducerName
    }
}

export default new StartupReducerName()