import './style.css';
import { Route, Switch, useRouteMatch } from 'react-router';
import UserProfile from '../../components/UserProfile';
import SearchResult from '../../components/SearchResult';
import Header from '../../components/Header';


const GlobalPage = () => {

  const { path } = useRouteMatch();

  return (
    <div id='global-page'>
      <Header/>
      <div className='main'>
      <Switch>
          <Route path={`${path}/user/:id`}>
            <UserProfile />
          </Route>
          <Route path={`${path}/search`}>
            <SearchResult />
          </Route>
        </Switch>
      </div>   
    </div>
  );
}

export default GlobalPage;