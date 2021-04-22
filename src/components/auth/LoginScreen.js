import './login.css';
import Swal from 'sweetalert2';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../redux/actions/auth';
import logo from '../../assets/logo.svg';

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: '',
    lPassword: '',
  });

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: '',
    rEmail: '',
    rPassword: '',
    rPasswordRepeat: '',
  });

  const { lEmail, lPassword } = formLoginValues;
  const { rName, rEmail, rPassword, rPasswordRepeat } = formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      if (!validator.isEmail(lEmail)) {
        return Swal.fire(
          'Error',
          'Email is required, needs to be valid ex: email@email.com',
          'error',
        );
      }
      if (lPassword.length === 0) {
        return Swal.fire('Error', 'Password is required', 'error');
      }
      if (
        !validator.isStrongPassword(lPassword, [
          {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          },
        ])
      ) {
        return Swal.fire(
          'Error',
          'Passoword is required, needs to be a Strong password ex: Strong1@, min conditions 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 symbol',
          'error',
        );
      }
      dispatch(startLogin(lEmail, lPassword));
    } catch (error) {
      Swal.fire('Error', error, 'error');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    try {
      if (rName.length < 2) {
        return Swal.fire('Error', 'Name is required, min lenght 2', 'error');
      }
      if (!validator.isEmail(rEmail)) {
        return Swal.fire(
          'Error',
          'Email is required, needs to be valid ex: email@email.com',
          'error',
        );
      }
      if (rPassword.length === 0) {
        return Swal.fire('Error', 'Password is required', 'error');
      }
      if (
        !validator.isStrongPassword(rPassword, [
          {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          },
        ])
      ) {
        return Swal.fire(
          'Error',
          'Passoword is required, needs to be a Strong password ex: Strong1@, min conditions 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 symbol',
          'error',
        );
      }
      if (rPassword !== rPasswordRepeat) {
        return Swal.fire(
          'Error',
          `Password and confirmation password doesn't match`,
          'error',
        );
      }
      dispatch(startRegister(rName, rEmail, rPassword));
    } catch (error) {
      Swal.fire('Error', error, 'error');
    }

    // console.log(rName, rEmail, rPassword);
  };

  return (
    <div className="container login-container">
      <span>
        <img src={logo} alt="logo" className="logo-login" />
      </span>
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Sign in</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Sign up</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="rPassword"
                value={rPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repeat password"
                name="rPasswordRepeat"
                value={rPasswordRepeat}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                className="btnSubmit"
                value="Create Account"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
