//(Use these comments to find and replace)
// ExercisesList
// ott-exercises-list

import React from "react";
import "./ExercisesList.scss";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <NavLink
        to={`/edit-exercise/${props.exercise._id}`}
        className="btn btn-primary m-1 p-1"
      >
        Edit
      </NavLink>
      <button
        className="btn btn-primary m-1 p-1"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

class ExercisesList extends React.Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {
      exercises: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}exercises`)
      .then((res) => {
        console.log(res.data);
        this.setState({ exercises: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteExercise(id) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}exercises/${id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          exercises: this.state.exercises.filter((el) => el._id !== id),
        });
      });
  }

  render() {
    return (
      <div className="ott-exercises-list">
        <h3 className="float-left">Exercises</h3>
        <NavLink
          to="/create-exercise"
          className="nav-link float-right btn btn-primary m-2 p-1"
        >
          Create Exercise
        </NavLink>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <td>Username</td>
              <td>Description</td>
              <td>Duration</td>
              <td>Date</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map((exercise, i) => {
              return (
                <Exercise
                  key={i}
                  exercise={exercise}
                  deleteExercise={this.deleteExercise}
                />
              );
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

export default connect(mapStateToProps, {})(ExercisesList);
