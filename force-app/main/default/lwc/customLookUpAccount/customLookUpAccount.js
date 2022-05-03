import { LightningElement, track, wire } from 'lwc';
import getAccount from '@salesforce/apex/AccountList.getAccount';

export default class CustomLookUpAccount extends LightningElement {
    @track accountName = undefined;
    messageResult = false;
    @track accountList = [];
    @track accountId;
    @track isshow = false;
    @track messageResult = false;
    @track isShowResult = true;
    @track showSearchedValues = false;

    @wire(getAccount, { accName: '$accountName' })
    retreiveAccount({ data, error }) {
        this.messageResult = false;
        if (data) {
            console.log("data");
            if (data.length > 0 && this.isShowResult) {
                this.accountList = data;
                this.showSearchedValues = true;
                this.messageResult = false;
            }
        } else if (error) {
            // TODO: Data handling
            this.accountId = '';
            this.accountName = '';
            this.accountList = [];
            this.showSearchedValues = false;
            this.messageResult = true;
        }

    }

    handleKeyChange(event) {
        this.accountName = event.target.value;
        console.log(this.accountName);
    }

    handleClick() {

        this.isShowResult = true;
        this.messageResult = false;
    }

    handleParentSelection(event) {

        this.showSearchedValues = false;
        this.isShowResult = false;
        this.messageResult = false;
        //Set the parent calendar id
        this.accountId = event.target.dataset.value;
        //Set the parent calendar label
        this.accountName = event.target.dataset.label;
        console.log('accountId::' + this.accountId);
        const selectedEvent = new CustomEvent('selected', { detail: this.accountId });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    handleOpenModal(event) {
        this.isshow = true;
        console.log(':::');
    }
    handleCloseModal(event) {
        this.isshow = false;
    }


    handleSuccess(event) {
        this.isShowResult = false;
        this.messageResult = false;
        this.isshow = false;
        this.accountId = event.detail.id;
        console.log(event.detail.id);
        //console.log('JSON OBject:'+JSON.stringify(event.detail));
        this.accountName = event.detail.fields.Name.value;
        const selectedEvent = new CustomEvent('selected', { detail: this.accountId });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);

    }
    handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
        this.isshow = false;
    }

}