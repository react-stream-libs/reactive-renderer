import * as React from 'react';
import { History } from 'history';
import { Router } from 'react-router';
import routes from './Routes';
export type PropsType = {
  history: History,
};
const App: React.SFC<PropsType> = ({ history }) => {
  return (
    <Router history={history}>
      {routes}
    </Router>
  )
}

export default App;