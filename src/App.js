import React from 'react';
import './App.css';
import { TodoList } from './components/TodoListFolder';
import { AddTodo } from './components/AddTodo';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todosList: preparedTodos,
  }

  addTodo = (todo) => {
    this.setState(prevState => (
      {
        todosList: [...prevState.todosList, todo],
      }
    ));
  }

  render() {
    const { todosList } = this.state;

    return (
      <div className="App">

        <AddTodo
          todosList={todosList}
          usersList={users}
          addTodo={this.addTodo}
        />
        <TodoList todos={todosList} />
      </div>
    );
  }
}

// class App extends React.Component {
//   state = {
//     todosList: preparedTodos,
//     title: '',
//     user: '',
//     titleCheck: true,
//     userCheck: true,
//   }

//   handleChange = (e) => {
//     const { name, value } = e.target;

//     this.setState({ [name]: value });
//   }

//   addTodo = () => {
//     const { title, user } = this.state;
//     const user1 = users.find(userEl => userEl.name === user);

//     if (title && user) {
//       this.setState(prevState => (
//         {
//           todosList: [...prevState.todosList,
//             {
//               title: prevState.title,
//               id: prevState.todosList.length + 1,
//               completed: false,
//               user: user1,
//             }],
//         }
//       ));
//       this.clearForm();
//     }

//     if (!title) {
//       this.setState({
//         titleCheck: false,
//       });
//     }

//     if (!user) {
//       this.setState({
//         userCheck: false,
//       });
//     }
//   }

//   clearForm = () => {
//     this.setState({
//       title: '',
//       user: '',
//       titleCheck: true,
//       userCheck: true,
//     });
//   }

//   render() {
//     const { todosList, title, user, titleCheck, userCheck } = this.state;

//     return (
//       <div className="App">
//         <h1>Add todo form</h1>

//         <div className="add form">
//           <form onSubmit={(e) => {
//             e.preventDefault();
//             this.addTodo();
//           }}
//           >
//             <p>Title of todo:</p>
//             {!titleCheck
//               && <p>Add a title, please</p>}
//             <input
//               type="text"
//               name="title"
//               placeholder="Title"
//               value={title}
//               onChange={this.handleChange}
//             />

//             <p>User of todo:</p>
//             {!userCheck
//               && <p>Select a user, please</p>}
//             <select
//               name="user"
//               value={user}
//               onChange={this.handleChange}
//             >
//               <option value="">
//                 Choose a user
//               </option>
//               {users.map(userEl => (
//                 <option key={userEl.id}>{userEl.name}</option>
//               ))}
//             </select>
//             <br />
//             <button
//               type="submit"
//             >
//               To add
//             </button>

//           </form>

//         </div>

//         <TodoList todos={todosList} />
//       </div>
//     );
//   }
// }

export default App;
