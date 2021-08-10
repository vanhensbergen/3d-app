import { Camera } from './components/Camera';
import { Cube } from './components/Cube';
import { Scene } from './components/Scene';
import {Light} from './components/Light'
import { Renderer } from './systems/Renderer';
import { Resizer } from './systems/Resizer';
import {Loop } from './systems/Loop'

class World {
 #container
 #camera
 #directionalLight;
 #ambientLight;
 #scene;
 #renderer
 #loop;
 #actors;
 
 
  constructor(container) {
	  this.#container = container
	  this.#actors = [];
	  this.addActor( Cube.create({bgcolor:'lightgreen',forecolor:'red',size:2.5}));
	  this.addActor( Cube.create({bgcolor:'blue',forecolor:'white',size:2}));
	  this.addActor( Cube.create({bgcolor:0x000000,forecolor:'#00ff00',size:1}));
	  this.positionActor(1,4 ,0,0)
	  this.positionActor(2,-5,0,0)
	  this.#scene = Scene.create();
	  this.#camera = Camera.create();
	  this.#renderer = Renderer.create();
	  this.#loop = new Loop( this.camera, this.scene, this.renderer)
	  for (const actor of this.#actors)
	  {
		  this.loop.addUpdatable(actor)
	  }
	  this.container.append(this.renderer.domElement);
	  this.#directionalLight = Light.createDirectionalLight();
	  this.#ambientLight = Light.createAmbientLight();
	  this.scene.add(...this.#actors,this.directionalLight, this.ambientLight);
	  new Resizer(this.container, this.camera, this.renderer);
	  //overriding of onResize method in World. Niet meer nodig bij een animatieloop. Die gaat 60x per seconde
	  //this.#resizer.onResize = ()=>{ this.render()};
	}
	render() {
	  this.renderer.render(this.scene, this.camera);
	}
	addActor(actor){
		this.#actors.push(actor);
	}
	positionActor(actorIndex,x,y,z){
		this.#actors[actorIndex].position.set(x,y,z);
	}
	stop(){
	 this.loop.stop();
	}
	
	start(){
		this.loop.start()
	}
	get directionalLight(){
		return this.#directionalLight;
	}
	get ambientLight (){
		return this.#ambientLight;
	}
	get loop(){
		return this.#loop;
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

	get scene(){
	  return this.#scene;
	}
}

export { World };