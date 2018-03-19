import React, { Component } from 'react';
import axios from 'axios';
import "./ActorDetail.css";
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';

class ActorDetail extends Component{

    constructor(props){
        super(props);
        let series = JSON.parse(localStorage.getItem('series'));
        const serie = series.series.find(series => series.id === props.match.params.serieId);
        let serieName = serie.name;
        this.state = { actor:[], shows: [], seriesId: props.match.params.serieId, actorId: props.match.params.id,
            seriesName: serieName, country: []};
    }

    componentWillMount(){
        axios.get("http://api.tvmaze.com/people/"+this.state.actorId)
            .then(res => {
                this.setState({actor: res.data});
            });
        axios.get("http://api.tvmaze.com/people/"+this.state.actorId+"/castcredits?embed=show")
            .then(res => {
                this.setState({shows: res.data});
            });
        axios.get(this.state.actor.country)
            .then(res => {
               this.setState({country: res.data});
            });
    }

    render(){
        return (
            <div>
                <div className='headDetail'>
                    <NavLink to ={'/serie/'+this.state.seriesId}>Regresar</NavLink><span>{this.state.actor.name} / {this.state.seriesName}</span>
                </div>
                <div>
                    <div className='actorInfo'>
                        <div className='actorImage'>
                            <img src={checkNull(this.state.actor.image) ? 'Sin Imagen' :  this.state.actor.image.medium}
                                 alt={this.state.actor.name} />
                        </div>
                        <div className='actorDetails'>
                            <span className='actorName'>{this.state.actor.name}</span>
                            <span className='actorGender'>{this.state.actor.gender}</span>
                            <span className='actorBirthday'>{this.state.actor.birthday}</span>
                            <span className='actorGender'>
                                {checkNull(this.state.actor.country) ? 'Sin Imagen' :  this.state.actor.country.name}
                            </span>
                        </div>
                    </div>
                    <div className='shows'>
                        <h3>Series</h3>
                        <ul>
                            <div className="actor-list">
                                {this.state.shows.map(function(object, i){
                                    return <li>
                                            {checkNull(object._embedded.show.premiered) ? 'S.F.' :  object._embedded.show.premiered.slice(0,4)} -
                                            {checkNull(object._embedded.show.name) ? 'S.N.' :  object._embedded.show.name}
                                        </li>;
                                })}
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const checkNull = (object) => {
    let isNull;
    if (object == null) {
        isNull = true;
    } else {
        isNull = false;
    }
    return isNull;
};
const actorTextValidator = (props, propName, componentName) => {
    if(typeof props[propName] !== 'string' || props[propName].trim().length < 3){
        return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Must be a text with more than 3 characters'
        );
    }
};
ActorDetail.propTypes ={
    id: PropTypes.number.isRequired,
    name: actorTextValidator
};

ActorDetail.defaultProps = {
    id: 0,
    name: ["name"]
}


export default ActorDetail;