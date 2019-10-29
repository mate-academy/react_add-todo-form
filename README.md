# React add TODO form

## Demo link

Add link here: [DEMO LINK](https://<your_account>.github.io/react_add-todo-form/)


## Task

Implement ability to add TODOs to the `TodoList` implemented in [Static list of todos](https://github.com/mate-academy/react_static-list-of-todos)  

1. Create `App` components storing `todos` array and displaying it with `TodoList`
2. Create `NewTodo` component with a form to add new TODOs 
    - please add labels and placeholders where it is needed
    - each TODO show have a `title` and `userId` selected from a list of given `users` (`./src/api/users.js`)
    - show user names in `<select>`
    - the `TODO` should be added to the list after clicking `Add` button 
    - `App` should add integer `id` to each TODO (starting from `1`)  
3. Clear the form after adding a TODO
4. Add validation to the form 
    - add an empty option `Choose a user` to the users select
    - before creating a user check if a `user` was selected, if not show an error next to `select` (Please choose a user)
    - if a title is empty show an error (Please enter the title)
    - errors should appear only after pressing `Add` button
5. Hide an error immediately when you edit a field with an error 
6. (* Optional) Limit characters displayed in the `title` field. 
  Allow entering `spaces` and alphanumeric (`\w`) characters.


## Workflow

- Fork the repository with task
- Clone forked repository 
    ```bash
    git clone git@github.com:<user_name>/<task_repository>.git
    ```
- Run `npm install` to install dependencies.
- Then develop

## Development mode 

- Run `npm start` to start development server on `http://localhost:3000`
    When you run server the command line window will no longer be available for 
    writing commands until you stop server (`ctrl + c`). All other commands you 
    need to run in new command line window.
- Follow [HTML, CSS styleguide](https://mate-academy.github.io/style-guides/htmlcss.html)
- Follow [the simplified JS styleguide](https://mate-academy.github.io/style-guides/javascript-standard-modified)
- run `npm run lint` to check code style
- When you finished add correct `homepage` to `package.json` and run `npm run deploy` 
- Add links to your demo in readme.md.
  - `[DEMO LINK](https://<your_account>.github.io/<repo_name>/)` - this will be a 
  link to your index.html
- Commit and push all recent changes.
- Create `Pull Request` from forked repo `(<branch_name>)` to original repo 
(`master`).
- Add a link at `PR` to Google Spreadsheets.

## Project structure

- `src/` - directory for css, js, image, fonts files
- `build/` - directory for built pages

You should be writing code in `src/` directory.
