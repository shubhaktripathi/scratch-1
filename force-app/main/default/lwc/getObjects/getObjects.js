import { LightningElement, wire } from 'lwc';
import getObjectList from '@salesforce/apex/getObjects.getObjectList';
import getstandardObj from '@salesforce/apex/getObjects.getstandardObj';
import getReocrd from '@salesforce/apex/getObjects.getReocrd';
import { getRecordUi } from 'lightning/uiRecordApi';


export default class GetObjects extends LightningElement {
    customObjectList;
    strngOBJ;
    customObjectArray = [];
    value;
    value1;
    optionArray = [];
    stdObjectArray = [];
    record;
    error;
    recordId = '';
    recordData;
    recordF;
    key;
    key1;
    result;
    recordData;
    showRecord;
    str1;
    str2;
    mode;
    // @wire(getRecordUi, { recordIds: '$recordId', layoutTypes: 'Full', modes: 'View' })
    // accountRecordUi({ data, error }) {
    //     if (data) {

    //         //  this.recordData = data.records[this.recordId].fields.Name.value;
    //         // this.recordData = data.records[this.recordId].fields;
    //         this.recordData = Object.keys(data.records[this.recordId].fields);
    //         //   console.log(this.recordData + typeof(this.recordData));
    //     }

    //     else if (error)
    //         console.log(error);

    // }


    get options() {
        return [
            { label: 'Standard', value: 'standard' },
            { label: 'Custom', value: 'custom' },
        ];
    }

    get modeArray() {
        return [
            { label: 'read Only', value: 'readonly' },
            { label: 'Edit', value: 'edit' },
        ];

    }


    @wire(getObjectList)
    getobj({ error, data }) {
        if (data) {
            this.customObjectList = data;
            // console.log(JSON.stringify(this.customObjectList));
            // var result = Object.keys(this.customObjectList).map((key) => [this.customObjectList[key]]);
            let arr = [];

            for (let i = 0; i < this.customObjectList.length; i++) {
                arr.push({ label: this.customObjectList[i], value: this.customObjectList[i] })
            }
            this.customObjectArray = arr;

        }

        else if (error) {
            console.log("error is " + error);
            this.objectList = undefined;
        }

    }


    @wire(getstandardObj)
    stdobj({ error, data }) {
        if (data) {
            this.strngOBJ = data;

            let arr = [];

            for (let i = 0; i < this.strngOBJ.length; i++) {
                arr.push({ label: this.strngOBJ[i], value: this.strngOBJ[i] })
            }
            this.stdObjectArray = arr;


        }

        else if (error) {
            console.log("error is " + error);
            this.strngOBJ = undefined;
        }

    }

    handleChanged(event) {
        this.value = event.detail.value;
        console.log(this.value);
        if (this.value === 'custom') {

            this.optionArray = this.customObjectArray
        }
        else {
            this.optionArray = this.stdObjectArray;
        }
    }
    handleChanged1(event) {
        this.value1 = event.detail.value;
        console.log(typeof (this.value1) + '  ' + this.value1);
        this.showRecord = false;

        //change first letter to capital to use on Record Form Api Name
        this.str1 = this.value1;

        this.str2 = this.str1.charAt(0).toUpperCase() + this.str1.slice(1);


        getReocrd({ str: this.value1 })
            .then((result) => {

                this.record = result;
                console.log(JSON.stringify(this.record) + typeof (this.record));
            }).catch((err) => {
                this.record = undefined;
                this.error = err;
                console.log('error is' + error);

            });



    }

    showData(event) {

        this.recordId = event.currentTarget.dataset.value;
        this.showRecord = true;
        console.log(this.recordId);

        // this.dispatchEvent(new CustomEvent('select', {detail:this.recordId}));

    }

    handleChanged2(event) {
        this.mode = event.detail.value;
        console.log(this.mode);
    }
}