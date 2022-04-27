import { LightningElement, track, wire } from 'lwc';
import getAccount from '@salesforce/apex/accountListParent.getAccount';
import getContact from '@salesforce/apex/accountListParent.getContact';
import deleteCon from '@salesforce/apex/accountListParent.deleteCon';


const Aactions = [

    { label: 'Show contacts', name: 'show_details', iconName: 'utility:right' },
    { label: 'Delete', name: 'delete', iconName: 'action:delete' }
];

const Cactions = [
    { label: 'delete ', name: 'delete_contact', iconName: 'standard:delete_record' },
    // { label: 'Delete', name: 'delete', iconName: 'action:delete' }
];

export default class AccountListParent extends LightningElement {
    
    
    @track accountName;
    @track accList;
    @track error;
    @track record={}
    @track conList;
    @track DeletedList;
    @track Acolums = [
        { label: 'Name', fieldName: 'Name', type: 'text', iconName: 'standard:account' },
        { label: 'Industry', fieldName: 'Industry', type: 'text', iconName: 'standard:store_group' },
        { label: 'Phone', fieldName: 'phone', type: 'phone', iconName: 'custom:custom22' },
        { label: 'Type', fieldName: 'Type', type: 'text', iconName: "standard:lead_list" },
         { type: 'action', typeAttributes: { rowActions: Aactions }, hideLabel: true, iconName: 'action:new_contact' }

    ]
    @track Contactcolumns = [
        { label: 'Name', fieldName: 'Name', type: 'text', iconName: 'standard:account' },
        { label: 'Phone', fieldName: 'phone', type: 'phone' , iconName:'custom:custom22'},
        { label: 'Type', fieldName: 'Type', type: 'text' ,iconName:"standard:lead_list" },
        { type: 'action', typeAttributes: { rowActions: Cactions }, hideLabel: true, iconName: 'standard:record_delete' }
    ]
    // connectedCallback() {
    //     console.log(this.accountName);
    //     getAccount({ accName: this.accountName })
    //         .then((result) => {
    //             this.accList = result;
    //             console("data");

    //         }).catch((err) => {
    //             this.error = err;

    //         });
    // }


    @wire (getAccount,{accName:"$accountName"})
 getAccountWire;
 //({data,error}){
//     if(data){
//         this.accList=data;

//     }
//     else{
//         this.error= error;
//     }
// }
    


    onchangeHandler(event) {
        this.accountName = event.target.value;
    }

    handleRowAction(event){
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            case 'show_details':
                this.showRowDetails(row);
                console.log("show");
                break;
            default:
        }


    }

    showRowDetails(row){
        this.record=row;
        getContact({conId:this.record.Id})
        .then((result) => {
            this.conList=result;
            console.log("success");
        }).catch((err) => {
            console.log("error");            
        });

    }
    deleteContact(event){
        const row = event.detail.row;
        this.deleteContactRow(row);


    }
    deleteContactRow(row){
        this.record=row;
        deleteCon({contId:this.record.Id})
        .then((result) => {
            this.DeletedList=result;
            console.log("deleted");
        }).catch((err) => {
            console.log("error deleting");
            
        });
}
}