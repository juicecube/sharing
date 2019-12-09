import * as React from 'react';
import { Test1Component } from './test1';
var Test2Component = function () {
    return (React.createElement("div", null,
        React.createElement("p", null,
            React.createElement("a", null,
                React.createElement(Test1Component, null)))));
};
