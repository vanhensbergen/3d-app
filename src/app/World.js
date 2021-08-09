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
 #cube;
 #cube2
 #cube3
 #resizer;
 #loop;
 
 
  constructor(container) {
	  this.#container = container
	  this.#cube = Cube.create({bgcolor:'lightgreen',forecolor:0xff0000,size:3});
	  this.#cube2 = Cube.create({bgcolor:'blue',forecolor:'black',size:1});
	  this.#cube3 = Cube.create({bgcolor:'red',forecolor:'blue',size:1});
	  this.#cube2.position.set(4,0,0)
	  this.#cube3.position.set(-4,0,0)
	  this.#scene = Scene.create();
	  this.#camera = Camera.create();
	  this.#renderer = Renderer.create();
	  this.#loop = new Loop( this.camera, this.scene, this.renderer)
	  this.#loop.addUpdatable(this.cube);
	  this.#loop.addUpdatable(this.#cube2);
	  this.#loop.addUpdatable(this.#cube3);
	  this.container.append(this.renderer.domElement);
	  this.#directionalLight = Light.createDirectionalLight();
	  this.#ambientLight = Light.createAmbientLight();
	  this.scene.add(this.#cube3,this.#cube2,this.cube,this.directionalLight, this.ambientLight);
	  this.#resizer = new Resizer(this.container, this.camera, this.renderer);
	  //overriding of onResize method in World. Niet meer nodig bij een animatieloop. Die gaat 60x per seconde
	  //this.#resizer.onResize = ()=>{ this.render()};
	}
	render() {
	  this.renderer.render(this.scene, this.camera);
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

	get cube (){
	 return this.#cube; 
	}
}

export { World };