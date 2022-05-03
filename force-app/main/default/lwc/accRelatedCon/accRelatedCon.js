import { LightningElement, wire, api } from 'lwc';
import fetchAcc from '@salesforce/apex/AccRelatedConC.getAllAccountWithContacts';
import getContact from '@salesforce/apex/AccRelatedConC.getContact';

export default class AccRelatedCon extends LightningElement {



    error;
    accData;
    checked;
    name;
    index;
    accWrap;
    recordId;
    accData1;


    @wire(fetchAcc)
    wiredclass({ data, error }) {
        if (data) {
            // this.accData = data;
            console.log('Data \n ', data);
            // Parse Wired object to object to perform Operation as it will point to another object
            this.accData = JSON.parse(JSON.stringify(data));

        } else if (error) {
            this.error = error;
        }

    }

    handleCheckbox(event) {
        event.preventDefault();
        this.name = event.target.name; // isSelected
        this.checked = event.target.checked;
        console.log("checked value is " + this.checked);
        this.index = event.target.dataset.index;
        console.log(this.index);
        this.accData[this.index][this.name] = this.checked;
        console.log(this.accData[this.index][this.name]);
        console.log("sending data type is " + typeof (this.accData));
        console.log(this.accData);
       

        //get contact

        getContact({
            conString: JSON.stringify((this.accData))
        })
            .then(result => {
                console.log('Result \n ', result);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error: \n ', error);
            });


    }
}