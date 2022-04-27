/* eslint-disable  */
import { LightningElement } from 'lwc';
import getAccount from '@salesforce/apex/AccountController.getAccount'
export default class GetCurrentAccountDetails extends LightningElement {
   
    AccountList;
    error;

    connectedCallback(){
        getAccount()
        .then((result) => {
            this.AccountList=result;
        }).catch((err) => {
            this.error=err;
        });
    }

    handleClick(event){
        let index=event.target.dataset.index;
        alert('Selected Account is'+JSON.stringify(this.AccountList[index].Name+this.AccountList[index].Phone));


    }
    
}