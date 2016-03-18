System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserConf, UserDetailConf;
    return {
        setters:[],
        execute: function() {
            //import {UserService} from './user.service'
            //import {UserDetailComponent} from './user-detail.component'
            exports_1("UserConf", UserConf = {
                selector: 'user-list',
                directives: [],
                providers: [],
                template: "\n    <h1>{{title}}</h1>\n    <h2>My Heroes</h2>\n    <ul class=\"heroes\">\n        <li *ngFor=\"#hero of list\" \n            (click)=\"onSelect(hero)\" \n            [class.selected]=\"hero===selectedHero\">\n            <span class=\"badge\">{{hero.id}}</span>{{hero.name}}\n        </li>\n    </ul>\n    <user-detail [hero]=\"selectedHero\"></user-detail>\n    ",
                styles: ["\n            .selected {\n                background-color: #CFD8DC !important;\n                color: white;\n            }\n            .heroes {\n                margin: 0 0 2em 0;\n                list-style-type: none;\n                padding: 0;\n                width: 10em;\n            }\n            .heroes li {\n                cursor: pointer;\n                position: relative;\n                left: 0;\n                background-color: #EEE;\n                margin: .5em;\n                padding: .3em 0;\n                height: 1.6em;\n                border-radius: 4px;\n            }\n            .heroes li.selected:hover {\n                background-color: #BBD8DC !important;\n                color: white;\n            }\n            .heroes li:hover {\n                color: #607D8B;\n                background-color: #DDD;\n                left: .1em;\n            }\n            .heroes .text {\n                position: relative;\n                top: -3px;\n            }\n            .heroes .badge {\n                display: inline-block;\n                font-size: small;\n                color: white;\n                padding: 0.8em 0.7em 0 0.7em;\n                background-color: #607D8B;\n                line-height: 1em;\n                position: relative;\n                left: -1px;\n                top: -4px;\n                height: 1.8em;\n                margin-right: .8em;\n                border-radius: 4px 0 0 4px;\n            }\n      "]
            });
            exports_1("UserDetailConf", UserDetailConf = {
                selector: 'user-detail',
                inputs: ['hero'],
                template: "\n    <div *ngIf=\"hero\">\n        <h2>{{hero.name}} details!</h2>\n        <div><label>id: </label>{{hero.id}}</div>\n        <div>\n            <label>name: </label>\n            <input [(ngModel)]=\"hero.name\" placeholder=\"name\"/>\n        </div>\n    </div>"
            });
        }
    }
});
//# sourceMappingURL=user.model.js.map