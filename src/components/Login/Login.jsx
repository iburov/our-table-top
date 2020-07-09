//(Use these comments to find and replace)
// Login
// ott-login

import React from "react";
import "./Login.scss";
import { connect } from "react-redux";

class Login extends React.Component {
  componentDidMount() {}

  render() {
    return <div className="ott-login">Login</div>;
  }
}

let mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(Login);
