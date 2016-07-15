
import {Component} from '@angular/core';
import {InputText} from 'primeng/primeng';

@Component({
	selector: 'my-app',
	template: `
        <h1>My First PrimeNG App</h1>
        <input type="text" pInputText/>
    `,
    directives: [InputText]
})
export class AppComponent {

}