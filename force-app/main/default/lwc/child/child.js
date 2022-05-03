import { LightningElement,api } from 'lwc';

export default class Child extends LightningElement {
    handlePrevious() {
        this.dispatchEvent(new CustomEvent('previous'));
    }

    handleNext() {
        
        this.dispatchEvent(new CustomEvent('next'));
    }
    
}