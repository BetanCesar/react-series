import React from 'react';
import Serie from '../Serie/index';
import './SerieList.css';
import PropTypes from "prop-types";

const SerieList = ({ series , onDelete=f=>f }) =>

    <div className="bottomSection">
        <div className="heading" id="headerMessage">
            <h2 className="titleSeries">Mis Series</h2>
            <div id="message"></div>
        </div>
        <div className="listaSerie">
            <div className="series">
                {series.map(serie =>
                    <Serie key={serie.id} {...serie} onDelete={onDelete} />
                )}
            </div>
        </div>
    </div>

const actorTextValidator = (props, propName, componentName) => {
    if(typeof props[propName] !== 'string' || props[propName].trim().length < 1){
        return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Must be a text with more than 3 characters'
        );
    }
};

SerieList.propTypes = {
    series: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: actorTextValidator
    })),
    onDeleteSerie: PropTypes.func.isRequired
}

SerieList.defaultProps = {
    series: []
}


export default SerieList;