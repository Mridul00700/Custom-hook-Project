// import { useState } from 'react';
import useApi from '../hooks/api-task';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { sendRequest: sendTaskRequest, loading: isLoading, error } = useApi();

  const createTask = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }


  const enterTaskHandler = (taskText) => {


    sendTaskRequest({
      url: 'Your Firebase URL',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: { text: taskText }
    }, createTask.bind(null, taskText)); // Pre-configuring the createTask to include taskText
    // setIsLoading(true);
    // setError(null);
    // try {
    //   const response = await fetch(
    //     'Your firebase URL',
    //     {
    //       method: 'POST',
    //       body: JSON.stringify({ text: taskText }),
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error('Request failed!');
    //   }

    //   const data = await response.json();

    //   const generatedId = data.name; // firebase-specific => "name" contains generated id
    //   const createdTask = { id: generatedId, text: taskText };

    //   props.onAddTask(createdTask);
    // } catch (err) {
    //   setError(err.message || 'Something went wrong!');
    // }
    // setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
