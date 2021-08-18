import { Raycaster, Vector2 } from "three";

class InputDetector{
    #camera;
    #scene;
    #raycaster;
    #container;
    constructor(world){
        this.#camera = world.camera;
        this.#scene = world.scene;
        this.#container = world.container
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
            this.handle(intersect)
            
        }
    }
    handle(object){
        //wordt overschreven bij implementatie in world
    }
}
export{InputDetector};