import { createStore } from 'redux';

// actions
export const add = (todo) => ({
  type: 'add',
  todo,
});
export const update = (index, state) => ({
  type: 'update',
  index,
  state,
});
export const remove = (index) => ({
  type: 'remove',
  index,
});

// reducers
const todo = (state =[], action) => {
  switch(action.type) {
    case 'add':
      return [
        ...state,
        action.todo,
      ];
    case 'update':
      let temp = [...state];
      temp[action.index].is_finished = action.state;
      return temp;
    case 'remove':
      let temp = [...state];
      temp.splice(action.index, 1);
      return temp;
    default:
      return state;
  }
}

export const store = createStore(todo);