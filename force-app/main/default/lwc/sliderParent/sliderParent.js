import { LightningElement ,track} from 'lwc';

export default class SliderParent extends LightningElement {
   
    @track Pvalue=0;
     handleReset(){
        console.log("parent");
        this.template.querySelector('c-slider-child').reset();
    }

    onValueChange(event){
        
        this.Pvalue=event.detail;

    }
}