import React, {
  Component,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ReactComponent as UserProfile } from './images/user.svg';

import styles from './styles.module.scss';

const propTypes = {
  accnt: PropTypes.bool,
};
const defaultProps = {
  accnt: false,
};

class DefaultHeaderDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }


  dropAccnt() {
    const {
      dropdownOpen,
    } = this.state;

    const {
      isModerator,
    } = this.props;

    return (
      <Dropdown
        nav
        isOpen={dropdownOpen}
        toggle={this.onToggle}
      >
        <DropdownToggle nav>
          <UserProfile
            className="img-avatar"
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            header
            tag="div"
            className="text-center"
          >
            <strong className="text-white">Account</strong>
          </DropdownItem>
          {
            !isModerator && (
              <Fragment>
                <Link to="/meetings">
                  <DropdownItem className={styles.navAsideItem}>
                    <i className="fa icon-calendar" />
                    <span className="text-white">Meeting</span>
                  </DropdownItem>
                </Link>
                <Link to="/themes">
                  <DropdownItem className={styles.navAsideItem}>
                    <i className="fa cui-drop" />
                    <span className="text-white">Themes</span>
                  </DropdownItem>
                </Link>
                <Link to="/domains">
                  <DropdownItem className={styles.navAsideItem}>
                    <i className="fa icon-globe" />
                    <span className="text-white">Domains</span>
                  </DropdownItem>
                </Link>
              </Fragment>
            )
          }

          <Link to="/login">
            <DropdownItem>
              <i className="fa fa-lock" />
              <span className="text-white">Logout</span>
            </DropdownItem>
          </Link>
        </DropdownMenu>
      </Dropdown>
    );
  }


  render() {
    const {
      accnt,
    } = this.props;
    return (
      accnt && this.dropAccnt()
    );
  }
}

DefaultHeaderDropdown.propTypes = propTypes;
DefaultHeaderDropdown.defaultProps = defaultProps;

const mapStatToProps = (state) => {
  return {
  };
};

export default connect(mapStatToProps, {
})(DefaultHeaderDropdown);


