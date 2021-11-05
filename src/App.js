import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useApi from './components/hooks/api-task';


function App() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);



  const { sendRequest: fetchTasks, loading: isLoading, error } = useApi();

  // const fetchTasks = (taskText) => {
  //   // setIsLoading(true);

  //   // try {
  //   //   const response = await fetch(
  //   //     'https://react-http-76887-default-rtdb.firebaseio.com/task.json'
  //   //   );

  //   //   if (!response.ok) {
  //   //     throw new Error('Request failed!');
  //   //   }

  //   //   const data = await response.json();

  //   //   const loadedTasks = [];

  //   //   for (const taskKey in data) {
  //   //     loadedTasks.push({ id: taskKey, text: data[taskKey].text });
  //   //   }

  //   //   setTasks(loadedTasks);
  //   // } catch (err) {
  //   //   setError(err.message || 'Something went wrong!');
  //   // }
  //   // setIsLoading(false);
  // };

  useEffect(() => {
    const dataTransform = (data) => {
      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    }

    fetchTasks({ url: 'Your firebase URL' }, dataTransform);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
