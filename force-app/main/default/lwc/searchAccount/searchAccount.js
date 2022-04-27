import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountSearchCls.getAccounts';
const DELAY = 5000;
import getAccount from '@salesforce/apex/AccountSearchCls.getAccount';


export default class SearchAccount extends LightningElement {
    accountName = null;
    @track accountList = [];
    @wire(getAccounts, { actName: '$accountName' })
  // @wire(getAccounts, { actName: this.accountName })
    retrieveAccouts({ error, data }) {
        if (data) {
            this.accountList = data;
        }
        else if (error) {

        }
    }

    // handleClick(){
    //     getAccount({actName:this.accountName})
    //      .then((result) => {
    //          this.accountList=result;

    //      }).catch((err) => {
    //          this.accountList=undefined;
    //      });
    // }
    handleKeyChange(event) {
        const searchString = event.target.value;
        window.clearTimeout(this.delayTimeout); 
        this.delayTimeout = setTimeout(() => {
            this.accountName = searchString;
        }, DELAY);

        //this.accountName= event.target.value;
    }
}