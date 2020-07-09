import actions from "./create-exercise-actions";

let initState = {
  username: "",
  description: "",
  duration: 0,
  date: new Date(),
  users: [],
};

const createExerciseReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.SET_USERS:
      return { ...state, users: action.users };
    case actions.SET_USERNAME:
      return { ...state, username: action.username };
    case actions.SET_DESCRIPTION:
      return { ...state, description: action.description };
    case actions.SET_DURATION:
      return { ...state, duration: action.duration };
    case actions.SET_DATE:
      return { ...state, date: action.date };
    default:
      return state;
  }
};

export const setUsername = (username) => ({
  type: actions.SET_USERNAME,
  username,
});

export const setDescription = (description) => ({
  type: actions.SET_DESCRIPTION,
  description,
});

export const setDuration = (duration) => ({
  type: actions.SET_DURATION,
  duration,
});

export const setDate = (date) => ({
  type: actions.SET_DATE,
  date,
});

export const setUsers = (users) => ({
  type: actions.SET_USERS,
  users,
});

export default createExerciseReducer;
