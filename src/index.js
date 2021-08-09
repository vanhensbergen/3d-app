import {World} from './app/World'


	
(()=>{
	const container =  document.querySelector("#scene-container")
	const world = new World(container);
	//world.render();
	// start the animation loop
	world.start();
	
})()