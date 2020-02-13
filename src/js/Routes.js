import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { createHashHistory } from "history";

import App from "./App";
import Demo from "./components/container/demo";
import Details from "./components/container/details";

import { baseUrl, PATH_DETAILS } from "./constants";
import { history } from "./helpers";

function  Routes() {  
  const loc = `${baseUrl}/`;    
  return (
    <App>
      <Switch>                
        <Route path={`${loc}${PATH_DETAILS}/:patientId`} component={Details} />
        <Route path={`${loc}`} component={Demo} />
        <Route path="*" component={() => <div>{history.push(`${loc}`)}</div> } />
      </Switch>
    </App>
  );  
}

export default Routes;