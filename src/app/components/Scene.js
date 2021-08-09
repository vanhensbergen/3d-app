import { Color, Scene as Stage } from 'three';
class Scene{

	static create() {
		const scene = new Stage();
		scene.background = new Color('skyblue');
		return scene;
	}
	
}

export { Scene };