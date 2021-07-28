import React, {Fragment} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login } from './components';
import Home from './components/Home';
import {me} from './store'

export interface RoutesProps {

}

const Routes: React.SFC<RoutesProps> = () => {
  const dispatch = useDispatch();
  const loadInitialData = () => dispatch(me())

	useEffect(() => {
		loadInitialData();
	}, []);

	const isLoggedIn = useSelector(state => state.auth.id);
  return ( <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
          </Switch>
        )}
      </div> );
}

export default withRouter(Routes)
