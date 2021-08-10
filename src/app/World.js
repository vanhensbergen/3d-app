import {Cube} from './components/Cube';
import { Camera } from './components/Camera';
import { Scene } from './components/Scene';
import {Light} from './components/Light'
import { Renderer } from './systems/Renderer';
import { Resizer } from './systems/Resizer';
import {Loop } from './systems/Loop';



class World {
 #container
 #camera
 #directionalLight;
 #ambientLight;
 #scene;
 #renderer
 #loop;
 #updatables;
 
 
  constructor(container) {
	  this.#container = container
	  this.#updatables = [];
	  this.addUpdatable(new Cube(2.5,'black','green'));
	  this.addUpdatable(new Cube(2,'blue','white'));
	  this.addUpdatable(new Cube(1.5,'black','green'));
	  this.positionUpdatable(1,4,0,0);
	  this.positionUpdatable(2,-4,0,0);
	  //colors are changeble with propertie setters. Great!!!!
	  this.#updatables[0].foreColor ='red';
	  this.#updatables[0].backColor ='lightgreen';
	  

	  this.#scene = Scene.create();
	  this.#camera = Camera.create();
	  this.#renderer = Renderer.create();
	  this.#loop = new Loop( this.camera, this.scene, this.renderer)
	  for (const updatable of this.#updatables)
	  {
		  this.loop.addUpdatable(updatable)
	  }
	  this.container.append(this.renderer.domElement);
	  this.#directionalLight = Light.createDirectionalLight();
	  this.#ambientLight = Light.createAmbientLight();
	  this.scene.add(...this.updatableMeshes, this.directionalLight, this.ambientLight);
	  new Resizer(this.container, this.camera, this.renderer);
	}
	render() {
	  this.renderer.render(this.scene, this.camera);
	}
	addUpdatable(updatable){
		this.#updatables.push(updatable);
	}
	get updatableMeshes(){
		const meshes = [];
		for (const updatable of this.#updatables)
		{
			meshes.push(updatable.mesh);
		}
		return meshes;
	}
	positionUpdatable(actorIndex,x,y,z){
		this.#updatables[actorIndex].position(x,y,z);
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