import { combineReducers } from 'redux';
import { Action, ActionTypes} from './action';

export interface ITodo {
  id: number;
  name: string;
  done: boolean
}

export interface ITodoState {
  readonly todos: ITodo[]
}

export const initialState: ITodoState = {
  todos: []
}

const todoReducer = (state:ITodoState = initialState, action:Action) => {
  switch(action.type) {
    case ActionTypes.ADD_TODO: {
      const todo = action.payload.todo
      return {
        ...state,
        todos: [...state.todos, todo],
      }
    }
    case ActionTypes.TOGGLE_TODO: {
      const { todoId } = action.payload
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === todoId ?  { ...todo, done: !todo.done} : todo )
      }
    }
    default: {
      return state
    }
  }
}


export interface IState {
  todos: ITodoState
}
export default combineReducers({
  todos: todoReducer,

});