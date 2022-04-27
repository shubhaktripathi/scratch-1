import { LightningElement, track } from 'lwc';

import AccountDetails from "@salesforce/apex/AccountProvider.AccountDetails";

import getAllContacts from "@salesforce/apex/AccountProvider.getAllContacts";

import deleteSelectedContacts from "@salesforce/apex/AccountProvider.deleteSelectedContacts";



const columns = [

    { label: 'Id', fieldName: 'Id', editable: true },

    { label: 'First Name', fieldName: 'FirstName', editable: true },

    { label: 'Last Name', fieldName: 'LastName', editable: true },

];



export default class AccountContactTable extends LightningElement {

    accountList

    accountName

    showSpinner = false

    showAccountTable = false;

    showAccBlankMessage = false;

    showNoRecordMessage = false;

    conList

    selectedRecordsCount
    @track selectedObject = {}

    @track selectedRecords;

    draftValues = [];

    columns = columns;





    handleSearchAccName() {

        this.showSpinner = true;

        this.accountName = this.template.querySelector('lightning-input[data-formfield="accountName"] ').value;



        if (!this.accountName == "") {

            AccountDetails({ AccName: this.accountName })

                .then((result) => {



                    if (result.length >= 1) {

                        this.showSpinner = false;

                        this.showAccBlankMessage = false;

                        this.accountList = result;

                        this.showAccountTable = true;

                        this.showNoRecordMessage = false;

                    }

                    else {

                        this.error = undefined;

                        this.showNoRecordMessage = true;

                        this.showSpinner = false;

                        this.showAccountTable = false;

                        this.showAccBlankMessage = false;

                    }

                })

                .catch((error) => {

                    this.error = error;

                    this.showAccountTable = false;

                    this.result = undefined;

                });

        }

        else {

            this.showAccBlankMessage = true;

            this.showAccountTable = false;

            this.showSpinner = false;

            this.showNoRecordMessage = false;

        }

    }



    handleShowContactsClick() {

        this.accountName = this.template.querySelector('lightning-input[data-formfield="accountName"] ').value;

        getAllContacts({ accName: this.accountName })

            .then((result) => {

                this.conList = result;

                console.log(this.conList);

                this.error = undefined;

            })

            .catch((error) => {

                this.error = error;

                this.result = undefined;

            });



    }



    selectedRecordsHandler(event) {

        const selectedRows = event.detail.selectedRows;
        this.selectedObject = selectedRows;
        console.log("Selected Rows = " + selectedRows);
        console.log("Selected Rows = " + JSON.stringify(selectedRows));
        let recordsSets = new Set();

        // getting selected record id
        for (let i = 0; i < selectedRows.length; i++) {

            recordsSets.add(selectedRows[i].Id);

        }

        console.log(recordsSets)



        // coverting to array

        this.selectedRecords = Array.from(recordsSets);
        console.log(this.selectedRecords);

    }


    handleDeleteSelectedContacts() {

        console.log('Delete Method');
        console.log(JSON.stringify(this.selectedRecords));
        console.log(this.selectedObject);
        console.log('Delete Method 1');

        deleteSelectedContacts({ conList: this.selectedRecords })

            .then((result) => {

                this.conList = result;
                this.error = undefined;
                console.log("deleted");

            })

            .catch((error) => {

                this.error = error;
                this.result = undefined;
                console.log("error");

            });





    }

























    handleUndeleteSelectedContacts() {



    }







}