import './TodoInfo.scss';
import { FC, memo } from 'react';
import { Form } from 'react-bootstrap';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Omit<Todo, 'userId'>;
}

export const TodoInfo: FC<Props> = memo(
  ({ todo }) => {
    const {
      user, todoId, title, completed,
    } = todo;

    return (
      <div className="
        TodoInfo
        d-flex
        justify-content-between
        align-items-center
        "
      >
        <div
          className="TodoInfo__title d-flex align-items-center"
        >
          <FormCheckLabel
            className="TodoInfo__title-text d-flex align-items-center"
          >
            <Form className="me-3">
              <Form.Check
                className="TodoInfo__check"
                id={String(todoId)}
                defaultChecked={completed}
              />
            </Form>

            {title}
          </FormCheckLabel>
        </div>

        {user && <UserInfo user={user} />}
      </div>
    );
  },
);
