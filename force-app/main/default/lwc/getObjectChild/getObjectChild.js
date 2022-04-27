import { LightningElement, api } from 'lwc';

export default class GetObjectChild extends LightningElement {
    @api recId;
    @api obj;
    @api mode;

}