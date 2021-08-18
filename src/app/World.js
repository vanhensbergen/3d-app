import {Die} from './components/Die';
import { Camera } from './components/Camera';
import { Scene } from './components/Scene';
import {Light} from './components/Light'
import { Renderer } from './systems/Renderer';
import { Resizer } from './systems/Resizer';
import {Loop } from './systems/Loop';
import { InputDetector } from './systems/InputDetector';
import { OperatorBox } from './components/OperatorBox';

class World {
 #container
 #camera
 #directionalLight;
 #ambientLight;
 #scene;
 #renderer
 #loop;
 #dice;
 #operators
 
 
  constructor(container) {
	  this.#container = container
	  this.#dice = [];
	  this.#dice.push(new Die(1,'lightgreen','red'));
	  this.#dice.push(new Die(1,'blue','white'));
	  this.#dice.push(new Die(1,'black','green'));
	  this.#dice[2].position(4,0,-2);
	  this.#dice[1].position(0,0,-2);
	  this.#dice[0].position(-4,0,-2);
	  let phi = 0.5*Math.PI
	  this.#dice[0].showFace(1)
	  this.#dice[1].showFace(2)
	  this.#dice[2].showFace(3)
	  this.#scene = Scene.create();
	  this.#camera = Camera.create();
	  this.#renderer = Renderer.create();
	  
	  
	  this.#operators = []
	  this.#operators.push(new OperatorBox(0.5,'yellow','black'));
	  this.#operators.push(new OperatorBox(0.5,'yellow','black'));
	 
	  this.#operators[0].position(-1.5,0,0)
	  this.#operators[1].position(1.5,0,0)
	  this.#loop = new Loop( this.camera, this.scene, this.renderer)
	  for (const die of this.#dice)
	  {
		this.loop.addUpdatable(die)
	  }
	  for(const o of this.#operators){
		this.loop.addUpdatable(o)
	  }

	  this.container.append(this.renderer.domElement);
	  this.#directionalLight = Light.createDirectionalLight();
	  this.#ambientLight = Light.createAmbientLight();
	  this.scene.add(...this.meshes, this.directionalLight, this.ambientLight);
	  new Resizer(this);
	  let detector = new InputDetector(this);
	  detector.handle = (object)=>{this.handle(object)};

	}
	handle(intersect){
        
		const die = this.getSelected(intersect.object);
        die.stop(intersect.face);
	}
	render() {
	  this.renderer.render(this.scene, this.camera);
	}
	get camera(){
		return this.#camera;
	}


	get meshes(){
		const meshes = [];
		for (const die of this.#dice)
		{
			meshes.push(die.visible);
		}
		for (const o of this.#operators)
		{
			meshes.push(o.visible);
		}
		return meshes;
	}
	getSelected(mesh){
		for(const object of this.#dice ){
			if(object.visible===mesh){
				return object;
			}
		}
		for(const object of this.#operators ){
			if(object.visible===mesh){
				return object;
			}
		}

		return null;
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