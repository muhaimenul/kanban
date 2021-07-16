import React from 'react'

const TextInput = props => {
    let { placeholder = "Enter Text", onChange, ...rest } = props;

    return (  

        <input type="text" placeholder={placeholder} onChange={onChange} {...rest} />

      );
};

export default TextInput;