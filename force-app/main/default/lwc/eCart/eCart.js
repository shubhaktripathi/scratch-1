import { LightningElement, wire,track } from 'lwc';
import getItem from '@salesforce/apex/eCart.getItem';

export default class ECart extends LightningElement {
  @track toggleIcon="utility:right";
  @track toggle=false;
  @track keyIndex = 0;  
  @track selectedName;

    @track columns = [
        { label: 'Product Type', fieldName:"Name", type:'text', iconName: 'custom:custom12' }
    ]


    handleClick(event){
     //  console.log(JSON.stringify(this.Item.data));
       this.selectedName= event.target.Item.data.Name;
       console.log(JSON.stringify(this.selectedName));
        if(event.target.accessKey===this.Item.data){
        this.toggle= !this.toggle;
        this.toggleIcon = this.toggle ? "utility:chevrondown":"utility:right";
        console.log(this.toggle);
        console.log(this.toggleIcon);
        }
        
    }

    @wire (getItem)
    Item;

}