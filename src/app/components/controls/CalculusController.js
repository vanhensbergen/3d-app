import { CalculusModel } from "../models/CalculusModel";

class CalculusController{
    #world;
    #model;
    constructor(world){
        this.#world = world;
        document.querySelector('nav>button').addEventListener('click',()=>this.#onSumReady())
        this.#model = new CalculusModel()
    }

    #onSumReady(){
        const ready =this.#world.isSumReady()
        if(ready){
            const sum =this.#world.getSumString();
            console.log(sum)
            let result = this.#model.parse(sum);
            console.log(result)
        }
    }
}
export {CalculusController}