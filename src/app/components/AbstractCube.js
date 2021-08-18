import {	
    BoxGeometry, 
    Mesh, 
} 
from 'three';
class AbstractCube extends BoxGeometry{
    #canvasses;
    rolls;
    #visible;
    #foreColor;
    #backColor;
    #selectedValue;

    constructor(size,backColor, foreColor){
        super(size,size,size)
        this.#foreColor = foreColor;
        this.#backColor = backColor;
        this.#canvasses = [];
        this.rolls = true
        this.#selectedValue = null;
        for (let i =0; i<6; i++)
        {
            let canvas = document.createElement('canvas');
            canvas.width = 200;
            canvas.height = 200;
            this.#canvasses.push(canvas);
        }
    }

    init(){
        this.#createFaces();
        const materials = this.createMaterial();
        this.#visible = new Mesh(this,materials);
    }
    #createFaces(){
        for (let i = 0; i < 6; i++) {
            this.createFace(i);
        }
    }
    createFace(index){
        throw new Error("moet geïmplementeerd worden....")
    }
    createMaterial(){
        throw new Error("moet geïmplementeerd worden....")
    }
    /**
     * zet de face frontaal die bevraagd wodt.
     * de index is de texture materiaal index 
     * @param  index 
     */
    showFace(index){
		let phi = 0.5*Math.PI
		switch(index){
			case 0:
				this.rotation(0,-phi,0)
				break;
            case 1:
                this.rotation(0,phi,0);
                break;
			case 2:
				this.rotation(phi,0,0)
				break;
            case 3:
                this.rotation(-phi,0,0);
                break;
			case 4:
				this.rotation(0,0,0);
				break;
			case 5:
				this.rotation(2*phi,0,0);
				break;
		}
	}

    tick (delta){
        //delta is the time it takes to have a new update
        //fraction is the size in radians so the rotation goes at 30 degrees a seconde
		if(this.rolls){
			const fraction = 30/180*Math.PI*delta
			this.visible.rotation.z += fraction
			this.visible.rotation.x += fraction
			this.visible.rotation.y += fraction
		}
    }

    stop(face){
		this.rolls=!this.rolls;
        this.#selectedValue=null;
		const tmp = this.foreColor;
		this.foreColor= this.backColor;
		this.backColor = tmp;
		if(!this.rolls){
			const index = face.materialIndex
			this.selectedValue = index;
			this.showFace(index)
		}
        console.log(this.#selectedValue)
	}


    set selectedValue(index){
        this.#selectedValue = index;
    }
    get visible(){
        return this.#visible;
    }
    get canvasses(){
        return this.#canvasses;
    }
    get foreColor(){
        return this.#foreColor;
    }

    set foreColor(color){
        this.#foreColor = color;
        this.#createFaces();
		//vraag een update aan van de faces
		const materials = this.visible.material;
		for(const material of materials){
			material.map.needsUpdate=true;	
		}
    }

    get backColor(){
        return this.#backColor;
    }

    set backColor(color){
        this.#backColor = color;
        this.#createFaces();
		//vraag een update aan van de faces
		const materials = this.visible.material;
		for(const material of materials){
			material.map.needsUpdate=true;	
		}
    }

    position(x,y,z){
        this.visible.position.set(x,y,z)
    }
    rotation(x,y,z){
        this.visible.rotation.set(x, y, z);
    }


}

export{AbstractCube}