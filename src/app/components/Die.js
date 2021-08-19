import {
    MeshStandardMaterial,
    CanvasTexture,
} 
from 'three';
import { AbstractCube } from './AbstractCube';

class Die extends AbstractCube{
    #eyes;
    constructor(size,backcolor, forecolor){
        super(size,backcolor, forecolor);
		//de alhier toegepaste volgorde van aantalogen zorgt ervoor dat er sprake is van steeds twee gekoppelde waarden 6 en 1 2 en 5 etc
        this.#eyes = [1,6,2,5,3,4]
        this.init();
    }
	//overriding van base method in AbstractCube	
	createMaterial(){	
		const textures = [];
		for( const canvas of this.canvasses){
			textures.push(new CanvasTexture(canvas));
			//elke texture bevat een canvas met een aantal ogen één hoger dan de index van de texture
		} 
		const materials = [ ]
		for(let i=0; i<6; i++){
			//de volgorde van pushing zorgt voor correcte dobbelsteen met  de 2 opponerende zijden samen steeds 7;
			//de materials worden adus correct geplaatst tegenover elkaar steeds de 2 opeenvolgende
			materials.push(new MeshStandardMaterial({map:textures[i] }))
		}						
		return materials;
	}
	createFace(value){
		//canvas met index 0 is verantwoordelijk voor face 1 with one eye
		//canvas met index 1 is verantwoodelijk voor face 2 met 6 eyes
		//canvas met index 2 is verantwordelijk voor face 3 met 2 ogen etc..
		const canvas = this.canvasses[value];
		const eyes = this.#eyes[value]
		const size = 200
		canvas.width = size;
		canvas.height= size;
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = this.backColor;
		ctx.fillRect(0,0,canvas.width,canvas.width)
		ctx.strokeStyle = this.foreColor;
		ctx.lineWidth = 3;
		ctx.fillStyle = this.foreColor;
		this.#createRoundedRectangle(canvas,3,3,canvas.width-6,canvas.height-6)
		const r = size/8-3//r moet kleiner dan size/8 anders is er overlap bij de waarde 6
	
		switch(eyes){
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

	//overriding van base method in AbstractCube
	set selectedValue(index){
		const value = this.#eyes[index];
		super.selectedValue = value
	}
	//overriding is nodig anders wrkt het niet.
	get selectedValue(){
		return super.selectedValue
	}
}
export {Die}