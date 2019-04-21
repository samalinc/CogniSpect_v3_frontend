import React, { Fragment } from 'react';

const defaultProps = {};

function Footer() {
  return (
    <Fragment>
      <div>
        <span> &copy; 2018</span>
        <a href="https://opensense.io">Open Sense </a>
      </div>
      <div className="ml-auto">
        <span>Open Sense</span>
      </div>
    </Fragment>
  );
}

Footer.defaultProps = defaultProps;

export default Footer;
