import logo from '../../assets/logo.png';

export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">
        <img src={logo} alt="logo" className="logo-navbar" />
      </span>

      <button className="btn btn-secondary fab-logout" alt="Logout">
        <i className="fas fa-sign-out-alt pr-2 " />
      </button>
    </div>
  );
};
