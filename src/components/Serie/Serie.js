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
const actorTextValidator = (props, propName, componentName) => {
    if(typeof props[propName] !== 'string' || props[propName].trim().length < 3){
        return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Must be a text with more than 3 characters'
        );
    }
};
Serie.propTypes ={
    id: PropTypes.number.isRequired,
    name: actorTextValidator,
    character: actorTextValidator,
    onDelete: PropTypes.func.isRequired
};

Serie.defaultProps = {
    id: 0,
    name: ["name"],
    serie: []
}

export default Serie;