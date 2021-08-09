import { DirectionalLight, AmbientLight} from 'three';

class Light{
	static createAmbientLight() {
		const ambientLight = new AmbientLight('white', 1);
		return ambientLight;
	}
	
	static createDirectionalLight(){
		const directionalLight =  new DirectionalLight('white',7);
		directionalLight.position.set(10,10,10);
		return directionalLight
	}
		
}
export {Light};