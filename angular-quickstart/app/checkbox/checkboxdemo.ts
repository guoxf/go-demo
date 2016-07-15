import {Component} from '@angular/core';
import {Checkbox,CodeHighlighter,TabView,TabPanel} from 'primeng/primeng';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'app/checkbox/checkboxdemo.html',
    styles: [`
        .ui-grid .ui-grid-col-1,
        .ui-grid .ui-grid-col-11 {
            padding: 4px 10px;
        }
        .ui-grid label {
            display: block;
            margin: 2px 0 0 4px;
        }
    `],
    directives: [Checkbox,TabPanel,TabView,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class CheckboxDemo {

    selectedCities: string[] = [];

    selectedCategories: string[] = ['Technology', 'Sports'];
    
    checked: boolean = false;
}