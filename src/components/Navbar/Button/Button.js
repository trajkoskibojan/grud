import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../../../store/actions/';
import { Button as Btn } from '../../styled/';

const Button = (props) => {
  const token = useSelector(state => state.home.token)
  const dispatch = useDispatch();

  const redirect = () => {
      props.history.push('/')
  };
  
  return (
    <Btn blue onClick={(e) => { dispatch(actions.onOpenHandler(e)); redirect() }} >
      {token ? 'Log out' : 'Log in'}
    </Btn>
  );
};

export default withRouter(Button);
