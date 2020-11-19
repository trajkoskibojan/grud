import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import * as actions from '../../store/actions/';
import { updateObject } from '../../shared/utility';

import closeIcon from '../../assets/icons/close.svg';
import {
  P as Par,
  Svg as SvgClose,
  Button as Btn,
  Transition,
} from '../styled/index';

const Div = styled(Transition)`
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.3);
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const FormSign = styled.form`
  background: #fff;
  padding: 8em 4em 0 4em;
  width: 45rem;
  box-shadow: 0 0 1em #222;
  border-radius: 2px;
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 460px) {
    width: 35rem;
  }
`;

const P = styled(Par)`
  position: relative;
  margin: 0 0 3em 0;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  outline: none;
  margin: 0;
  color: #808080;

  ${({ typePass }) =>
    typePass &&
    css`
      background: #fff;
      border: 1px solid #dbdbdb;
      font-size: 1.3em;
      padding: 0.8em 0.5em;
      border-radius: 2px;
    `}
`;

const Label = styled.label`
  position: absolute;
  left: 8px;
  top: 12px;
  color: #999;
  font-size: 16px;
  display: inline-block;
  padding: 4px 10px;
  font-weight: 400;
  background-color: rgba(255, 255, 255, 0);

  ${({ floatLabel }) =>
    floatLabel &&
    css`
      top: -16px;
      background-color: rgba(255, 255, 255, 0.8);
      font-size: 14px;
    `}
`;

const Svg = styled(SvgClose)`
  position: fixed;
  transform: scale(0.3);
  width: 10rem;
  height: 10rem;
  top: -1.5rem;
  right: -1.5rem;
`;

const Button = styled(Btn)`
  width: 100%;
  font-size: 2.5rem;
  margin-bottom: 3rem;

  &:disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
  }
`;

const Form = () => {
  const error = useSelector((state) => state.home.error);
  const ref = useRef();

  const [valueInput, setValueInput] = useState({
    email: { value: '' },
    password: { value: '' },
    username: { value: '' },
  });

  const show = useSelector((state) => state.home.show);
  const dispatch = useDispatch();

  useEffect(() => {
    function closeModal(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        dispatch(actions.onCloseHandler());
      }
    }
    document.addEventListener('mousedown', closeModal);
    return () => {
      document.removeEventListener('mousedown', closeModal);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  const onChangeHandler = (e) => {
    const updateState = updateObject(valueInput, {
      [e.target.name]: updateObject(valueInput[e.target.name], {
        value: e.target.value,
      }),
    });
    setValueInput(updateState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      actions.auth(
        valueInput.email.value,
        valueInput.password.value,
        valueInput.username.value
      )
    );
    dispatch(actions.onCloseHandler());
  };

  let errrorMessage = null;

  if (error) {
    errrorMessage = <p>Error loading</p>;
  }

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={show}
      timeout={500}
      classNames="fade"
    >
      <Div>
        {errrorMessage}
        <FormSign ref={ref} onSubmit={(e) => submitHandler(e)}>
          <Svg
            path={closeIcon}
            id="3.-To-close"
            onClick={(e) => dispatch(actions.onCloseHandler(e))}
          />

          <P black="#6b6b6b">
            <Label htmlFor="Email" floatLabel>
              Email
            </Label>
            <Input
              typePass
              id="Email"
              name="email"
              type="email"
              required
              onChange={onChangeHandler}
            />
          </P>
          <P black="#6b6b6b">
            <Label htmlFor="password" floatLabel>
              Password
            </Label>
            <Input
              typePass
              id="password"
              name="password"
              type="password"
              required
              onChange={onChangeHandler}
            />
          </P>
          <P black="#6b6b6b">
            <Label htmlFor="username" floatLabel>
              Username
            </Label>
            <Input
              typePass
              id="username"
              name="username"
              type="text"
              required
              onChange={onChangeHandler}
            />
          </P>
          <Button blue type="submit">
            Log in
          </Button>
        </FormSign>
      </Div>
    </CSSTransition>
  );
};

export default Form;
