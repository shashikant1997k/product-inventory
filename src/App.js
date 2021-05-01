import "./App.css";
import Login from "./Component/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Header from "./Component/Header";
import Home from "./Component/Home";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.token);

  return (
    <div className="App">
      <Router>
        <Switch>
          {!token ? (
            <>
              <Route exact path="/">
                <Login />
              </Route>
            </>
          ) : (
            <>
              <Route path="/">
                <Home />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
