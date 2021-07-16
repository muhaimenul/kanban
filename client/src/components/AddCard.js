import React from 'react'
import TextInput from '../components/TextInput';

const AddCard = props => {
    let { onChange, onSubmit, ...rest } = props;

    return (
        <div style={style.container} className="container">
            <h2>Kanban</h2>
            <div style={style.form}>
                <TextInput onChange={onChange} placeholder="Write your task ..." className="form-control" style={style.input} />
                <button type="button" style={style.btn} onClick={onSubmit}> Add </button>
                <div />
            </div>
        </div>
    )
}


const style = {
    form: {
        marginLeft: '10px'
    },
    input: {
        height: '30px',
        minWidth: '22%',
        top: '0%',
        right: '0%',
        zIndex: '10',
        backgroundColor: 'rgb(233 233 233)',
        border: '1px solid grey',
        width: '250px',
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
}

export default AddCard