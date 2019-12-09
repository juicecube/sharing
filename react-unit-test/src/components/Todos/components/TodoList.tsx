import React from 'react';
import { connect } from 'react-redux'
import { IState, ITodo } from '../../../redux/reducer'
import { toggleTodo } from '../../../redux/action'

interface IProps {
  todos: ITodo[],
  onTodoClicked: (todoId: number) => void
}
const TodoList = (props:IProps) => {
  const { todos, onTodoClicked } = props;
  
  return (
    <ul>
        {
          todos.map(todo => (
            <li key={todo.id}
              onClick={() => onTodoClicked(todo.id)}
              style={{ textDecoration: `${todo.done ? 'line-through' : ''}`, cursor: 'pointer' }}>
              {todo.name}
            </li>)
          )
        }
      </ul>
  )
}

const mapStateToProps = (state: IState) => {
  return {
    todos: state.todos.todos
  }
}
const mapDispatchToProps = (dispatch:any) => {
  return {
    onTodoClicked: (id:number) => {
      dispatch(toggleTodo(id))
    }   
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

