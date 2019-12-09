import * as React from 'react';
import { Test1Component } from './test1';
export var TestComponent = function () {
    return (React.createElement("div", null,
        React.createElement("p", null,
            React.createElement("a", null,
                React.createElement(Test1Component, null)))));
};
