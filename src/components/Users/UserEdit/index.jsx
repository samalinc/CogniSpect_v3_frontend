import React from 'react';
import { UsersIndex } from 'components';
import {
  setUserData,
} from 'redux/actions/users';
import { connect } from 'react-redux';
import { getUser } from 'redux/sagas/users/selectors';

const UserEdit = React.memo(({ setUserData, user }) => {
  return (
    <UsersIndex
      user={user}
      onChange={setUserData}
    />
  );
});

UserEdit.displayName = 'UserEdit';

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
  };
};

export default connect(mapStateToProps, {
  setUserData,
})(UserEdit);
