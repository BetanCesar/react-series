import React from 'react';
import Actor from '../Actor/index';
import "./ActorList.css";
import PropTypes from "prop-types";

const ActorList = ({ actors }) =>
    <ul>
        {actors.map((actor, i) =>
            <Actor key={i} {...actor} />
        )}
    </ul>

const actorPhotoValidator = (props, propName, componentName) => {
    if(typeof props[propName] !== 'string' || !/(https?:\/\/.*\.(?:png|jpg|svg))/i.test(props[propName])){
        return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Must be a valid url to an image of type png, jpg or svg.'
        );
    }
};

const actorTextValidator = (props, propName, componentName) => {
    if(typeof props[propName] !== 'string' || props[propName].trim().length < 1){
        return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Must be a text with more than 3 characters'
        );
    }
};

ActorList.propTypes = {
    actors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: actorTextValidator,
        character: actorTextValidator,
        photo: actorPhotoValidator,
    })),
    onDeleteActor: PropTypes.func.isRequired
}

ActorList.defaultProps = {
    actors: []
}

export default ActorList;