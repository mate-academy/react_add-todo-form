import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';

const todosToRender = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
 state = {
   todo: '',
   id: todosToRender.map(todo => todo.id).length + 1,
   user: '',
   userError: false,
   titleError: false,
 }

 getValue = (event) => {
   const { name, value } = event.target;

   this.setState({
     [name]: value,
     userError: false,
     titleError: false,
   });
 }

 addTodo = (event) => {
   const { todo, id, user } = this.state;

   event.preventDefault();

   if (user && todo) {
     todosToRender.push({
       title: todo,
       id,
       user: users.find(usr => usr.name === this.state.user),
     });
   }

   if (!user) {
     this.setState({
       userError: true,
     });
   }

   if (!todo) {
     this.setState({
       titleError: true,
     });
   }

   this.setState(prevState => ({
     todo: '',
     id: prevState.id + 1,
   }));
 }

 render() {
   const { todo, user, userError, titleError } = this.state;

   return (
     <div className="App">
       <h1>Add todo form</h1>

       <p>
         <span>Users: </span>
         {users.length}
       </p>

       <form onSubmit={this.addTodo}>
         {userError
         && <h3>Please choose a user</h3>
         }

         <select
           name="user"
           id=""
           value={user}
           onChange={this.getValue}
         >
           <option value="">
             Choose a user
           </option>

           {users.map(userFromList => (
             <option key={userFromList.id}>
               {userFromList.name}
             </option>
           ))}
         </select>

         {titleError
           && <h3>Please enter the title</h3>
         }

         <input
           type="text"
           name="todo"
           placeholder="Please, write your todo"
           value={todo}
           onChange={this.getValue}
         />

         <button
           type="submit"
         >
           Add
         </button>
       </form>

       <TodoList todos={todosToRender} />
     </div>
   );
 }
}

export default App;
