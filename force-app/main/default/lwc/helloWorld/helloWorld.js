import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    greeting = 'Hello'
    showText = false;
    buttonValue = "show";

    changeHandler(event) {
        this.greeting = event.target.value;
    }
    showHandler(event) {

        this.showText = true;

          if(this.buttonValue==="show"){
            this.buttonValue="hide";
          }
          else if(this.buttonValue==="hide"){
            this.buttonValue="show";
            this.showText= false;
          }


    }
}