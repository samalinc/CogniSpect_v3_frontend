import React from 'react';
import {
  Input,
  Label,
  InputGroup,
  FormText,
  FormGroup,
  Form,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { TextMask, InputAdapter } from 'react-text-mask-hoc';

const UserInput = React.memo(({
  children, formText, label, icon,
}) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className={icon} />
          </InputGroupText>
        </InputGroupAddon>
        {children}
      </InputGroup>
      {
        formText && (
          <FormText color="muted">
            {formText}
          </FormText>
        )
      }

    </FormGroup>

  );
});

UserInput.displayName = 'UserInput';

export default UserInput;
