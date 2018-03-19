import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import AddSerieForm from '../AddSerieForm/index';
import SerieList from '../SerieList/index';

class Home extends Component {

    constructor(props){
        super(props);
        let series = series = JSON.parse(localStorage.getItem('series'));
        if(series == null){
            series = [{id:"82", name:"Game of Thrones"}];
            localStorage.setItem('series', JSON.stringify({series}));
        }
        series = JSON.parse(localStorage.getItem('series'));
        this.state = series;
        this.addSerie = this.addSerie.bind(this);
        this.deleteSerie = this.deleteSerie.bind(this);
    }

    addSerie(name, id){
        let a = [];
        a = this.state.series.filter(serie => serie.id === id);
        if(a[0] !== undefined){
            document.getElementById("message").setAttribute("class", "alert-danger");
            setTimeout(function(){
                document.getElementById("message").removeAttribute("class");
            }, 2500);
        }else{
            axios.get("http://api.tvmaze.com/shows/"+id+"/cast").then(res => {res.data});
            const series = [...this.state.series,
                {id, name}
            ];
            this.setState({series});
            localStorage.setItem('series', JSON.stringify({series}));
            document.getElementById("message").setAttribute("class", "alert-success");;
            setTimeout(function(){
                document.getElementById("message").removeAttribute("class");
            }, 2500);
        }
    }

    deleteSerie(id) {
        const series = this.state.series.filter(serie => serie.id !== id);
        this.setState({series});
        localStorage.setItem('series', JSON.stringify({series}));
        document.getElementById("message").setAttribute("class", "alert-successs");
        setTimeout(function(){
            document.getElementById("message").removeAttribute("class");
        }, 2500);
    }

    render() {
        return (
            <div className="App">
                <AddSerieForm onNewSerie={this.addSerie} />
                <SerieList series={this.state.series} onDelete={this.deleteSerie} />
            </div>
        );
    }
}

export default Home;
