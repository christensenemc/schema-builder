import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BootstrapProvider from '@bootstrap-styled/provider';

import EditSchema from './routes/EditSchema';

const BOOTSTRAP_THEME = {};

function App(props) {
  const { reduxStore } = props;

  return (
    <Provider store={reduxStore}>
      <BootstrapProvider theme={BOOTSTRAP_THEME}>
        <Router>
          <Fragment>
            <Route
              exact
              path="/schema/:schemaId/commit/:commitId"
              component={EditSchema}
            />
            <Route exact path="/schema/:schemaId" component={EditSchema} />
          </Fragment>
        </Router>
      </BootstrapProvider>
    </Provider>
  );
}

export default App;
