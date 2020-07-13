//(Use these comments to find and replace)
// UsersList
// ott-users-list

import React from "react";
import "./UsersList.scss";
import { connect } from "react-redux";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { setUsers, setPage, setTotalCount, setIsLoading } from "../../redux/list-users-reducer"
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';

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
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}users?page=${this.props.page}&limit=${this.props.pageLimit}`)
      .then((res) => {
        this.props.setTotalCount(res.data.totalCount);
        this.props.setUsers(res.data.results);
        this.props.setIsLoading(false);
      })
      .catch((err) => {
        this.props.setUsers([]);
      });
  }

  deleteUser(id) {
    axios.delete(`${process.env.REACT_APP_API_URL}users/${id}`).then((res) => {
      this.props.setUsers(
        this.props.users.filter((el) => el._id !== id),
      );
    });
  }

  pageChange = (pageNumber) => {
    this.props.setPage(pageNumber);
    axios
      .get(`${process.env.REACT_APP_API_URL}users?page=${pageNumber}&limit=${this.props.pageLimit}`)
      .then((res) => {
        this.props.setUsers(res.data.results);
      })
      .catch((err) => {
        this.props.setUsers([]);
      });
  }

  render() {
    let pagesCount = Math.ceil(this.props.totalCount / this.props.pageLimit);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return (
      <div className="ott-users-list">
        {this.props.isLoading ? <LoadingSpinner /> : null}
        <h3 className="float-left">Users</h3>
        <div className="pages-numbers">
          {pages.map((p, i) => (
            <span key={i} className={`badge badge-primary m-1 p-2 ${p === this.props.page ? 'active-page' : ''}`} onClick={() => {
              this.pageChange(p)
            }}>{p}</span>
          ))}
        </div>
        <NavLink
          to="/create-user"
          className="nav-link float-right btn btn-primary m-2 p-1"
        >
          Add User
        </NavLink>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <td className="font-weight-bold">Username</td>
              <td className="font-weight-bold">Actions</td>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map((user, i) => {
              return <User key={i} user={user} deleteUser={this.deleteUser} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.listUsers.users,
    page: state.listUsers.page,
    pageLimit: state.listUsers.pageLimit,
    totalCount: state.listUsers.totalCount,
    isLoading: state.listUsers.isLoading
  };
};

export default connect(mapStateToProps, { setUsers, setPage, setTotalCount, setIsLoading })(UsersList);
