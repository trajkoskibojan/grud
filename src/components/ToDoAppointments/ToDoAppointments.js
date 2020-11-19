import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ToDoSingle from './ToDoSingle';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import {
  Container,
  Table,
  Input,
  List,
  Buttonlist,
  Form,
} from '../styled/index';
import Snackbar from '../Snackbar/Snackbar';

const ToDoAppointments = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState('');
  let [snackBar, setsnackBar] = useState(null);
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
    let id;
    if (snackBar !== null) {
      id = setTimeout(() => {
        setsnackBar(null);
      }, 2500);
    }

    return () => {
      id && clearTimeout(id);
    };
  }, [snackBar]);

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
      .catch((err) => {
        setsnackBar(
          <Snackbar isError="#f44336" show={true}>
            {err ? err.message : null}
          </Snackbar>
        );
      });
  }, [token, tasks.length, isEdit]);

  const onChangeCheckbox = (id) => {
    const updateTasks = [...tasks];
    const index = tasks.findIndex((el) => el.id === id);
    updateTasks[index].Done = !updateTasks[index].Done;

    axios
      .put(url + id, updateTasks[index], {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setsnackBar(
          updateTasks[index].Done ? (
            <Snackbar isError="#4caf50" show={true}>
              You mark your appointment as done
            </Snackbar>
          ) : (
            <Snackbar isError="#f44336" show={true}>
              You unmark your appointment
            </Snackbar>
          )
        );
        setTasks(updateTasks);
      })
      .catch((err) => {
        setsnackBar(
          <Snackbar isError="#f44336" show={true}>
            {err ? err.message : null}
          </Snackbar>
        );
      });
  };

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
        .put(url + editItem.id, updateItems[index], {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setsnackBar(
            <Snackbar isError="#4caf50" show={true}>
              You update your task
            </Snackbar>
          );
          setTasks(updateItems);
          setValue({
            date: { value: '' },
            hours: { value: '' },
            time: { value: '' },
            title: { value: '' },
          });
          setIsEdit(false);
        })
        .catch((err) => {
          setsnackBar(
            <Snackbar isError="#f44336" show={true}>
              {err ? err.message : null}
            </Snackbar>
          );
        });
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
          setsnackBar(
            <Snackbar isError="#4caf50" show={true}>
              You add task
            </Snackbar>
          );
          setTasks([...tasks, task]);
          setValue({
            date: { value: '' },
            hours: { value: '' },
            time: { value: '' },
            title: { value: '' },
          });
        })
        .catch((err) => {
          setsnackBar(
            <Snackbar isError="#f44336" show={true}>
              {err ? err.message : null}
            </Snackbar>
          );
        });
    }
  };

  const onDeleteHandler = (id) => {
    const items = tasks.filter((el) => el.id !== id);
    // eslint-disable-next-line no-restricted-globals
    let answer = confirm('Are you sure you want to Delete your task!');
    if (answer === true) {
      axios
        .delete(url + id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setsnackBar(
            <Snackbar isError="#f44336" show={answer === true}>
              You delete your task
            </Snackbar>
          );
          setTasks(items);
        })
        .catch((err) => {
          setsnackBar(
            <Snackbar isError="#f44336" show={true}>
              {err ? err.message : null}
            </Snackbar>
          );
        });
    }
    return;
  };

  const onCLickEdit = (id) => {
    const updateValues = { ...value };
    const item = tasks.find((el) => el.id === id);
    updateValues.date.value = item.Date;
    updateValues.hours.value = item.Hours;
    updateValues.time.value = item.Time;
    updateValues.title.value = item.Title;
    setValue(updateValues);
    setEditItem({ ...updateValues, id: id });
    setIsEdit(true);
  };

  return (
    <Container>
      {snackBar}
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
              <th>Done</th>
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
                  done={el.Done}
                  value={el.Title}
                  changed={() => onChangeCheckbox(el.id)}
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
