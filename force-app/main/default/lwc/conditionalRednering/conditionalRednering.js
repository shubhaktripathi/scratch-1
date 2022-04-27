import { LightningElement } from 'lwc';

export default class ConditionalRednering extends LightningElement {
    button="Show";

    isShow=false;

    handleChange(){
        this.button="Hide";
        this.isShow=!this.isShow;
    }
}