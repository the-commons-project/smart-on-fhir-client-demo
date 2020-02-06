import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";

import Routes from "./js/Routes";

import './css/app.css';

const wrapper = document.getElementById("root");
wrapper ? 
    ReactDOM.render(        
        <HashRouter>
            <Routes />
        </HashRouter>, 
        wrapper
    ) : false;      