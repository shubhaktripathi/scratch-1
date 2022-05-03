/* eslint-disable */
import { LightningElement, track } from 'lwc';
import getCase from '@salesforce/apex/caseHandler.getCase';
import reOpen from '@salesforce/apex/caseHandler.reOpen';
import escalate from '@salesforce/apex/caseHandler.escalate';
const DELAY = 3000;


export default class CaseEscalator extends LightningElement {
    @track caseValue;
    @track caseResult;
    @track error;
    @track caseReason;
    @track isSpin = false;
    buttonVar = "success";
    buttonLab = "Reopen";

    columns = [{ label: 'Case Number', fieldName: 'CaseNumber', type: 'text' },
    { label: 'status', fieldName: 'Status', type: 'text' },
    { label: 'Reason', fieldName: 'Reason', type: 'picklist' },
    { label: 'Reason', fieldName: 'Description', type: 'text' }]

    onChangehandle(event) {
        this.caseValue = event.target.value;
    }

    caseSearch() {
        this.isSpin = true;
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            getCase({ caseNum: this.caseValue })
                .then((result) => {
                    this.caseResult = result;
                    //   console.log(JSON.stringify(this.caseResult));
                }).catch((err) => {
                    this.error = err;
                });
            this.isSpin = false;
        }, DELAY);

    }

    handleClick(event) {
        this.buttonVar = "destructive";
        this.buttonLab = "Escalate";
        if (event.target.label === 'Reopen') {
            this.handleReopen();
        }
        else if (event.target.label === 'Escalate') {
            this.handleEscalate();
        }
    }

    handleReopen() {
        // console.log("value is"+JSON.stringify(this.caseValue));
        reOpen({ cNum: this.caseValue })
            .then((result) => {
                this.caseResult = result;
                // console.log(JSON.stringify(this.caseResult));
            }).catch((err) => {
                this.error = err;
                console.log(err);
            });
    }

    handleEscalate() {
        this.template.querySelector("c-case-pop-up").isModal();
        console.log("hi");
    }

    handleOnSave(event) {

        this.caseReason = event.detail;
        // console.log(JSON.stringify(this.caseResult));
        // console.log(typeof (this.caseResult));
        escalate({ obj: this.caseResult, reason: this.caseReason })
            // escalate({obj:this.caseValue,reason:this.caseReason})
            .then((result) => {
                this.caseResult = result;
                console.log("data");
                console.log(JSON.stringify(this.caseResult));
            }).catch((err) => {
                console.log("error");
                console.log(err);
            });


    }

}