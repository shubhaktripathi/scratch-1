import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import getAccountRecordsList from '@salesforce/apex/AccountController.getAccountRecordsList';



export default class DisplayDataUsingWire extends LightningElement {
    @track Acc;
    @track AccList;
    @track columns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
        { label: 'Industry', fieldName: 'Industry', type: 'text' },
    ];
    @wire(getAccounts) accountRecords({ error, data }) {
        if (data) {
            this.Acc = data;
        }
        else if (error) {
            this.data = undefined;
        }

    }

    connectedCallback() {
        getAccountRecordsList()
  .then((result) => {
      this.AccList=result;

    }).catch((err) => {
this.AccList=undefined;
    });

    }
}