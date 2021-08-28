import { UserInfoAction, UserInfoActionType } from '../actions/UserInfo';

export interface UserInfoState {
  value: object;
}

const initialState: UserInfoState = {
  value: {},
};

const userInfoReducer = (
  state: UserInfoState = initialState,
  action: UserInfoAction,
): UserInfoState => {
  switch (action.type) {
    case UserInfoActionType.ADD_COUNT:
      return {
        ...state,
        value: (action.value || {}),
      };
    case UserInfoActionType.RESET_COUNT:
      return {
        ...state,
        value: {},
      };
    default:
      return state;
  }
};

export default userInfoReducer;
