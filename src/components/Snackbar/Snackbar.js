import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  color: #fff;
  font-weight: 500;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  width: 20%;
  margin: 0 auto;
  border-radius: 5px;
  position: fixed;
  bottom: 3%;
  left: 3%;
  opacity: ${(p) => (p.show ? '1' : '0')};
  background-color: ${(p) => p.isError};
  transition: all .3s;
`;

const Snackbar = (props) => {
  return (
    <Wrap
      isError={props.isError}
      show={props.show}
    >
      {props.children}
    </Wrap>
  );
};

export default Snackbar;
