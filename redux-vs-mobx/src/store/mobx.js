import { observable, action, computed, autorun, flow, configure, runInAction, when } from 'mobx';

configure({
  enforceActions: 'observed',
});

const asyncFun = () => {
  return new Promise((res) => {
    setTimeout(res, 1000);
  })
}
class Store {
  @observable list = [{
    desc: 'Default',
    is_finished: false,
  }];
  @observable state = 'done';

  // 异步操作的回调是不会被action包装  所以如果开了严格模式在回调里执行修改state的代码会报错
  @action
  add = async (desc) => {
    // asyncFun().then((res) => {
      this.list.push({
        desc,
        is_finished: false,
      });
    // });
    // await asyncFun();
    // runInAction(() => {
    //   this.list.push({
    //     desc,
    //     is_finished: false,
    //   });
    // });
  }
  @action
  update = (index, state) => {
    this.list[index].is_finished = state;
  }
  @action
  remove = (index) => {
    // 这里是直接改的值  所以并不能触发autorun
    this.list.splice(index, 1);

    // const temp =[...this.list];
    // temp.splice(index, 1);
    // this.list = temp;
  }

  @computed get numOfList () {
    return this.list.length;
  }

  // 文档建议 给generator方法命名 方便在开发工具mobx-dev-tool里查看
  fetch = flow(function* fetchTest() {
    this.state = 'loading';
    try {
      yield asyncFun();
      const temp_list = [
        {
          desc: 'TODO 1',
          is_finished: false,
        },
        {
          desc: 'TODO 2',
          is_finished: false,
        },
        {
          desc: 'TODO 3',
          is_finished: false,
        }
      ];
      this.list = [...this.list, ...temp_list];
      this.state = 'done';
    } catch (err) {
      this.state = 'error';
      console.log('error', err);
    }
  }.bind(this));
}
const store = new Store();

when(
  () => store.list.length === 3,
  () => console.log('3条啦'),
);

// 依赖收集
// 原理  Obejct.defineProperty里的get set
autorun(() => {
  // console.log('test list:', store.list);
  console.log('test state:', store.state);
});

export {
  store,
}