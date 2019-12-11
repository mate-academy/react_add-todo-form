import React from 'react';
import TodoItem from './TodoItem';
import NewTodo from './NewTodo';
import users from './api/users';
import todos from './api/todos';
import GetTodosWithUsers from './GetTodosWithUsers';

class TodoList extends React.Component {
  state = { Todos: GetTodosWithUsers(todos, users) }

 addTodo = (todo) => {
   this.setState(state => ({
     Todos: [...state.Todos, {
       ...todo,
       user: users.find(user => user.id === todo.userId),
     }],
   }));
 }

 render() {
   const { Todos } = this.state;

   return (
     <>
       <NewTodo addTodo={this.addTodo} />
       <table className="App">
         <thead>
           <tr className="head">
             <td>ID</td>
             <td>Title</td>
             <td>User name</td>
             <td>Status</td>
           </tr>
         </thead>
         <tbody>
           {Todos.map(todo => (
             <TodoItem todo={todo} key={todo.id} />
           ))}
         </tbody>
       </table>
     </>
   );
 }
}

export default TodoList;
