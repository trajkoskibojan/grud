import React, { useState } from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Li = styled.li`
  color: #666;
  height: 40px;
  line-height: 40px;
  background-color: #fff;

  &:nth-child(2n) {
    background: #f2f2f2;
  }

  &:hover span {
    width: 40px;
    opacity: 1;
    cursor: pointer;
  }
`;

const Span = styled.span`
  background: #e74c3c;
  height: 40px;
  margin-right: 20px;
  text-align: center;
  color: white;
  width: 0;
  display: inline-block;
  transition: 0.2s linear;
  opacity: 0;
`;

const ToDoList = ({ item, deleteItem }) => {

const [items, setItems] = useState([
  {
    id: 0,
    title: 'Clean room',
  },
  {
    id: 1,
    title: 'Go to the gym',
  },
  {
    id: 2,
    title: 'learn javascript',
  },
]);

  return (
    <Ul>
      {items.map((item, index) => (
        <Li className="el" key={index}>
          <Span className="trash" /* onClick={() => deleteItem(index)} */>
            <i className="fa fa-trash"></i>
          </Span>
          {item.title}
        </Li> 
      ))}
    </Ul>
  );
};

export default ToDoList;
