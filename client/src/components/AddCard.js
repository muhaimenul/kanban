import React from 'react'
import TextInput from '../components/TextInput';

const AddCard = props => {
    let { placeholder = "Enter Text", onChange, onSubmit, ...rest } = props;

    return (
        <div style={style.container} class="container">
            <h2>Kanban</h2>
            <div style={style.form}>
                <TextInput onChange={onChange} placeholder="Write your task ..." class="form-control" style={style.input} />
                <button type="button" style={style.btn} onClick={onSubmit}> Add </button>
                <div />
            </div>
        </div>
    );
};


const style = {

    h1: { color: 'white' },

    container: {
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#222',
    },

    form: {
        marginLeft: '10px'
    },

    input: {
        height: '30px',
        minWidth: '22%',
        top: '0%',
        right: '0%',
        zIndex: '10',
        backgroundColor: '#CCC',
        border: '1px solid grey',
        width: '250px',
        color: 'white',
        fontWeight: 'bold',
        padding: '10px',
        borderRadius: '5px',
        margin: '10px'
    },

    btn: {
        height: '50px',
        width: '70px',
        borderRadius: '5px',
        backgroundColor: 'aliceblue',
        color: 'orange',
        fontWeight: 'bold',
    }

    // color: "white",
    // backgroundColor: "DodgerBlue",
    // padding: "10px",
    // fontFamily: "Arial"
};

export default AddCard;