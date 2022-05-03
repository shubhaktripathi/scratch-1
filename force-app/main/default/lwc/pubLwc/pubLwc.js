/* eslint-disable */
import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import COUNTING_UPDATED_CHANNEL from '@salesforce/messageChannel/coutning_Update__c'

export default class PubLwc extends LightningElement {
    @wire(MessageContext)
    messageContext;

    handleIncrement() {
        const payload = {
            Operator: 'add',
            Constant: 1
        }
        publish(this.messageContext, COUNTING_UPDATED_CHANNEL, payload);
        console.log("add");

    }
    handleDecrement() {
        const payload = {
            Operator: 'substract',
            Constant: 1
        }
        publish(this.messageContext, COUNTING_UPDATED_CHANNEL, payload);

    }
    handleMultiply() {
        const payload = {
            Operator: 'multiply',
            Constant: 5
        }
        publish(this.messageContext, COUNTING_UPDATED_CHANNEL, payload);

    }
}