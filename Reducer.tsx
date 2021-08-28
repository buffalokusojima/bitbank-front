import userInfoReducer, {UserInfoState} from './reducers/UserInfoReducer';
import { combineReducers } from 'redux';

export interface AppState {
  setter: UserInfoState;
}

const appReducer = combineReducers<AppState>({
  setter: userInfoReducer,
});

export default appReducer;
