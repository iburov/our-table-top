import actions from "./list-users-actions.js";

let initState = {
  users: [],
  page: 1,
  pageLimit: 5,
  totalCount: 0,
  isLoading: true,
};

const listUsersReducer = (state = initState, action) => {
  switch (action.type) {
    case actions.SET_PAGE:
      return { ...state, page: action.page };
    case actions.SET_USERS:
      return { ...state, users: action.users };
    case actions.SET_TOTAL_COUNT:
      return { ...state, totalCount: action.totalCount };
    case actions.SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
};

export const setUsers = (users) => ({ type: actions.SET_USERS, users });
export const setPage = (page) => ({ type: actions.SET_PAGE, page });
export const setTotalCount = (totalCount) => ({
  type: actions.SET_TOTAL_COUNT,
  totalCount,
});
export const setIsLoading = (isLoading) => ({
  type: actions.SET_IS_LOADING,
  isLoading,
});

export default listUsersReducer;
