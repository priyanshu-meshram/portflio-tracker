import { React, Component } from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import SignUp from "./components/Auth/SignUp/SignUp";
import Login from "./components/Auth/Login/Login";
import VerifyOtp from "./components/Auth/VerifyOtp/VerifyOtp";
import Home from "./components/Home/Home";
import styles from "./App.module.css";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/verifyOtp" component={VerifyOtp} />
          <Route path="/home" component={Home} />
          <Route> Error, No route Handled</Route>
        </Switch>
      </div>
    );
  }
}

export default App;
