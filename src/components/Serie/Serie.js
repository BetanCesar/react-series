import React, { Component } from 'react';
import ActorList from '../ActorList/index';
import axios from 'axios';
import "./Serie.css";
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';

class Serie extends Component{

    constructor(props){
        super(props);
        this.state = { id:"", name:"", actors:[], status:"" };
    }

    componentWillMount(){
        axios.get("http://api.tvmaze.com/shows/"+this.props.id+"/cast")
            .then(res => {
                this.setState({actors: res.data, status: res.status});
            })
            .catch(error => {
                this.setState({status: error.response.status});
            });
    }

    render(){
        return (
            <div id='serieList' className={checkStatusError(this.state.status) ? 'errorList listE' :  'list successList'} >
                <button className="deleteButton" onClick={() => this.props.onDelete(this.props.id)}>X</button>
                <h1><NavLink to ={'/serie/'+this.props.id}>{this.props.name}<span className="idSerie">{this.props.id}</span></NavLink></h1>
                {
                    checkStatusError(this.state.status) ? <span className='errorSpan'>Sin Actores</span> : <ActorList actors={this.state.actors} />
                }
            </div>
        )
    }
    componentDidMount(){
        setTimeout(function(){
            let element = document.getElementsByClassName("list");
            Array.prototype.forEach.call(element, function(el) {
                el.setAttribute("class", "list");
            });
        }, 3000);
    }

}
const checkStatusError = (object) => {
    let isError;
    if (object === 404) {
        isError = true;
    } else {
        isError = false;
    }
    return isError;
};
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