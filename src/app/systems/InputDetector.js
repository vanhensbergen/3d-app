import { Raycaster, Vector2 } from "three";

class InputDetector{
    #camera;
    #scene;
    #raycaster;
    #container;
    #world
    constructor(world){
        this.#world = world
        this.#camera = this.#world.camera;
        this.#scene = this.#world.scene;
        this.#container =this.#world.container
        this.#raycaster = new Raycaster();
        this.#container.addEventListener('click',(event)=>{
            this.onSelect(event);
        },false)
    }


    onSelect(event){
        const tappedPoint = new Vector2();
        const rect = this.#container.getBoundingClientRect(); 
        tappedPoint.x = event.clientX/rect.width*2 - 1
        tappedPoint.y = -(event.clientY/rect.height*2) +1
        this.#raycaster.setFromCamera( tappedPoint, this.#camera );

	    // calculate objects intersecting the picking ray
	    const intersects = this.#raycaster.intersectObjects( this.#scene.children );
        for ( const intersect of intersects ) {
            const die = this.#world.getUpdatable(intersect.object);
            die.stop(intersect.face);
            
        }
    }
}
export{InputDetector};