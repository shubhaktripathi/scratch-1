import { LightningElement,track } from 'lwc';
import getAccounts from '@salesforce/apex/comboboxDemoClass.getAccounts';

export default class ComboboxLwc extends LightningElement {
    @track value = '';
    @track optionsArray= [];

    get options(){
        return this.optionsArray;
    }


    connectedCallback(){ 
        getAccounts()
        .then( result=> {
            let arr = [];
            for( var i = 0 ; i< result.length ; i++){
                arr.push({ label : result[i].Name , value: result[i].Id })
            }
           this.optionsArray = arr;

        })
    }

    handleChanged(event){
        this.value = event.detail.value;
    }

}