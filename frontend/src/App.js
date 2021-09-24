import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import { UserTokenContextProvider } from './contexts/UserTokenContext';
import GlobalPage from './pages/GlobalPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './components/NofFound/NotFound';


function App() {
  return (
    <Router>
      <UserTokenContextProvider>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <Route path='/app'>
            <GlobalPage />
          </Route>
          <Route >
            <NotFound />
          </Route>
        </Switch>
      </UserTokenContextProvider>
    </Router >
  );
}

export default App;
