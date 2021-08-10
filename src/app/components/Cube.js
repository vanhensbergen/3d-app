import {	
    BoxGeometry, 
    Mesh, 
    MeshStandardMaterial,
    TextureLoader,
    CanvasTexture,
} 
from 'three';
class Cube extends BoxGeometry{
    #foreColor;
    #backColor;
    #canvasses;
    #mesh
    constructor(size,backcolor, forecolor){
        super(size,size,size);
        this.#foreColor = forecolor;
        this.#backColor = backcolor;
        this.#canvasses = [];
        for (let i =0; i<6; i++)
        {
            this.#canvasses.push(document.createElement('canvas'));
        }
        this.#init();
    }
    get mesh(){
        return this.#mesh;
    }
    #init(){

        this.#createCubeFaces();
        const materials = this.#createMaterial();
        this.#mesh = new Mesh(this,materials);

    }
    #createCubeFaces() {
        for (let i = 1; i < 7; i++) {
            this.#createCubeFace(i);
        }
    }

    rotation(x,y,z){
        this.#mesh.rotation.set(x, y, z);
    }
    position(x,y,z){
        this.#mesh.position.set(x,y,z)
    }

	#createMaterial(){	
        const textures = [];
        for( const canvas of this.#canvasses){
            textures.push(new CanvasTexture(canvas));
			//elke texture bevat een canvas met een aantal ogen één hoger dan de index van de texture
        } 
		const materials = [ ]
		for(let i=0; i<3; i++){
            //de volgorde van pushing zorgt voor correcte dobbelsteen met  de 2 opponerende zijden samen steeds 7;
			materials.push(new MeshStandardMaterial({map:textures[i] }))
			materials.push(new MeshStandardMaterial({map:textures[5-i] }))
		}						
		return materials;
	}	
	
	#createCubeFace(value){
		const canvas = this.#canvasses[value-1]//canvas met index 0 is verantwoordelijk voor side with one eye etc
		const size = 256
		canvas.width = size;
		canvas.height= size;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = this.#backColor;
		ctx.fillRect(0,0,canvas.width,canvas.width)
		ctx.strokeStyle = this.#foreColor;
		ctx.lineWidth = 3;
		ctx.fillStyle = this.#foreColor;
		this.#createRoundedRectangle(canvas,3,3,canvas.width-6,canvas.height-6)
		const r = size/8-3//r moet kleiner dan size/8 anders is er overlap bij de waarde 6
	
		switch(value){
			case 1:
				this.#createEye(canvas,2 ,2,r)
				break;
			case 2:
				this.#createEye(canvas,1,1,r)
				this.#createEye(canvas,3,3,r);
				break;
			case 3:
				this.#createEye(canvas,3,1,r)
				this.#createEye(canvas,2,2,r);
				this.#createEye(canvas,1,3,r);
				break;
			case 4:
				this.#createEye(canvas,1,1,r)
				this.#createEye(canvas,3,1,r);
				this.#createEye(canvas,1,3,r);
				this.#createEye(canvas,3,3,r);
				break;
			case 5:
				this.#createEye(canvas,1,1,r)
				this.#createEye(canvas,3,1,r);
				this.#createEye(canvas,1,3,r);
				this.#createEye(canvas,3,3,r);
				this.#createEye(canvas,2,2,r)
				break;
			case 6:
				this.#createEye(canvas,1,1,r)
				this.#createEye(canvas,3,1,r);
				this.#createEye(canvas,1,3,r);
				this.#createEye(canvas,3,3,r);
				this.#createEye(canvas,1,2,r)
				this.#createEye(canvas,3,2,r)
				break;
		}
	}
	#createEye(canvas, x,y,r){
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
	#createRoundedRectangle(canvas,x,y,width,height){
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
    get foreColor(){
        return this.#foreColor 
    }
    set foreColor(value){
        this.#foreColor = value;
        this.#createCubeFaces();
        
    }
    get backColor(){
        return this.#backColor 
    }
    set backColor(value){
        this.#backColor = value;
		this.#createCubeFaces();
    }
    tick (delta){
        //delta is the time it takes to have a new update
        //fraction is the size in radians so the rotation goes at 3 degrees a second
        const fraction = 30/180*Math.PI*delta
        this.#mesh.rotation.z += 0.7*fraction
        this.#mesh.rotation.x += fraction
        this.#mesh.rotation.y += 0.3*fraction
    }
}
export {Cube}