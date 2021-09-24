import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import { UserTokenContextProvider } from "./contexts/UserTokenContext";
import HomePage from "./pages/HomePage";
import { SearchResultContextProvider } from "./contexts/searchResultContext";
import ExperiencePage from "./pages/ExperiencePage";
import CreateExperiencePage from "./pages/CreateExperiencePage";

function App() {
  return (
    <Router>
      <Switch>
        <UserTokenContextProvider>
          <Route path="/login">
            <LoginPage />
          </Route>
          <SearchResultContextProvider>
            <Route path="/home">
              <HomePage />
            </Route>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route path="/experiencias/:id">
              <ExperiencePage />
            </Route>
            <Route path="/create/experiencias">
              <CreateExperiencePage />
            </Route>
          </SearchResultContextProvider>
        </UserTokenContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
