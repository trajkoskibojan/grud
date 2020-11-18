import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ToDoSingle from './ToDoSingle';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const Container = styled.div`
  width: 60%;
  padding-top: 5rem;
  margin: 0 auto;
`;

const Table = styled.table`
  width: 100%;
  padding: 1rem;
  border: 1px solid grey;

  & tr {
    display: flex;
  }

  & th {
    font-size: 1.5rem;
    width: 25%;
    padding: 1rem;
  }
`;

const Input = styled.input`
  display: block;
  font-size: 18px;
  background-color: #f2f2f2;
  width: 50%;
  padding: 13px 13px 13px 20px;
  box-sizing: border-box;
  color: #2980b9;
  border: 3px solid rgba(0, 0, 0, 0);
  margin-right: 1rem;
`;

const List = styled.div`
  margin: 2rem 0;
`;

const Button = styled.button`
  width: 10rem;
  height: 5.3rem;
  cursor: pointer;
  border: 1px solid #d2d1d1;
`;

const Form = styled.form`
  display: flex;
`;

const ToDoTasks = () => {
  /*  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('data')) || []
  ); */
  /* const dispatch = useDispatch(); */

  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState('');
  const [value, setValue] = useState({
    title: { value: '' },
    description: { value: '' },
  });
  const token = useSelector((state) => state.home.token);
  const [tasks, setTasks] = useState([]);
  const url = 'http://appointments.draft2017.com/tasks';

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data);
        console.log(response);
      })
      .catch((err) => {});
  }, [token, tasks.length]);

  /*  console.log(tasks); */

  /* useEffect(() => {
    localStorage.setItem('data', JSON.stringify(items));
  }, [items]); */

  const onChangeHandler = (e) => {
    setValue({ ...value, [e.target.name]: { value: e.target.value } });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (isEdit) {
      /* setItems([...items, value]);
      setValue('');
      dispatch(actions.task([...items, value])); */
        console.log('hi');
    } else {
      console.log('hello');
      const task = {
        Title: value.title.value,
        Description: value.description.value,
        id: uuid(),
      };
      axios
        .post(url, task, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setTasks([...tasks, task]);
        })
        .catch((err) => {});
    }
  };

  const onDeleteHandler = (id) => {
    //const items = tasks.filter(el => el.id !== id)
    const item = tasks.find((el) => el.id === id);
    console.log(item);
    axios
      .delete(url, item, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //setTasks(items);
        console.log(response);
      })
      .catch((err) => {});
  };

  const onCLickEdit = (id) => {
    const updateValues = { ...value };
    const item = tasks.find((el) => el.id === id);
    updateValues.title.value = item.Title;
    updateValues.description.value = item.Description;
    setValue(updateValues);
    setEditItem(updateValues);
    setIsEdit(true);
  };
console.log(isEdit);
  return (
    <Container>
      <h1>Tasks</h1>
      <Form onSubmit={onSubmitHandler}>
        <Input
          name="title"
          value={value.title.value}
          onChange={onChangeHandler}
          placeholder="Title"
        />
        <Input
          name="description"
          value={value.description.value}
          onChange={onChangeHandler}
          placeholder="Description"
        />
        <Button disabled={value === ''}>Add Task</Button>
      </Form>
      <List>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Created at</th>
              <th>Updated at</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks &&
              tasks.map((el, i) => (
                <ToDoSingle
                  key={i}
                  title={el.Title}
                  description={el.Description}
                  created={el.created_at}
                  updated={el.updated_at}
                  clickDelete={() => onDeleteHandler(el.id)}
                  clickEdit={() => onCLickEdit(el.id)}
                />
              ))}
          </tbody>
        </Table>
      </List>
    </Container>
  );
};

export default ToDoTasks;
