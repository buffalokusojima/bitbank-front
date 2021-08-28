import { AppState } from '../Reducer';
import { Signinbutton, Signoutbutton, UserInfoProps } from '../components/buttons/Button';
import { Dispatch } from 'redux';
import { UserInfoAction, setUserInfo, removeUserInfo } from '../actions/UserInfo'
import { connect } from 'react-redux';


interface DispatchProps {
  setUserInfo: (val: object) => void;
  removeUserInfo: () => void;
}

const mapStateToProps = (state: AppState): UserInfoProps => ({
  value: state.setter.value,
});

const mapDispatchToProps = (dispatch: Dispatch<UserInfoAction>): DispatchProps => ({
  setUserInfo: (val: object) => {
    dispatch(setUserInfo(val));
  },
  removeUserInfo: () => {
    dispatch(removeUserInfo());
  },
});

export const SigninButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signinbutton);

export const SignoutButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signoutbutton);
