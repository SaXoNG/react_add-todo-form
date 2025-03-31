import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function creatingToDoId(todos: Todo[]) {
  const copyOfTodos = [...todos];
  const sortedTodosById = copyOfTodos.sort(
    (todo1, todo2) => todo1.id - todo2.id,
  );

  return sortedTodosById[todos.length - 1].id + 1;
}

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectUserError, setSelectUserError] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);
  const [users] = useState(usersFromServer);

  const addTodo = (movie: Todo) => {
    setTodos([...todos, movie]);
  };

  const newTodo: Todo = {
    id: creatingToDoId(todos),
    title: title,
    completed: false,
    userId: users[selectedUser].id,
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (title && selectedUser) {
      setTitleError(false);
      setSelectUserError(false);
      addTodo(newTodo);
      setTitle('');
      setSelectedUser(0);
    } else {
      setTitleError(!title);
      setSelectUserError(selectedUser === 0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            id="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => setSelectedUser(+event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {selectUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleAdd}>
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />

      {/* <section className="TodoList">
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="15" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="2" className="TodoInfo">
          <h2 className="TodoInfo__title">
            quis ut nam facilis et officia qui
          </h2>

          <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
            Patricia Lebsack
          </a>
        </article>
      </section> */}
    </div>
  );
};
