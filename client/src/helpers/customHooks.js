import { useState } from 'react';

// custom helper to take input field
export let useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);
    let handleChange = e => setValue(e.target.value)
    return [value, handleChange, setValue]
  }
  
  export let useFormFields = (initialState) => {
    const [fields, setValues] = useState(initialState);  
    return [
      fields,
      (event) => {
        setValues({
          ...fields,
          [event.target.id]: event.target.value
        });
      },
      setValues
    ];
  }
  

export let sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// sum of array of object by key
export let arraySum = (array, key) => {
  return array.reduce((a, b) => a + (b[key] || 0), 0);
}


// return current date  YYYY-MM-DD
export let now = () => {
  let dateTime = new Date()
  return (`${dateTime.getFullYear()}-${('0'+(dateTime.getMonth()+1)).slice(-2)}-${('0'+dateTime.getDate()).slice(-2)}`)
}

export let dateForHuman = data => {
  let dateTime = new Date(data)
  return dateTime.toUTCString().split(' ').slice(0, 4).join(' ');
  // return dateTime.toLocaleDateString().split(' ').slice(0, 4).join(' ');
}

