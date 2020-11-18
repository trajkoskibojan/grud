import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ToDoSingle from './ToDoSingle';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { Container, Table, Input, List, Buttonlist, Form } from '../styled/index';

const ToDoAppointments = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState('');
  const [value, setValue] = useState({
    date: { value: '' },
    hours: { value: '' },
    time: { value: '' },
    title: { value: '' },
  });
  const { token, email, loading } = useSelector((state) => {
    return {
      token: state.home.token,
      email: state.home.email,
      loading: state.home.loading,
    };
  });
  const [tasks, setTasks] = useState([]);
  const url = 'http://appointments.draft2017.com/appointments/';

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
      const updateItems = [...tasks];

      updateItems[index].Date = value.date.value;
      updateItems[index].Hours = parseFloat(value.hours.value);
      updateItems[index].Time = value.time.value;
      updateItems[index].Title = value.title.value;

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
          setValue({
            date: { value: '' },
            hours: { value: '' },
            time: { value: '' },
            title: { value: '' },
          });
          setIsEdit(false);
        })
        .catch((err) => {});
    } else {
      const task = {
        Date: value.date.value,
        Hours: parseFloat(value.hours.value),
        Time: value.time.value,
        Title: value.title.value,
        Email: email,
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
          setValue({
            date: { value: '' },
            hours: { value: '' },
            time: { value: '' },
            title: { value: '' },
          });
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
    updateValues.date.value = item.Date;
    updateValues.hours.value = item.Hours;
    updateValues.time.value = item.Time;
    updateValues.title.value = item.Title;
    setValue(updateValues);
    setEditItem({ ...updateValues, id: id});
    setIsEdit(true);
  };

  return (
    <Container>
      <h1>Tasks</h1>
      {loading && <h1>Loading...</h1>}
      <Form onSubmit={onSubmitHandler}>
        <Input
          type="date"
          name="date"
          value={value.date.value}
          onChange={onChangeHandler}
          placeholder="Date"
        />
        <Input
          type="number"
          name="hours"
          value={value.hours.value}
          onChange={onChangeHandler}
          placeholder="Hours"
        />
        <Input
          type="time"
          name="time"
          value={value.time.value}
          onChange={onChangeHandler}
          placeholder="Time"
        />
        <Input
          name="title"
          value={value.title.value}
          onChange={onChangeHandler}
          placeholder="Title"
        />
        <Buttonlist
          style={{ width: '30rem', height: '5.7rem' }}
          disabled={
            value.date.value === '' ||
            value.hours.value === '' ||
            value.time.value === '' ||
            value.title.value === ''
          }
        >
          {!isEdit ? 'Add Task' : 'Update Task'}
        </Buttonlist>
      </Form>
      <List>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Hours</th>
              <th>Time</th>
              <th>Title</th>
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
                  date={el.Date}
                  hours={el.Hours}
                  time={el.Time}
                  title={el.Title}
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

export default ToDoAppointments;
