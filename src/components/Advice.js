import React, { useEffect, useState, useRef } from 'react';
import Card from './Card';
import classes from './Advice.module.css';
import useHttp from '../hooks/use-Http';
import { useQuery } from 'react-query';

const Advice = () => {
  const [tasks, setTasks] = useState();
  const [id, setId] = useState(Math.floor(Math.random() * 100));
  //const { isLoading, error, sendRequest } = useHttp();
  const divRef = useRef();
  const { isSucceess, isError, isLoading, isFetching, data, error } = useQuery(
    ['getAdvice', id],
    async () => {
      const response = await fetch('https://api.adviceslip.com/advice/' + id);

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      return data;
    },
    {
      onSuccess: (data) => {
        console.log('onSuccess in Advice.js', data);
        if (data.message) {
          setTasks(data.message.text);
          divRef.current.style = 'color:red;';
          return;
        }
        setTasks(data.slip.advice);
        divRef.current.style = 'color:white;';
      },
      onError: (error) => {
        console.log('onError in Advice.js', error);
      },
    }
  );

  //   useEffect(() => {
  //     const trnasformTasks = (tasksObj) => {
  //       setTasks(tasksObj.slip.advice);
  //       //setId(tasksObj.slip.id);
  //     };

  //     sendRequest(
  //       {
  //         url: 'https://api.adviceslip.com/advice/',
  //       },
  //       trnasformTasks,
  //       id
  //     );
  //   }, [id, sendRequest]);

  const getAdviceHandler = () => {
    setId(Math.floor(Math.random() * 100));
  };

  return (
    <>
      <Card>
        <div className={classes.advice}>
          <div className={classes.title}>ADVICE # {id}</div>
          <div className={classes.body} ref={divRef}>
            "{tasks}"
          </div>
          <div className={classes.divider}>
            <img src='/images/pattern-divider-desktop.svg' alt='divider' />
          </div>
        </div>
        <button className={classes.dice} onClick={getAdviceHandler}>
          <img src='/images/icon-dice.svg' alt='divider' />
        </button>
      </Card>
    </>
  );
};

export default Advice;
