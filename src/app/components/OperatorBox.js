import{
    AbstractCube
} 
from './AbstractCube';
import{
    MeshStandardMaterial,
    CanvasTexture,
}
from 'three'
class OperatorBox extends AbstractCube{
  
    #operations;

    constructor(size,backcolor,forecolor){
        super(size,backcolor,forecolor);
        
        this.#operations = ['+','-','*','/','(',')'];
        this.init();
        
    }
    
    createMaterial(){	
        const textures = [];
        for( const canvas of this.canvasses){
            textures.push(new CanvasTexture(canvas));
			//elke texture bevat een canvas met daarin een operator getekend uit de array operations. De index is identiek van de operator en de texture
        } 
		const materials = [ ]
		for(let i=0; i<6; i++){
			materials.push(new MeshStandardMaterial({map:textures[i] }))
		}						
		return materials;
	}

 
    createFace(index){
        let operator = this.#operations[index];
        operator = index === 2?'x':operator
        operator = index === 3?"\u00F7":operator
        const canvas = this.canvasses[index];
        //clear the canvas
        canvas.width = canvas.width;
        canvas.height = canvas.height;
        const pen = canvas.getContext('2d');
        
        pen.fillStyle = this.backColor;
        pen.fillRect(0,0,canvas.width, canvas.height);
        pen.fillStyle = this.foreColor;
        pen.font = 'bold 150px sans-serif'
        pen.textAlign ='center';
        pen.textBaseline = 'middle';
        pen.fillText(operator,canvas.width/2, canvas.height/2);
        pen.fill();
    }
    //overiding van de base method in AbstractCube
    set selectedValue(index){
        super.selectedValue = this.#operations[index]
    }
    get selectedValue(){
        return super.selectedValue;
    }
}
export{OperatorBox}