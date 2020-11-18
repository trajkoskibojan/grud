import React, { Fragment }  from 'react';
import styled from 'styled-components';

import Button from './Button/Button';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Div = styled.div`
  padding-right: 7.5rem;
  height: 9rem;
  background: white;

  @media (max-width: 1250px) {
    padding-right: 0;
  }
`;

const DivLogo = styled.div`
  height: 9rem;
  width: 25rem;

  img {
    height: 100%;
    width: 100%;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-right: 3.5rem;
`;

const Wrap = styled.div`
  display: flex;
`;

const A = styled(Link)`
  text-decoration: none;
  background-color: red;
  width: 15rem;
  height: 5rem;
  display: inline-block;
  font-size: 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  margin-right: 2rem;
  display: flex;
  align-items:center;
  justify-content: center;
`;


const Navbar = (props) => {
const token = useSelector(state => state.home.token)

  return (
    <Div>
      <Nav>
        <DivLogo>
          <img src={logo} alt="logo" />
        </DivLogo>
        <Wrap>
          {token && (
            <Fragment>
              <A to="/tasks">Tasks</A>
              <A to="/appointments">Appointments</A>
            </Fragment>
          )}
          <Button />
        </Wrap>
      </Nav>
    </Div>
  );
};

export default Navbar;
