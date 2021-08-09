import {	BoxGeometry, 
			Mesh, 
			MeshStandardMaterial,
			TextureLoader,
			CanvasTexture,	
			Color
		} 
from 'three';
class Cube{
	static create(values) {
		values = values??{}
		let {size = 1,bgcolor = 'white',forecolor='black'} = values
		  // create a geometry
		const geometry = new BoxGeometry(size, size, size);

		const material = Cube.#createMaterial(bgcolor,forecolor);
		  // create a Mesh containing the geometry and material
		const cube = new Mesh(geometry, material);
		
		cube.rotation.set(-0.5, -0.1, 0.8);
		cube.tick = (delta)=>{
							//delta is the time it takes to have a new update
							//fraction is the size in radians so the rotation goes at 3 degrees a second
							const fraction = 30/180*Math.PI*delta
							cube.rotation.z += 0.7*fraction
							cube.rotation.x += fraction
							cube.rotation.y += 0.3*fraction
						}
		return cube;
	}
	
	static #isHex(color){
		if(Number.isInteger(color)){
			return true;
		}
		const value = Number.parseInt(color);
		return !isNaN(value);
	}
		
	static  #hexToRGB(color){
		let value = parseInt(color);
		const r = Math.floor(value/16**4);
		value -= r*16**4
		const g = Math.floor(value/16**2)
		value -= g*16**2
		const b = value 
		return `rgb(${r},${g},${b})`;
	}
	// a physically correct "standard" material
	static #createMaterial(bgcolor,forecolor)
	{	
		const textureLoader = new TextureLoader();
		//const texture1 = textureLoader.load('assets/textures/uv-test-bw.png');
		//const texture2 = textureLoader.load('assets/textures/uv-test-col.png');
		//texture.wrapS = RepeatWrapping;
		//texture.wrapT = RepeatWrapping;
		//texture.repeat.set(3,3)
		//const color = 'red'
		bgcolor = Cube.#isHex(bgcolor)?new Color(bgcolor):bgcolor;
		
		const materials = [ ]
		/*for(let i =1;i<4;i++){
			materials.push(new MeshStandardMaterial({color:color,map:textureLoader.load(`assets/textures/${i}.png`) }))
			materials.push(new MeshStandardMaterial({color:color, map:textureLoader.load(`assets/textures/${7-i}.png`)}))
		}*/
		for(let i=1; i<4; i++){
			materials.push(new MeshStandardMaterial({color:bgcolor,map:Cube.#createCubeFaceTexture(forecolor,i) }))
			materials.push(new MeshStandardMaterial({color:bgcolor,map:Cube.#createCubeFaceTexture(forecolor,7-i) }))
		}
								
		return materials;
	}	
	
	static #createCubeFaceTexture(color, value){
		const forecolor = Cube.#isHex(color)?Cube.#hexToRGB(color):color; 
		const canvas = document.createElement('canvas');
		const size = 256
		canvas.width = size;
		canvas.height= size;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = 'white';
		ctx.fillRect(0,0,canvas.width,canvas.width)
		ctx.strokeStyle = forecolor;
		ctx.lineWidth = 3;
		ctx.fillStyle = forecolor;
		Cube.#createRoundedRectangle(canvas,3,3,canvas.width-6,canvas.height-6)
		const r = size/8-2//r moet kleiner dan size/8 anders is er overlap bij de waarde 6
		
		switch(value){
			case 1:
				Cube.#createEye(canvas,2 ,2,r)
				break;
			case 2:
				Cube.#createEye(canvas,1,1,r)
				Cube.#createEye(canvas,3,3,r);
				break;
			case 3:
				Cube.#createEye(canvas,3,1,r)
				Cube.#createEye(canvas,2,2,r);
				Cube.#createEye(canvas,1,3,r);
				break;
			case 4:
				Cube.#createEye(canvas,1,1,r)
				Cube.#createEye(canvas,3,1,r);
				Cube.#createEye(canvas,1,3,r);
				Cube.#createEye(canvas,3,3,r);
				break;
			case 5:
				Cube.#createEye(canvas,1,1,r)
				Cube.#createEye(canvas,3,1,r);
				Cube.#createEye(canvas,1,3,r);
				Cube.#createEye(canvas,3,3,r);
				Cube.#createEye(canvas,2,2,r)
				break;
			case 6:
				Cube.#createEye(canvas,1,1,r)
				Cube.#createEye(canvas,3,1,r);
				Cube.#createEye(canvas,1,3,r);
				Cube.#createEye(canvas,3,3,r);
				Cube.#createEye(canvas,1,2,r)
				Cube.#createEye(canvas,3,2,r)
				break;
		}
		
		var texture = new CanvasTexture(canvas);
		return texture;
		
	}
	static #createEye(canvas, x,y,r){
		const xx = x*canvas.width/4;
		const yy = y*canvas.height/4
		const pen = canvas.getContext('2d')
		pen.save();
		pen.beginPath()
		
		pen.translate(xx,yy)
		pen.arc(0,0,r,0,2*Math.PI)
		pen.fill();
		pen.restore();
	}
	static #createRoundedRectangle(canvas,x,y,width,height){
		const pen = canvas.getContext('2d')
		pen.save()
		const r = 12;
		pen.translate(x,y)
			pen.beginPath();
			pen.moveTo(r,0);
			pen.lineTo(width-r,0);
			pen.quadraticCurveTo(width,0, width,r);
			pen.lineTo(width,height-r);
			pen.quadraticCurveTo(width,height, width-r,height);
			pen.lineTo(r,height);
			pen.quadraticCurveTo(0,height, 0,height-r);
			pen.lineTo(0,r)
			pen.quadraticCurveTo(0,0,r,0)
			pen.stroke();
		pen.restore()
	}
}

export { Cube };