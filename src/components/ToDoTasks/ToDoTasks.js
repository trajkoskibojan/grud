import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ToDoSingle from './ToDoSingle';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { Container, Table, Input, List, Buttonlist, Form } from '../styled/index';


const ToDoTasks = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState('');
  const [value, setValue] = useState({
    title: { value: '' },
    description: { value: '' },
  });
  const { token, user, loading } = useSelector((state) => {
    return {
      token: state.home.token,
      user: state.home.user,
      loading: state.home.loading
    };
  });
  const [tasks, setTasks] = useState([]);
  const url = 'http://appointments.draft2017.com/tasks/';

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => {});
  }, [token, tasks.length, isEdit]);

  const onChangeHandler = (e) => {
    setValue({ ...value, [e.target.name]: { value: e.target.value } });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (isEdit) {
      const index = tasks.findIndex((el) => el.id === editItem.id);
      const updateItems = [...tasks]

      updateItems[index].Title = value.title.value;
      updateItems[index].Description = value.description.value;

      axios
        .put(
          url + editItem.id,
          updateItems[index],
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setTasks(updateItems);
          setValue({ title: { value: '' }, description: { value: '' } })
          setIsEdit(false);
        })
        .catch((err) => {});
    } else {
      const task = {
        Title: value.title.value,
        Description: value.description.value,
        Done: true,
        user: user,
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
          setValue({ title: { value: '' }, description: { value: '' } });
        })
        .catch((err) => {});
    }
  };

  const onDeleteHandler = (id) => {
    const items = tasks.filter((el) => el.id !== id);
    axios
      .delete(url + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasks(items);
      })
      .catch((err) => {});
  };

  const onCLickEdit = (id) => {
    const updateValues = { ...value };
    const item = tasks.find((el) => el.id === id);
    updateValues.title.value = item.Title;
    updateValues.description.value = item.Description;
    setValue(updateValues);
    setEditItem({ ...updateValues, id: id, Done: true, user: user });
    setIsEdit(true);
  };

  return (
    <Container>
      <h1>Tasks</h1>
      {loading && <h1>Loading...</h1>}
      <Form onSubmit={onSubmitHandler}>
        <Input
          type="text"
          name="title"
          value={value.title.value}
          onChange={onChangeHandler}
          placeholder="Title"
        />
        <Input
          type="text"
          name="description"
          value={value.description.value}
          onChange={onChangeHandler}
          placeholder="Description"
        />
        <Buttonlist
          disabled={value.title.value === '' || value.description.value === ''}
        >
          {!isEdit ? 'Add Task' : 'Update Task'}
        </Buttonlist>
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
