import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import { UserTokenContextProvider } from './contexts/UserTokenContext';
import HomePage from './pages/HomePage';
import { SearchResultContextProvider } from './contexts/searchResultContext';

function App() {
  return (
    <Router>
      <Switch>
        <UserTokenContextProvider>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <SearchResultContextProvider>
            <Route path='/home'>
              <HomePage />
            </Route>
            <Route exact path="/">
              <LandingPage />
            </Route>
          </SearchResultContextProvider>
        </UserTokenContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
