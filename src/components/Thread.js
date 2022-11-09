import * as React from 'react';

const Thread = ({title}) => {
  return (
    <li className="thread-item"><a href="#root">{title}</a></li>
  );
};

export default Thread;