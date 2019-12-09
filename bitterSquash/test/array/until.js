export const Test1 = func => {
  test("delete1", () => {
    expect(func([{ time: 1 }, { time: 2 }, { time: 3 }, { time: 4 }], 2)).toEqual([
      { time: 3 },
      { time: 4 }
    ]);
  });
  test("delete2", () => {
    expect(func([{ time: 1 }, { time: 5 }, { time: 6 }, { time: 7 }], 8)).toEqual([]);
  });
};

export const Test2 = func => {
  test("remove1", () => {
    expect(func([{ time: 1 }, { time: 2 }, { time: 3 }, { time: 4 }], 2)).toEqual([
      { time: 1 },
      { time: 3 },
      { time: 4 }
    ]);
  });
  test("remove2", () => {
    expect(func([{ time: 1 }, { time: 5 }, { time: 6 }, { time: 7 }], 4)).toEqual([
      { time: 1 },
      { time: 5 },
      { time: 6 },
      { time: 7 }
    ]);
  });
};

export const Test3 = func => {
  test("isArray1", () => {
    expect(func(new ArrayBuffer())).toEqual(false);
  });
  test("isArray2", () => {
    expect(func([])).toEqual(true);
  });
};

export const Test4 = func => {
  test("lastIndex1", () => {
    expect(func([1, 2, 1, 2, 4, 1, 2, 3, 1, 2], 1)).toEqual(8);
  });
  test("lastIndex2", () => {
    expect(func([1, 1, 1, 1, 1], 2)).toEqual(undefined);
  });
};

export const Test5 = func => {
  test("deepFlatten1", () => {
    expect(func([1, [2, [1, [2], [4, [1], [2], 3], 1]], 2])).toEqual([1, 2, 1, 2, 4, 1, 2, 3, 1, 2]);
  });
  test("deepFlatten2", () => {
    expect(func([1, [1], , [1], 1, [], 1])).toEqual([1, 1, undefined, 1, 1, 1]);
  });
};

export const Test6 = func => {
  test("find1", () => {
    expect(func([{ time: 1 }, { time: 2 }, { time: 3 }, { time: 4 }], item => item.time === 4)).toEqual({ time: 4 });
  });
  test("find1", () => {
    expect(func([{ time: 1 }, { time: 2 }, { time: 3 }, { time: 4 }], item => item.time === 5)).toEqual(undefined);
  });
}

export const Test7 = func => {
  test("isEqual1", () => {
    expect(
      func(
        {
          a: 1,
          b: {
            c: [1, 2, 3, 1]
          }
        },
        {
          a: 1,
          b: {
            c: [1, 2, 3, 4]
          }
        }
      )
    ).toEqual(false);
  });
  test("isEqual2", () => {
    expect(
      func({ a: { b: { c: [3, 1, 2] } }, d: "1" }, { a: { b: { c: [1, 2, 3] } }, d: "1" })
    ).toEqual(false);
  });
  test("isEqual3", () => {
    expect(
      func(
        {
          b: {
            c: {
              c: 2,
              d: 1
            }
          },
          a: 1
        },
        {
          a: 1,
          b: {
            c: {
              d: 1,
              c: 2
            }
          }
        }
      )
    ).toEqual(true);
  });
};

export const Test8 = func => {
  test("uniqueArr1", () => {
    expect(func([1, 2, 1, 2, 4, 1, 2, 3, 1, 2])).toEqual([1, 2, 4, 3]);
  });
  test("uniqueArr2", () => {
    expect(func([])).toEqual([]);
  });
};