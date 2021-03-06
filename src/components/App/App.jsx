import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import JosephusProblem from "../JosephusProblem/JosephusProblem";
import Navbar from "../Navbar/Navbar";
import ExercisesList from "../ExercisesList/ExercisesList";
import UsersList from "../UsersList/UsersList";
import CreateExercise from "../CreateExercise/CreateExercise";
import EditExercise from "../EditExercise/EditExercise";
import CreateUser from "../CreateUser/CreateUser";

class App extends React.Component {
  componentDidMount() { }

  render() {
    return (
      <Router>
        <div className="ott-app container">
          <Navbar />
          <div className="ott-app__wrapper pt-2">
            <Route path="/jp" component={JosephusProblem} />
            <Route path="/users" component={UsersList} />
            <Route path="/create-user" component={CreateUser} />
            <Route path="/exercises" component={ExercisesList} />
            <Route path="/create-exercise" component={CreateExercise} />
            <Route path="/edit-exercise/:id" component={EditExercise} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
