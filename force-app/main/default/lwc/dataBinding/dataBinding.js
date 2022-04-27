import { LightningElement } from 'lwc';

export default class DataBinding extends LightningElement {
    inputText;
    handleClick(event) {
        this.inputText = event.target.value;

    }
}