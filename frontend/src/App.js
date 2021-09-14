import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import { UserTokenContextProvider } from './contexts/UserTokenContext';

function App() {
  return (
    <Router>
      <Switch>
        <UserTokenContextProvider>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
        </UserTokenContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
