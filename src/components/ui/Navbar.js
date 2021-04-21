import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';
import { clearEvents } from '../../redux/actions/events';
import logo from '../../assets/logo.png';

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearEvents());
    dispatch(startLogout());
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">
        <img src={logo} alt="logo" className="logo-navbar" />
      </span>
      <label style={{ color: 'white', paddingLeft: '80%', marginTop: '10px' }}>
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
