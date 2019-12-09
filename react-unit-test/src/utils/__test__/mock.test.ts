import { doAdd, doSubtract } from "..";
import Math from '../math';

// why we mock： the goal for mocking is to replace something we don't control with something we do
// 1. capture calls
// 2. set return values
// 3. change the implementation

describe("jest.fn demos", () => {
  Math.subtract = jest.fn();
  Math.add = jest.fn();
  test("calls callback with arguments added", () => {
    doAdd(1, 2);
    expect(Math.add).toHaveBeenCalledWith(1,2);
  });
  
  // 当测试的函数依赖于其他的模块的时候可以mock其他模块中的函数，保证这条测试用例只是用于测试当前函数的正确性
  test("calls math.subtract", () => {
    doSubtract(1, 2);
    expect(Math.subtract).toHaveBeenCalledWith(1, 2);
  });
})

describe("jest.mock mock a module", () => {
  jest.mock('../math.ts');
  test("calls callback with arguments added", () => {
    doAdd(1, 2);
    expect(Math.add).toHaveBeenCalledWith(1,2);
  });
  
  test("calls math.subtract", () => {
    doSubtract(1, 2);
    expect(Math.subtract).toHaveBeenCalledWith(1, 2);
  });
})

describe("jest.spyOn demo", () => {
  test("calls math.add", () => {
    // 模拟模块内部的函数add
    const addMock = jest.spyOn(Math, "add");
    addMock.mockImplementation((a, b) => a + b);
    expect(doAdd(1, 2)).toEqual(3);
    expect(addMock).toHaveBeenCalledWith(1, 2);
  });

})


