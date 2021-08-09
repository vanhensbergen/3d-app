import { Clock } from 'three';

class Loop {
	#camera
	#scene
	#renderer
	#updatables;
	#clock;
	constructor(camera, scene, renderer) {
		this.#camera = camera;
		this.#scene = scene;
		this.#renderer = renderer;
		this.#updatables = [];
		this.#clock= new Clock();
	}
	
	start() {
		
		this.#renderer.setAnimationLoop(()=>{
			this.#tick();
			this.#renderer.render(this.#scene,this.#camera)
		})
	}
	addUpdatable(updatable){
		this.#updatables.push(updatable)
	}
	stop() {
		
		this.#renderer.setAnimationLoop(null);
	}
	
	#tick(){
		const delta = this.#clock.getDelta();
		for(const updatable of this.#updatables){
			updatable.tick(delta);
		}
	}
}

export { Loop }