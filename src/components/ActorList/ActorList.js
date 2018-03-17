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

export default ActorList;