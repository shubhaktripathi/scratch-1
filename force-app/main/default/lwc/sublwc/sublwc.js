/* eslint-disable */

import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext, } from 'lightning/messageService';
import COUNTING_UPDATED_CHANNEL from '@salesforce/messageChannel/coutning_Update__c'


export default class Sublwc extends LightningElement {
    counter = 0;
    subscription = null;

    @wire(MessageContext)
    MessageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.MessageContext,
            COUNTING_UPDATED_CHANNEL,
            (message) => this.handleMessage(message)
        );
    }
    handleMessage(message) {
        console.log("message" + JSON.stringify(message));
        if (message.Operator == 'add') {
            this.counter += message.Constant;
        }
        else if (message.Operator == 'substract') {
            this.counter -= message.Constant;
        }
        else if (message.Operator == 'multiply') {
            this.counter *= message.Constant;
        }
    }

}