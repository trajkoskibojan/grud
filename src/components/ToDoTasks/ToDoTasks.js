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
import withErrorHandler from '../../hoc/withErrorHandler';
import Snackbar from '../Snackbar/Snackbar';


const ToDoTasks = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState('');
  let [snackBar, setsnackBar] = useState(null)
  const [value, setValue] = useState({
    title: { value: '' },
    description: { value: '' },
  });
  const { token, user, loading } = useSelector((state) => {
    return {
      token: state.home.token,
      user: state.home.user,
      loading: state.home.loading,
    };
  });
  const [tasks, setTasks] = useState([]);
  const url = 'http://appointments.draft2017.com/tasks/';

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

      updateItems[index].Title = value.title.value;
      updateItems[index].Description = value.description.value;

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
          setValue({ title: { value: '' }, description: { value: '' } });
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
        Title: value.title.value,
        Description: value.description.value,
        Done: false,
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
          setsnackBar(
            <Snackbar isError="#4caf50" show={true}>
              You add task
            </Snackbar>
          );
          setTasks([...tasks, task]);
          setValue({ title: { value: '' }, description: { value: '' } });
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
    updateValues.title.value = item.Title;
    updateValues.description.value = item.Description;
    setValue(updateValues);
    setEditItem({ ...updateValues, id: id, Done: true, user: user });
    setIsEdit(true);
  };

  return (
    <Container>
      {snackBar}
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
              <th>Done</th>
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
                  done={el.Done}
                  value={el.Title}
                  changed={() => onChangeCheckbox(el.id)}
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

export default withErrorHandler(ToDoTasks, axios);
