var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * 元组
 * 实现方法tuple
 * 任意参数state类型为: 任意类型
 * 限制返回值为参数组成的数组的类型
 * 如：参数为：1,2,'a',{a:1} 返回值：[1,2,'a',{a:1}]
 */
function tuple() {
    var state = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        state[_i] = arguments[_i];
    }
    return state;
}
/**
 * 枚举
 */
var Example;
(function (Example) {
    Example[Example["C0"] = 0] = "C0";
    Example[Example["C1"] = 2] = "C1";
    Example[Example["C2"] = 3] = "C2";
})(Example || (Example = {}));
var ex = Example.C0;
ex = 0;
console.log(Example.C2); // 3
var SExample;
(function (SExample) {
    SExample["C0"] = "";
    SExample["C1"] = "1";
    SExample["C2"] = "2";
})(SExample || (SExample = {}));
var sEx = SExample.C0;
console.log(Example.C2);
// const enum
var CExamples;
(function (CExamples) {
    CExamples[CExamples["C0"] = 0] = "C0";
    CExamples[CExamples["C1"] = 1] = "C1";
})(CExamples || (CExamples = {}));
var cEx = 0 /* C0 */;
var cEx2 = 0 /* 'C0' */;
/**
 * 泛型
 * 实现方法setPartState
 * 参数state类型为: 任意对象类型
 * 限制参数key类型为state的key类型
 * 限制返回值为state中对应的key的value
 */
function getPartState(state, key) {
    return state[key];
}
var value = getPartState({ isShow: false, num: 1 }, 'num');
/**
 * 装饰器
 */
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("f(): called");
    };
}
function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("g(): called");
    };
}
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () { };
    __decorate([
        f(),
        g()
    ], C.prototype, "method", null);
    return C;
}());
