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

export default Actor;
