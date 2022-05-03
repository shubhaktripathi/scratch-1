/* eslint-disable*/
import { LightningElement, track, wire } from 'lwc';
import getAccount from '@salesforce/apex/AccountList.getAccount';
import deleteCon from '@salesforce/apex/AccountList.deleteCon';
import getContact from '@salesforce/apex/AccountList.getContact';
import updateCon from '@salesforce/apex/AccountList.updateCon';
import undeleteAcc from '@salesforce/apex/AccountList.undeleteAcc';

import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const Aactions = [
    { label: 'Show contacts', name: 'show_details', iconName: 'standard:contact' },
];
const Cactions = [
    { label: 'Edit ', name: 'Edit_contact', iconName: 'standard:edit_record' },
    { label: 'delete ', name: 'delete_contact', iconName: 'standard:delete_record' },

];
const Dactions = [
    { label: 'undelete ', name: 'undelete_contact', iconName: 'utility:undelete' },
];

export default class AccountList extends LightningElement {
    @track accountSearch;
    @track accList;
    @track conList;
    @track deletedContacts;
    @track record = {}
    @track record1 = {};

    @track Accountcolumns = [
        { label: 'Name', fieldName: 'Name', type: 'text', iconName: 'standard:account' },
        { label: 'Industry', fieldName: 'Industry', type: 'picklist', iconName: 'standard:store_group', editable: 'true' },
        { label: 'Phone', fieldName: 'phone', type: 'phone', iconName: 'custom:custom22' },
        { label: 'Type', fieldName: 'Type', type: 'picklist', iconName: "standard:lead_list", editable: 'true' },
        { type: 'action', typeAttributes: { rowActions: Aactions }, hideLabel: true, iconName: 'action:new_contact' },
        {
            label: 'Rating', fieldName: 'Rating', type: 'picklist', typeAttributes: {
                placeholder: 'Choose rating', options: [
                    { label: 'Hot', value: 'Hot' },
                    { label: 'Warm', value: 'Warm' },
                    { label: 'Cold', value: 'Cold' },
                ] // list of all picklist options
                , value: { fieldName: 'Rating' } // default value for picklist
                , context: { fieldName: 'Id' } // binding account Id with context variable to be returned back
            }, editable: 'true'
        }
        // { label: 'show Contact', type: 'action', iconName: 'standard-deleted_record' }
    ];

    @track Contactcolumns = [
        { label: 'LastName', fieldName: 'LastName', type: 'text', iconName: 'standard:account', editable: 'true' },
        { label: 'Name', fieldName: 'Name', type: 'text', iconName: 'standard:account', editable: 'true' },
        { label: 'Phone', fieldName: 'Phone', type: 'Phone', iconName: 'custom:custom22', editable: 'true' },
        { label: 'Type', fieldName: 'Type', type: 'picklist', iconName: "standard:lead_list", editable: 'true' },
        { type: 'action', typeAttributes: { rowActions: Cactions }, hideLabel: true, iconName: 'standard:record_delete', editable: 'true' }
    ]

    @track deletedColumn = [
        { label: 'Name', fieldName: 'Name', type: 'text', iconName: 'standard:account' },
        { label: 'Phone', fieldName: 'Phone', type: 'Phone', iconName: 'custom:custom22', editable: 'true' },
        { label: 'Type', fieldName: 'Type', type: 'text', iconName: "standard:lead_list" },
        { type: 'action', typeAttributes: { rowActions: Dactions }, hideLabel: true, iconName: 'utility:undelete' }
    ]

    handleChange(event) {
        this.accountSearch = event.target.value;
    }

    handleAccount() {
        getAccount({ accName: this.accountSearch })
            .then((data) => {
                this.accList = data;
                console.log(`this is data---$(this.accList)`);
            }).catch((err) => {
                this.accList = undefined;

            });
    }

    handleRowAction(event) {
        // const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.showRowDetails(row);

    }

    showRowDetails(row) {
        this.record = row;
        getContact({ conId: this.record.Id })

            .then(result => {
                this.conList = result;
                console.log(`contact data`);
            })
            .catch(err => {
                this.error = err;
                console.log("there is an error");
                console.log(error);
            })
        // window.location.reload();


    }

    handleContactAction(event) {
        // const row = event.detail.row;
        // console.log("row");
        // this.deleteContact(row);

        const selectedRows = event.detail.selectedRows;
        console.log("Selected Rows = " + selectedRows);
        console.log("Selected Rows = " + JSON.stringify(selectedRows));
        let recordsSets = new Set();
        // getting selected record id
        for (let i = 0; i < selectedRows.length; i++) {
            recordsSets.add(selectedRows[i].Id);
        }
        // Method 1 coverting to array 

        this.selectedRecords = Array.from(recordsSets);
        // Method 2assigning object
        // this.selectedRecords=selectedRows;
        console.log(this.selectedRecords);

    }

    handleRowAction1(event) {
        const actionName = event.detail.action.name;
        switch (actionName) {
            case 'Edit_contact': this.handleSave1();
                break;
            case 'delete_contact': this.deletedContacts1();
                console.log("4");
                // const rows = this.data;
                // const rowIndex = rows.indexOf(row);
                // rows.splice(rowIndex, 1);
                // this.data = rows;
                break;
        }
    }

    deletedContacts1() {

        console.log("data is" + this.selectedRecords);
        this.record = this.selectedRecords;

        deleteCon({ coList: this.record })
            .then((result) => {
                console.log("deleted");
                this.conList = false;
                this.deletedContacts = result;
                const evt = new ShowToastEvent({
                    title: "Contact Deleted",
                    message: '',
                    variant: "success",
                });
                this.dispatchEvent(evt);
            }).catch((err) => {
                this.error = err;
                console.log("not deleted");
                console.log(error);

            });
    }


    handleSave1() {
        const dt = this.template.querySelector('lightning-datatable');
        console.log(dt);
        dt.openInlineEdit();

    }

    handleSave(event) {
        this.draftedContact = event.detail.draftValues;
        console.log(JSON.stringify(this.draftedContact));
        // const recordInputs = this.draftedContact.slice().map(draft => {
        //     const fields = Object.assign({}, draft);
        //     return { fields };
        // });
        // const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        // Promise.all(promises).then(res => {
        //     this.dispatchEvent(
        //         new ShowToastEvent({
        //             title: 'Success',
        //             message: 'Records Updated Successfully!!',
        //             variant: 'success'
        //         })
        //     );
        //     this.saveDraftValues = [];
        //     return this.refresh();
        // }).catch(error => {
        //     this.dispatchEvent(
        //         new ShowToastEvent({
        //             title: 'Error',
        //             message: 'An Error Occured!!',
        //             variant: 'error'
        //         })
        //     );
        // }).finally(() => {
        //     this.saveDraftValues = [];
        // });
        updateCon({ obj: this.draftedContact })

            .then((result) => {
                refreshApex(this.getContact);
                console.log("updated");
                console.log(JSON.stringify(result));
            }).catch((err) => {

                console.log(err);
                console.log("error updating");
            });


    }
    handleUndelete(event) {
        const row = event.detail.row;
        console.log("row");
        this.undelete(row);
    }

    undelete(row) {
        this.record = row;
        console.log("record");
        undeleteAcc({ undId: this.record.Id })
            .then((result) => {
                console.log("deleted");
                this.undeletedCon = result;
                const evt = new ShowToastEvent({
                    title: "Contact Undeleted Suucessfully",
                    message: '',
                    variant: "success",
                });
                this.dispatchEvent(evt);
            }).catch((err) => {
                this.error = err;
                console.log("not deleted");
                console.log(error);

            });



    }

}