import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';
import { eventPurge } from '../../redux/actions/events';
import logo from '../../assets/logo.svg';

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(eventPurge());
    dispatch(startLogout());
  };

  return (
    <div className="navbar navbar-light bg-light mb-4">
      <span className="navbar-brand">
        <img src={logo} alt="logo" className="logo-navbar" />
      </span>
      <label style={{ color: 'black', paddingLeft: '80%', marginTop: '10px' }}>
        {name}
      </label>
      <button
        className="btn btn-secondary fab-logout"
        alt="Logout"
        onClick={handleLogout}
      >
        <i className="fas fa-sign-out-alt pr-2 " />
      </button>
    </div>
  );
};
