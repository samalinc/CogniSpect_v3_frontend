import React from 'react';
import PropTypes from 'prop-types';
import {
  PollTypes,
  PollCreateForm,
} from 'components';
import {
  Row,
  Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  setPollData,
  resetPollData,
  addPollAnswer,
  setCorrectAnswer,
} from 'redux/actions/poll';

const PollCreate = React.memo(({
  setPollData, resetPollData, poll,
  addPollAnswer, setCorrectAnswer,
}) => {
  const params = new URLSearchParams(location.search);
  const type = params.get('type');
  const colourStyles = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: '#515b65',
        outline: 'none',
        borderColor: '#23282c; !important',
        cursor: 'pointer',
        paddingLeft: '10px !important',
        marginBottom: '15px',
        '&:hover': {
          borderColor: '#23282c',
        },
      };
    },
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: '#3a4149',
        color: 'secondary',
        cursor: 'pointer',
        textAlign: 'center',
        borderBottom: '1px solid #23282c',
        padding: '10px !important',
        zIndex: '1000',
        '&:hover': {
          transition: '170 ms easi-in',
          opacity: '0.8',
        },
      };
    },
    input: () => {
      return {
        backgroundColor: 'none',
        outline: 'none !important',
      };
    },
    placeholder: (styles) => {
      return {
        ...styles,
      };
    },
    menuList: (styles) => {
      return {
        zIndex: '1000',
        backgroundColor: '#3a4149',
        ...styles,
      };
    },
    singleValue: (styles) => {
      return {
        ...styles,
        backgroundColor: 'none',
        color: 'secondary',
      };
    },
  };

  const onDataChange = (event) => {
    const {
      name,
      value,
    } = event.target;
    return setPollData({
      name,
      value,
    });
  };
  return (
    <Row>
      <Col xs="8">
        <PollCreateForm
          poll={poll}
          onDataChange={onDataChange}
          resetData={resetPollData}
          colourStyles={colourStyles}
          addPollAnswer={addPollAnswer}
          setCorrectAnswer={setCorrectAnswer}
        />
      </Col>
      <Col xs="4">
        <PollTypes
          questionType={type}
        />
      </Col>
    </Row>
  );
});

PollCreate.propTypes = {
  setPollData: PropTypes.func,
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {
  setPollData,
  resetPollData,
  addPollAnswer,
  setCorrectAnswer,
})(PollCreate);
