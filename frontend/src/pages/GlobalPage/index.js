import './style.css';
import HeaderPlusGrid from '../../components/HeaderPlusGrid';
import { Route, Switch, useRouteMatch } from 'react-router';
import UserProfile from '../../components/UserProfile';
import SearchResult from '../../components/SearchResult';


const GlobalPage = () => {

  const { path } = useRouteMatch();

  return (
    <div id='global-page'>
      <HeaderPlusGrid>
        <Switch>
          <Route path={`${path}/user/:id`}>
            <UserProfile />
          </Route>
          <Route path={`${path}/search`}>
            <SearchResult />
          </Route>
        </Switch>
      </HeaderPlusGrid>

    </div>
  );
}

export default GlobalPage;