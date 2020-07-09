//(Use these comments to find and replace)
// UsersList
// ott-users-list

import React from "react";
import "./UsersList.scss";
import { connect } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";

const User = (props) => (
  <tr>
    <td>{props.user.username}</td>
    <td>
      <button
        className="btn btn-primary m-1 p-1"
        onClick={() => {
          props.deleteUser(props.user._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

class UsersList extends React.Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}users?page=2&limit=2`)
      .then((res) => {
        console.log(res.data);
        this.setState({ users: res.data.results });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteUser(id) {
    axios.delete(`${process.env.REACT_APP_API_URL}users/${id}`).then((res) => {
      this.setState({
        users: this.state.users.filter((el) => el._id !== id),
      });
    });
  }

  render() {
    return (
      <div className="ott-users-list">
        <h3 className="float-left">Users</h3>
        <NavLink
          to="/create-user"
          className="nav-link float-right btn btn-primary m-2 p-1"
        >
          Add User
        </NavLink>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <td>Username</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, i) => {
              return <User key={i} user={user} deleteUser={this.deleteUser} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(UsersList);
