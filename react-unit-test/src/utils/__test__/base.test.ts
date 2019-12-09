import jest from 'jest';

describe('test the syntax of Jest describe', () => {
  let user:{name: string, age:number};
  // beforeEach会在测试用例执行之前执行，如果返回promise会等待resolve
  beforeEach(() => {
    const getUserInfo = new Promise((resolve, reject) => {
      setTimeout(() => {
        user = {
          name: 'john',
          age: 21
        }
        resolve(user);
      }, 2000);
    })
    return getUserInfo
  })
  test('user name should be john', () => {
    expect(user.name).toEqual('john');
  });

  test('user age should be 21', () => {
    expect(user.age).toEqual(21);
  });
});

describe('', () => {
  const myBeverage1 = {
    delicious: true,
    sour: false,
  };
  test('is delicious', () => {
    expect(myBeverage1.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(myBeverage1.sour).toBeFalsy();
  });
});
