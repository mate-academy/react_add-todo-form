import React from 'react';
import TodoItem from './TodoItem';
import NewTodo from './NewTodo';
import users from './api/users';
import todos from './api/todos';
import GetTodosWithUsers from './GetTodosWithUsers';

class TodoList extends React.Component {
  state = { getTodos: GetTodosWithUsers(todos, users) }

 addTodo = (todo) => {
   this.setState(state => ({
     getTodos: [...state.getTodos, {
       ...todo,
       user: users.find(user => user.id === todo.userId),
     }],
   }));
 }

 render() {
   const { getTodos } = this.state;

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
           {getTodos.map(todo => (
             <TodoItem todo={todo} key={todo.id} />
           ))}
         </tbody>
       </table>
     </>
   );
 }
}

export default TodoList;
