System.register([], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var Unless;
    return {
        setters:[],
        execute: function() {
            Unless = (function () {
                function Unless(viewContainer, templateRef) {
                    this.viewContainer = viewContainer;
                    this.templateRef = templateRef;
                    this.prevCondition = null;
                }
                Object.defineProperty(Unless.prototype, "unless", {
                    set: function (newCondition) {
                        if (newCondition && (isBlank(this.prevCondition) || !this.prevCondition)) {
                            this.prevCondition = true;
                            this.viewContainer.clear();
                        }
                        else if (!newCondition && (isBlank(this.prevCondition) || this.prevCondition)) {
                            this.prevCondition = false;
                            this.viewContainer.create(this.templateRef);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Unless = __decorate([
                    Directive({
                        selector: '[unless]',
                        inputs: ['unless']
                    }), 
                    __metadata('design:paramtypes', [Object, Object])
                ], Unless);
                return Unless;
            })();
            exports_1("Unless", Unless);
        }
    }
});
//# sourceMappingURL=unless.component.js.map