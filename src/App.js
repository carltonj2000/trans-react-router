import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { TransitionGroup, CSSTransition } from "react-transition-group";

const styles = {
  fill: {
    postion: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "600px",
    overflow: "auto",
    background: "lime"
  },
  nav: {
    display: "flex",
    listStyle: "none",
    justifyContent: "space-around"
  },
  navItem: {
    background: "yellow"
  }
};
styles.content = {
  ...styles.fill
};

styles.hsl = {
  ...styles.fill,
  color: "white",
  fontSize: "30px"
};
styles.rgb = {
  ...styles.fill,
  color: "white",
  fontSize: "30px"
};
const NavLink = props => (
  <li style={styles.navItem}>
    <Link {...props} style={{ color: "inherit" }} />
  </li>
);

class App extends Component {
  render() {
    return (
      <Router>
        <Route
          render={({ location }) =>
            console.log(location, location.key) || (
              <div style={styles.fill}>
                <Route
                  exact={true}
                  path="/"
                  render={() => <Redirect to="/hsl/10/90/50" />}
                />
                <ul style={styles.nav}>
                  <NavLink to="/hsl/10/90/50">Red</NavLink>
                  <NavLink to="/hsl/120/100/40">Green</NavLink>
                  <NavLink to="/rgb/33/150/243">Blue</NavLink>
                  <NavLink to="/rgb/240/99/146">Pink</NavLink>
                </ul>
                <div style={styles.content}>
                  <TransitionGroup>
                    <CSSTransition
                      key={location.key}
                      timeout={600}
                      classNames="fade"
                    >
                      <Switch location={location}>
                        <Route
                          exact={true}
                          path="/hsl/:h/:s/:l"
                          component={HSL}
                        />
                        <Route
                          exact={true}
                          path="/rgb/:r/:g/:b"
                          component={RGB}
                        />
                        <Route render={() => <div>Not Found</div>} />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                </div>
              </div>
            )
          }
        />
      </Router>
    );
  }
}

const HSL = ({ match: { params } }) => {
  const hsl = `hsl(${params.h}, ${params.s}%, ${params.l}%)`;
  return <div style={{ ...styles.hsl, background: hsl }}>{hsl}</div>;
};

const RGB = ({ match: { params } }) => {
  const rgb = `rgb(${params.r}, ${params.g}, ${params.b})`;
  return <div style={{ ...styles.rgb, background: rgb }}>{rgb}</div>;
};

export default App;
