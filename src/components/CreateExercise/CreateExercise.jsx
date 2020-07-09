//(Use these comments to find and replace)
// CreateExercise
// ott-create-exercise

import React from "react";
import "./CreateExercise.scss";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
  setUsers,
  setUsername,
  setDescription,
  setDuration,
  setDate,
} from "../../redux/create-exercise-reducer";

class CreateExercise extends React.Component {
  onSubmit() {
    const exercise = {
      username: this.props.username,
      description: this.props.description,
      duration: this.props.duration,
      date: this.props.date,
    };

    debugger;

    axios
      .post(`${process.env.REACT_APP_API_URL}exercises/add`, exercise)
      .then((res) => console.log(res.data));

    window.location = "/exercises";
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}users`).then((res) => {
      if (res.data.length > 0) {
        this.props.setUsers(res.data.map((user) => user.username));
        this.props.setUsername(res.data[0].username);
      } else {
        this.props.setUsers([]);
        this.props.setUsername("");
      }
    });
  }

  render() {
    let usernameInput = React.createRef();
    let descriptionInput = React.createRef();
    let durationInput = React.createRef();
    let dateInput = React.createRef();

    return (
      <div className="ott-create-exercise">
        <h3>Create New Exercise</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref={usernameInput}
              required
              className="form-control"
              value={this.props.username}
              onChange={() => {
                this.props.setUsername(usernameInput.current.value);
              }}
            >
              {this.props.users.map((u, i) => {
                return (
                  <option key={i} value={u}>
                    {u}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              required
              ref={descriptionInput}
              className="form-control"
              value={this.props.description}
              onChange={() =>
                this.props.setDescription(descriptionInput.current.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Duration (in minutes) </label>
            <input
              type="text"
              className="form-control"
              ref={durationInput}
              value={this.props.duration}
              onChange={() =>
                this.props.setDuration(durationInput.current.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              ref={dateInput}
              selected={this.props.date}
              onChange={(date) => {
                this.props.setDate(date);
              }}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Create" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    username: state.createExercise.username,
    description: state.createExercise.description,
    duration: state.createExercise.duration,
    date: state.createExercise.date,
    users: state.createExercise.users,
  };
};

export default connect(mapStateToProps, {
  setUsers,
  setUsername,
  setDescription,
  setDuration,
  setDate,
})(CreateExercise);
