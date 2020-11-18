import React, { Component } from 'react';
import styled from 'styled-components';
import ToDoList from '../ToDoList';

const Container = styled.div`
  width: 360px;
  margin: 100px auto;
  background: #f7f7f7;
  box-shadow: 0 0 3px rgba(0,0,0,0.1);
`;

const H1 = styled.h1`
  background-color: #313239;
  color: #ffffff;
  margin: 0;
  padding: 12px 20px;
  text-transform: uppercase;
  font-size: 24px;

  & .fa-toggle-on {
    float: right;
  }
`;

const Input = styled.input`
  display: block;
  font-size: 18px;
  background-color: #f2f2f2;
  width: 100%;
  padding: 13px 13px 13px 20px;
  box-sizing: border-box;
  color: #2980b9;
  border: 3px solid rgba(0, 0, 0, 0);

  &:focus {
    background: #fff;
    border: 3px solid #313239;
    outline: none;
  }
`;

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;



const ToDo = ({show})  => {


    return (
      <Container>
        <H1>
          To-Do List
          <i
            className="fa fa-toggle-on"
            id="kopce"
            aria-hidden="true"
            /* onClick={this.showHandler} */
          ></i>
        </H1>
        {show && (
          <Input
            type="text"
            placeholder="Add New Todo"
            value={this.state.value}
            /* onChange={(e) => this.setState({ value: e.target.value })}
            onKeyUp={(e) => this.addTodoHandler(e)} */
          />
        )}
        <Ul>
          <ToDoList items={this.state.items} /* deleteItem={deleteHandler} */ />
        </Ul>
      </Container>
    );

}

export default ToDo;
