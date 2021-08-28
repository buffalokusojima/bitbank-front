export enum UserInfoActionType {
  ADD_COUNT = 'ADD_COUNT',
  RESET_COUNT = 'RESET_COUNT',
}

export interface UserInfoAction {
  type: UserInfoActionType;
  value?: object;
}

export const setUserInfo = (value: object): UserInfoAction => ({
  type: UserInfoActionType.ADD_COUNT,
  value,
});

export const removeUserInfo = (): UserInfoAction => ({
  type: UserInfoActionType.RESET_COUNT,
});
