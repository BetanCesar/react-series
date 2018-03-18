import React from 'react';
import './Actor.css'
import PropTypes from "prop-types";

const Actor = (actor) => {

    var isImageNull;
    if (actor.character.image == null) {
        isImageNull = true;
    } else {
        isImageNull = false;
    }

    return (
        <div className="actor-list">
            <li>
                <div className="photo">
                    <img alt={actor.person.name} src={isImageNull ? null : actor.character.image.medium}/>
                </div>
                <span className="name">{actor.person.name}</span>
                <span className="character">{actor.character.name}</span>
            </li>
        </div>);
}
const actorPhotoValidator = (props, propName, componentName) => {
    if(typeof props[propName] !== 'string' || !/(https?:\/\/.*\.(?:png|jpg|svg))/i.test(props[propName])){
        return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Must be a valid url to an image of type png, jpg or svg.'
        );
    }
};
const actorTextValidator = (props, propName, componentName) => {
    if(typeof props[propName] !== 'string' || props[propName].trim().length < 3){
        return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Must be a text with more than 3 characters'
        );
    }
};
Actor.propTypes ={
    id: PropTypes.number.isRequired,
    name: actorTextValidator,
    character: actorTextValidator,
    photo: actorPhotoValidator,
    onDeleteActor: PropTypes.func.isRequired
};

Actor.defaultProps = {
    id: 0,
    name: ["name"],
    character: ["character"],
    photo: ["none"]
}

export default Actor;
