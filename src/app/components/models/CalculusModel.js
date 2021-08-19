class CalculusModel{


    parse(str){
        try {
            const result = Function(`'use strict'; return (${str})`)()
            return result
        }
        catch(e){
            console.log('rotzooi: '+e);
           return false;
        }
    }
}
export {CalculusModel}