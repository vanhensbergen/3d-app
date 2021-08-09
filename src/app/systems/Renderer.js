import { WebGLRenderer } from 'three';

class Renderer{
	static create() {
		const renderer = new WebGLRenderer({antialias:true});
		// turn on the physically correct lighting model
		renderer.physicallyCorrectLights = true;
		return renderer;
	}
	
	
}

export { Renderer };