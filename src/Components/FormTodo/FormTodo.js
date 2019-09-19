// import React from 'react';



// class FormTodo extends React.Component {
//   state = {
//     usersSelected: users,
//     selectUser: '',
//     taskUser: '',
//     errorShow: '',
//     names: usersList.map(item => item.user.name),
//     tasks: usersList.map(item => item.title),
//   };

//   addUser = (event) => {
//     this.setState({
//       selectUser: event.target.value,
//     });
//   }

//   addToDo = (event) => {
//     this.setState({
//       taskUser: event.target.value,
//     });
//   }

//   buttonClick = (event) => {
//     event.preventDefault();
//     if (this.state.taskUser.length > 0 && this.state.selectUser.length > 3) {
//       this.setState(prevState => ({
//         tasks: [...prevState.tasks, prevState.taskUser],
//         names: [...prevState.names, prevState.selectUser],
//         selectUser: '',
//         taskUser: '',
//         errorShow: '',
//       }));
//     } else {
//       this.setState({
//         errorShow: 'required to fill in the field',
//       });
//     }
//   };

//   render() {
//     return (
//       <div className="App">
//         <h1>Static list of todos</h1>
//         <span>ToDo: </span>
//         <form onSubmit={this.buttonClick}>
//           <input type="text" onChange={this.addToDo} value={this.state.taskUser} placeholder={this.state.errorShow} />
//           <p>
//             <span>Users:</span>
//             <select onChange={this.addUser} value={this.state.selectUser}>
//               <option>...</option>
//               {this.state.usersSelected.map(item => <option>{item.name}</option>)}
//             </select>
//             <p className="error">{this.state.errorShow}</p>
//             <button type="submit">
//               Add
//             </button>
//           </p>
//         </form>
//         <div>
//           {this.state.tasks.map((item, index) => <div><span><strong> Task: </strong> {item} Name: {this.state.names[index]}</span></div>)}
//         </div>
//       </div>
//     );
//   }
// }

// export default FormTodo;
