import React, { Component } from 'react';
import ActorList from '../ActorList/index';
import axios from 'axios';
import "./SerieDetail.css";
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';

class SerieDetail extends Component{

    constructor(props){
        super(props);
        let series = JSON.parse(localStorage.getItem('series'));
        const serie = series.series.find(series => series.id === props.match.params.id);
        let seriesName = serie.name;
        this.state = { actors:[], seriesId: props.match.params.id, seriesName: seriesName };
    }


    componentWillMount(){
        axios.get("http://api.tvmaze.com/shows/"+this.state.seriesId+"/cast")
            .then(res => {
                this.setState({actors: res.data});
            })
    }

    render(){
        return (
            <div>
                <div className='headDetail'>
                    <NavLink to ={'/'}>Regresar</NavLink><span>{this.state.seriesName}</span>
                </div>
                <div className='listDetail'>
                    <ActorList actors={this.state.actors} />
                </div>
            </div>
        );
    }

}

export default SerieDetail;