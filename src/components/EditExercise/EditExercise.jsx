//(Use these comments to find and replace)
// EditExercise
// ott-create-exercise

import React from "react";
import "./EditExercise.scss";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class EditExercise extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}exercises/update/${this.props.match.params.id}`,
        exercise
      )
      .then((res) => console.log(res.data));

    window.location = "/exercises";
  }

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}exercises/${this.props.match.params.id}`
      )
      .then((res) => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get(`${process.env.REACT_APP_API_URL}users`).then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
          username: res.data[0].username,
        });
      } else {
        this.setState({
          users: [],
          username: "No data",
        });
      }
    });
  }

  render() {
    return (
      <div className="ott-create-exercise">
        <h3>Edit Exercise</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map((u, i) => {
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
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label>Duration (in minutes) </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>

          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(EditExercise);
