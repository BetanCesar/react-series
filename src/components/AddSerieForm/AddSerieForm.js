import React, { Component } from 'react';
import "./AddSerieForm.css";
import PropTypes from "prop-types";

class AddSerieForm extends Component{

    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(e){
        e.preventDefault();
        const {_nombre, _id} = this.refs;
        this.props.onNewSerie(_nombre.value, _id.value);
        _nombre.value = "";
        _id.value = "";
    }

    render(){
        return(
            <div className="form">
                <form onSubmit={this.submit}>
                    <h2 className="agregarSerie">Agregar Serie</h2>
                    <input className="nomSerieInput" type="text" ref="_nombre" placeholder="Nombre Serie" required />
                    <input className="idSerieInput" type="text" ref="_id" placeholder="ID Serie" required />
                    <button className="addButton">Agregar</button>
                </form>
            </div>
        )
    }


}

export default AddSerieForm;