System.register(['angular2/core', './user.service', './user.model', './user-detail.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, user_service_1, user_model_1, user_detail_component_1;
    var UserComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (user_model_1_1) {
                user_model_1 = user_model_1_1;
            },
            function (user_detail_component_1_1) {
                user_detail_component_1 = user_detail_component_1_1;
            }],
        execute: function() {
            user_model_1.UserConf.directives = [user_detail_component_1.UserDetailComponent];
            user_model_1.UserConf.providers = [user_service_1.UserService];
            UserComponent = (function () {
                function UserComponent(_userService) {
                    this._userService = _userService;
                    this.title = 'Tour of Heros';
                }
                UserComponent.prototype.onSelect = function (hero) {
                    this.selectedHero = hero;
                };
                UserComponent.prototype.getHeros = function () {
                    this.list = this._userService.getHeros();
                };
                UserComponent.prototype.ngOnInit = function () {
                    this.getHeros();
                };
                UserComponent = __decorate([
                    core_1.Component(user_model_1.UserConf), 
                    __metadata('design:paramtypes', [user_service_1.UserService])
                ], UserComponent);
                return UserComponent;
            }());
            exports_1("UserComponent", UserComponent);
        }
    }
});
//# sourceMappingURL=user.component.js.map