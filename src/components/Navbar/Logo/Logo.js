import React from 'react';
import styled from 'styled-components';
import { Link } from 'components/styled';
import logo from '../../../assets/logo.png';


const DivLogo = styled.div`
  height: 9rem;
  width: 25rem;

  img {
    height: 100%;
    width: 100%;
  }
`;

const Logo = ({open}) => {
  return (
    <DivLogo>
  
          <img src={logo} alt="logo" />
      </Link>
    </DivLogo>
  );
}

export default Logo
