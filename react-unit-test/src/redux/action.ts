import { ITodo } from './reducer'

let nextId = 0;

export enum ActionTypes {
  ADD_TODO = 'TODO/ADD',
  TOGGLE_TODO = 'TODO/TOGGLE',
  REMOVE_TODO = 'TODO/REMOVE'
}

export interface AddTodoAction { type: ActionTypes.ADD_TODO, payload: { todo: ITodo }}
export interface ToggleTodoAction { type: ActionTypes.TOGGLE_TODO, payload: { todoId: number }}

export function addTodo(name:string): AddTodoAction {
  return {
    type: ActionTypes.ADD_TODO,
    payload: {
      todo: {
        id: nextId++,
        name: name,
        done: false
      }
    }
  }
}
export function toggleTodo(todoId: number): ToggleTodoAction {
  return { type: ActionTypes.TOGGLE_TODO, payload: { todoId } }
}

export type Action = AddTodoAction | ToggleTodoAction