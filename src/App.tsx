import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Incidents from './containers/Incidents/Incidents';
import IncidentDetail from './containers/IncidentDetail/IncidentDetail';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path={'/incidents/:id'} exact component={IncidentDetail} />
        <Route path="/incidents" component={Incidents} />
        <Route path="/" exact component={Incidents} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default App;
