import React from 'react';
import { UsersIndex } from 'components';
import { setUserData } from 'redux/actions/users';
import { connect } from 'react-redux';

const UserCreate = React.memo(({ setUserData }) => {
  return (
    <UsersIndex
      onChange={setUserData}
    />
  );
});

UserCreate.displayName = 'UserCreate';

export default connect(null, {
  setUserData,
})(UserCreate);
