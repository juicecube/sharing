import React from 'react';
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
export default () => {
  return (
    <div className="todos">
      <AddTodo/>
      <TodoList/>
    </div>
  )
}