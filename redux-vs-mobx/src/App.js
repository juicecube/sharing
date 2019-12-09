import React from 'react';
import { inject, observer } from 'mobx-react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { add, remove, update } from './store/redux';

@inject('store')
@observer
class App extends React.Component {
  addList = () => {
    // 可以直接修改
    // this.props.store.list.push({
    //   desc: this.input.value,
    //   is_finished: false,
    // });
    this.props.store.add(this.input.value);
    this.input.value = '';
  }
  render () {
    return <div>
      {
        this.props.store.list.map((val, key) => <div key={key} onClick={this.props.store.update.bind(this, key, !val.is_finished)}>
          <span>{val.desc}</span>
          <input type="checkbox" checked={val.is_finished} />
          <button onClick={(e) => {
            this.props.store.remove(key);
            e.stopPropagation();
          }}>删除</button>
        </div>)
      }
      {
        <p>共有{this.props.store.numOfList}条待做</p>
      }
      <div>
        <input ref={e => this.input = e}/>
        <button onClick={this.addList}>添加</button>
      </div>
      <button onClick={this.props.store.fetch}>查询</button>
      <span>查询状态：{this.props.store.state}</span>
    </div>;
  }
}

export default App;

// const mapStateToProps = state => ({
//   list: state.todo,
// });
// const mapDispatchToProps = dispatch => bindActionCreators({
//   add,
//   update,
//   remove,
// }, dispatch);

// export const  AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);