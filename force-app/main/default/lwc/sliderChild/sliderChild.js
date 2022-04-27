import { api, LightningElement } from 'lwc';

export default class SliderChild extends LightningElement {
    @api val = 75;

    @api reset() {
        console.log("child");
        this.val = 0;
    }
   

    handleOnchange(event){
        this.val=event.detail.value;
        //const eve=CustomEvent('value',{detail:this.val});
       // console.log("val is "+this.val);
        this.dispatchEvent(new CustomEvent('value', {detail:this.val}));

    }
}