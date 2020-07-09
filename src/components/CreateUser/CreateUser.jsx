//(Use these comments to find and replace)
// CreateUser
// ott-create-user

import React from "react";
import "./CreateUser.scss";
import { connect } from "react-redux";
import axios from "axios";

class CreateUser extends React.Component {
  state = {
    username: "",
  };

  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}users/add`, user)
      .then((res) => console.log(res.data));

    this.setState({
      username: "",
    });
  }

  componentDidMount() {}

  render() {
    return (
      <div className="ott-create-user">
        <h3>Create User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Add User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(CreateUser);
