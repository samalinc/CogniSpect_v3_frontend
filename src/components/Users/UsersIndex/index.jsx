import React from 'react';
import {
  Input,
  Form,
} from 'reactstrap';
import { UserInput } from 'components';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';
import emailMask from 'text-mask-addons/dist/emailMask';
import { userRoles } from 'utils/constants';

const UsersIndex = React.memo(({ user, onChange }) => {
  const onUserDataChange = (event) => {
    return onChange({
      name: event.target.name,
      value: event.target.value,
    });
  };
  return (
    <Form>
      <UserInput
        icon="cui-tags"
        label="Role"
      >
        <Input
          onChange={onUserDataChange}
          type="select"
          name="role"
        >
          {
            userRoles.map((role) => {
              return (
                <option key={role.key}>{role.value}</option>
              );
            })
          }
        </Input>
      </UserInput>
      <UserInput
        icon="fa fa-user "
        label="First name"
      >
        <Input
          onChange={onUserDataChange}
          name="first_name"
          className="form-control"
        />
      </UserInput>
      <UserInput
        icon="fa fa-user "
        label="Second name"
      >
        <Input
          onChange={onUserDataChange}
          name="second_name"
          className="form-control"
        />
      </UserInput>
      <UserInput
        icon="cui-info"
        label="Login"
        formText="ex. user_name"
      >
        <Input
          onChange={onUserDataChange}
          defaultValue={user.login}
          name="login"
          placeholder="Login"
        />
      </UserInput>
      <UserInput
        icon="fa fa-envelope"
        label="E-mail"
        formText="ex. example@example.com"
      >
        <TextMask
          onChange={onUserDataChange}
          required
          defaultValue={user.email}
          mask={emailMask}
          Component={InputAdapter}
          name="email"
          className="form-control"
        />
      </UserInput>
      <UserInput
        icon="fa fa-key "
        label="Password"
      >
        <Input
          onChange={onUserDataChange}
          type="password"
          name="password"
          className="form-control"
        />
      </UserInput>
      <UserInput
        icon="fa fa-users "
        label="Group"
      >
        <Input
          type="number"
          name="study_group"
          className="form-control"
        />
      </UserInput>
    </Form>
  );
});

UsersIndex.defaultProps = {
  user: {},
};

UsersIndex.displayName = 'UsersIndex';

export default UsersIndex;
