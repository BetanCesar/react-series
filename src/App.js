import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import AddSerieForm from './components/AddSerieForm/index';
import SerieList from './components/SerieList/index';

class App extends Component {

    constructor(props){
        super(props);
        this.state = { series: [
                {
                    id:82,
                    name:"Game of Thrones",
                    actors:[]
                }
            ]
        };
        this.addSerie = this.addSerie.bind(this);
        this.deleteSerie = this.deleteSerie.bind(this)
    }

    addSerie(name, id){
        const actors1 = [];
        let a = [];
        a = this.state.series.filter(serie => serie.id == id);
        if(a[0] != undefined){
            document.getElementById("message").setAttribute("class", "alert-danger");
            setTimeout(function(){
                document.getElementById("message").removeAttribute("class");
            }, 2500);
        }else{
            axios.get("http://api.tvmaze.com/shows/"+id+"/cast").then(res => {res.data});
            const series = [...this.state.series,
                {id, name, actors1}
            ];
            this.setState({series});
            document.getElementById("message").setAttribute("class", "alert-success");;
            setTimeout(function(){
                document.getElementById("message").removeAttribute("class");
            }, 2500);
        }
    }

    deleteSerie(id) {
        const series = this.state.series.filter(serie => serie.id !== id);
        this.setState({series});
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

export default App;
