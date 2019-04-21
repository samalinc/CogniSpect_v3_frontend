import React, {
  Component,
} from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { AppSwitch } from '@coreui/react';

import styles from './styles.module.scss';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownOpen: false,
    };

    this.onToggle = ::this.onToggle;
  }

  onToggle() {
    this.setState((prevState) => {
      return {
        isDropdownOpen: !prevState.isDropdownOpen,
      };
    });
  }

  render() {
    const {
      isDropdownOpen,
    } = this.state;

    const {
      options,
      defaultValue,
      selectTitle,
      availableLanguages,
      className,
      name,
      onChange,
    } = this.props;

    return (
      <Dropdown
        isOpen={isDropdownOpen}
        toggle={this.onToggle}
      >
        <DropdownToggle caret>
          { defaultValue || options[0] }
        </DropdownToggle>
        <DropdownMenu className={styles.dropDown}>
          <DropdownItem header>{selectTitle}</DropdownItem>
          {
            Object.keys(options).sort().map((item, iterator) => {
              return (
                <div
                  className={styles.dropdown}
                  name={name || item}
                  key={`${item}-${iterator}`}
                >
                  <strong
                    className={styles.language}
                  >
                    {options[item]}
                  </strong>
                  <AppSwitch
                    onChange={(event) => { return onChange(event, item); }}
                    className="float-right"
                    variant="pill"
                    label
                    checked={availableLanguages.find((langugae) => { return item === langugae.toLowerCase(); })}
                    color="success"
                    size="sm"
                  />
                </div>
              );
            })
          }
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default Select;
