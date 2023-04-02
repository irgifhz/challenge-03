class Component {
    constructor(){
        if(this.constructor === Component){
            throw new error("abstract classes cant be initialized")
        }
    }

    // empty implementation;
    render(){}
}