import './style.css';
import { Route, Switch, useRouteMatch } from 'react-router';
import UserProfile from '../../components/UserProfile';
import SearchResult from '../../components/SearchResult';
import Header from '../../components/Header';
import NotFound from '../../components/NofFound/NotFound';
import HomeSection from '../../components/HomeSection';


const GlobalPage = () => {

  const { path } = useRouteMatch();

  return (
    <div id='global-page'>
      <Header/>
      <div className='main'>
      <Switch>
        <Route exact path={`${path}/`}>
          <HomeSection/>
        </Route>
          <Route path={`${path}/user/:id`}>
            <UserProfile />
          </Route>
          <Route path={`${path}/search`}>
            <SearchResult />
          </Route>
          <Route path='*' component={NotFound} />
        </Switch>
      </div>   
    </div>
  );
}

export default GlobalPage;