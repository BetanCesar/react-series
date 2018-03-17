import React, { Component } from 'react';
import ActorList from '../ActorList/index';
import axios from 'axios';
import "./Serie.css";
import PropTypes from "prop-types";

class Serie extends Component{

    constructor(props){
        super(props);
        this.state = { id:"", name:"", actors:[] };
    }

    componentWillMount(){
        axios.get("http://api.tvmaze.com/shows/"+this.props.id+"/cast")
            .then(res => {
                this.setState({actors: res.data});
            })
    }

    render(){
        return (
            <div className='list'>
                <button className="deleteButton" onClick={() => this.props.onDelete(this.props.id)}>X</button>
                <h1>{this.props.name}<span className="idSerie">{this.props.id}</span></h1>
                <ActorList actors={this.state.actors} />
            </div>
        )
    }

}

export default Serie;