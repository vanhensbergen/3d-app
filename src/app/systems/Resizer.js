
class Resizer {
	#container;
	#camera;
	#renderer;
	
	constructor(world) {
		// Set the camera's aspect ratio
		this.#container = world.container;
		this.#camera = world.camera;
		this.#renderer = world.renderer;
		this.#setSize();
		window.addEventListener(	'resize',
									()=>{
										this.#setSize();
									})};
	  
	  #setSize(){
		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
		// update the size of the renderer AND the canvas
		this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
			// update the camera's frustum
		this.camera.updateProjectionMatrix();
		// set the pixel ratio (for mobile devices)
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.onResize();
	  }
	  
	  get container(){
	  return this.#container;
	  }
	  get camera(){
		  return this.#camera;
	  }
	  get renderer(){
		  return this.#renderer;
	  }
	  
	  onResize(){
			//abstract; empty method can be overridden outside the class.
	  }
  
}

export{Resizer}