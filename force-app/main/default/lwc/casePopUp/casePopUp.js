import { LightningElement, api, track } from 'lwc';

export default class CasePopUp extends LightningElement {
    @api modal = false;
    @track caseReason;
    @api isModal() {
        // eslint-disable-next-line @lwc/lwc/no-api-reassignments
        this.modal = true;
    }
    handleOnchange(event) {
        this.caseReason = event.target.value;
        console.log(event.target.value);
    }

    handleCancel() {
        // eslint-disable-next-line @lwc/lwc/no-api-reassignments
        this.modal = false;

    }
    handleSave() {
        this.dispatchEvent(new CustomEvent('escevent', { detail: this.caseReason }));
        // eslint-disable-next-line @lwc/lwc/no-api-reassignments
        this.modal=false;

    }

}