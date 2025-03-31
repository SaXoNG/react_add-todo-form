import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { User } from '../../types/User';

type Props = {
  todos: Todo[];
  users: User[];
};

function findUser(userId: number, users: User[]) {
  return users.find(user => user.id === userId) || null;
}

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const findedUser = findUser(todo.userId, users);

        return <TodoInfo todo={todo} user={findedUser} key={todo.id} />;
      })}
    </section>
  );
};
