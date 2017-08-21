class MenuReducerName {
    constructor() {
        this.setCalled=false
        Object.defineProperty(this, 'reducerNameOriginal', {
            value: 'ufpMenu',
            writable: false
        })
        this.reducerName = 'ufpMenu';
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

export default new MenuReducerName()