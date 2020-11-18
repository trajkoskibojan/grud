import React from 'react'
import styled from 'styled-components';


const Button = styled.button`
  width: 8rem;
  height: 3rem;
  margin: 1rem;
  cursor: pointer;
`;

const Tr = styled.tr`
  border-top: 1px solid grey;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  padding: 1rem;

  & td {
    width: 25%;
    text-align: center;
    word-wrap: break-word;
  }
`;

const ToDoSingle = ({
  date, 
  hours, 
  time,
  title,
  created,
  updated,
  clickDelete,
  clickEdit,
}) => {
  return (
      <Tr>
        <td>{date}</td>
        <td>{hours}</td>
        <td>{time}</td>
        <td>{title}</td>
        <td>{created}</td>
        <td>{updated}</td>
        <td>
          <Button onClick={clickDelete}>Delete</Button>
        </td>
        <td>{<Button onClick={clickEdit}>Edit</Button>}</td>
      </Tr>
  );
};

export default ToDoSingle