import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import blankReducer from "./blank-reducer.js";
import createExerciseReducer from "./create-exercise-reducer.js";
import thunk from "redux-thunk";
import listUsersReducer from "./list-users-reducer.js";

const reducers = combineReducers({
  blankPage: blankReducer,
  createExercise: createExerciseReducer,
  listUsers: listUsersReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  undefined,
  composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
);

export default store;
