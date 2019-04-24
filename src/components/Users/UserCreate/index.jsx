import React from 'react';
import { UsersIndex } from 'components';
import {
  setUserData,
} from 'redux/actions/users';
import { connect } from 'react-redux';
import { getUser } from 'redux/sagas/users/selectors';

const UserCreate = React.memo(({ setUserData, user }) => {
  return (
    <UsersIndex
      isEdit
      user={user}
      onChange={setUserData}
    />
  );
});

UserCreate.displayName = 'UserCreate';

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
  };
};

export default connect(mapStateToProps, {
  setUserData,
})(UserCreate);
