/* eslint-disable no-unused-vars */
import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountList.getAccounts';
import { deleteRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { NavigationMixin } from "lightning/navigation";

export default class DeleteAccountUsingUiApi extends NavigationMixin(LightningElement) {
    icon = "utility:chevronright"
    @wire(getAccounts)
    getAcc;
    @track recordId;

    editRecordPage(event) {

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.currentTarget.dataset.recid,
                objectApiName: 'Contact',
                actionName: 'edit'
            }
        });


    }
    deleteRecord1(event) {
    
        // eslint-disable-next-line no-unused-vars
        const val = event.currentTarget.dataset.recid;
        deleteRecord(val)
            .then(() => {
                refreshApex(this.getAcc);
                console.log("deleted");
            }
            ).catch(error => {
                console.log(error);
                console.log("error");
            })
    }
}