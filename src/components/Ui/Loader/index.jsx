import React from 'react';

function Loader(props) {
  if (!props.loaded) {
    return (
      <div className="sk-wave">
        {
          [1, 2, 3, 4, 5].map((item) => {
            return (
              <div
                key={item}
                style={{ background: 'white' }}
                className={`sk-rect sk-rect${item}`}
              />
            );
          })
        }
      </div>
    );
  }
  return props.children;
}

export default Loader;
