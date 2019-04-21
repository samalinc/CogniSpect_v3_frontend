import React, { Fragment, Component } from 'react';
import {
  Nav,
  Button,
} from 'reactstrap';
import {
  DefaultHeaderDropdown,
} from 'components';
import {
  AppSidebarToggler,
  AppAsideToggler,
} from '@coreui/react';

import styles from './styles.module.scss';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      selection,
      isAsideShow,
      isModerator,
      meetingUrl,
    } = this.props;

    return (
      <Fragment>
        {
          !isModerator && (
            <Fragment>
              <AppSidebarToggler
                className="d-lg-none"
                display="md"
                mobile
              />
              <AppSidebarToggler className="d-md-down-none" display="lg" />
            </Fragment>
          )
        }
        {
          (selection && !isModerator) && (
            <div className={styles.navigation}>
              <ConferenceSelection />
              <a
                target="_blank"
                href={`https://opensense-broadcast.herokuapp.com/${meetingUrl}`}
                className="ml-2 btn btn-ghost-primary"
              >
                Open Broadcast App
              </a>
              <a
                target="_blank"
                href={`https://opensense-speaker.herokuapp.com/${meetingUrl}`}
                className="ml-2 btn btn-ghost-primary"
              >
                Open Speaker App
              </a>
            </div>
          )
        }
        <Nav className="ml-auto" navbar>
          <DefaultHeaderDropdown
            isModerator={isModerator}
            accnt
          />
        </Nav>
        {
          isAsideShow && (
            <AppAsideToggler
              className="d-md-down-none"
            />
          )
        }
      </Fragment>
    );
  }
}

export default Header;
