import { BiLogIn, BiUserCircle } from 'react-icons/bi';
import { BsFacebook } from 'react-icons/bs';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

/* ~~~~~~~~~~~~~~~ */

/* The initial state for the useForm hook. (login) */
const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

/* The initial state for the useForm hook. (register) */
const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
};

/* ~~~~~~~~~~~~~~~ */

const LoginPage = () => {
  const { startLogin, startRegister, errorMsg } = useAuthStore();

  /* Destructuring the object returned by the useForm hook. */
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const loginSubmit = (e) => {
    e.preventDefault();

    // console.log({ email: loginEmail, password: loginPassword });
    startLogin({ email: loginEmail, password: loginPassword });
  };

  /* Destructuring the object returned by the useForm hook. */
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const registerSubmit = (e) => {
    e.preventDefault();

    if (registerPassword !== registerPassword2) {
      Swal.fire('Register Error', 'Passwords are not the same', 'error');
      return;
    }

    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };

  useEffect(() => {
    if (errorMsg !== undefined) {
      Swal.fire('Authentication Error', errorMsg, 'error');
    }
  }, [errorMsg]);

  return (
    <>
      <div className="bg-vintage md:w-full md:h-screen">
        <div className="container mx-auto">
          <div className="text-center p-2 pt-5">
            <h1 className="text-primary font-extrabold text-2xl md:text-4xl p-1">
              CalendarIo
            </h1>
            <h2 className="text-secondary text-md p-2">
              The right place to order all your valuable time and that you never
              forget anything again.
            </h2>
          </div>

          <div className="block md:flex md:justify-center">
            {/* Login View */}
            <div className="bg-white m-4 md:m-2 mb-3 rounded-md shadow-xl md:w-4/12 h-5/6">
              <div className="p-2">
                <div className="flex justify-center p-2">
                  <BiLogIn className="text-4xl text-secondary mt-4" />
                </div>
                <div>
                  <h2 className="text-center font-bold text-xl text-secondary">
                    Welcome!!
                  </h2>
                  <p className="text-center text-title2">
                    Sign in to your account
                  </p>
                </div>
              </div>

              <div className="p-4">
                <form onSubmit={loginSubmit}>
                  <div className="my-4 text-title2">
                    <div>
                      <label htmlFor="emaillogin">User or Email</label>
                    </div>
                    <input
                      type="email"
                      id="emaillogin"
                      className="w-full border-b-2 mt-1 focus:outline-none"
                      name="loginEmail"
                      value={loginEmail}
                      onChange={onLoginInputChange}
                    />
                  </div>

                  <div className="my-4 text-title2">
                    <div>
                      <label htmlFor="password">Password</label>
                    </div>
                    <input
                      type="password"
                      id="password"
                      className="w-full border-b-2 mt-1 focus:outline-none"
                      name="loginPassword"
                      value={loginPassword}
                      onChange={onLoginInputChange}
                    />
                  </div>

                  <div className="flex text-title2 justify-between">
                    <div>
                      <input type="checkbox" name="remember" />
                      <label className="ml-2">remember me</label>
                    </div>
                    <div className="text-secondary font-semibold">
                      <button>forgot password?</button>
                    </div>
                  </div>

                  <div>
                    <input
                      type="submit"
                      value={`Login`}
                      className="bg-space text-vintage font-bold hover:bg-secondary transition-colors px-8 py-1 mt-4 mb-2 rounded-md"
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Register View */}
            <div className="bg-white m-4 md:m-2 mb-3 rounded-md shadow-xl md:w-4/12">
              <div className="p-2">
                <div className="flex justify-center p-2">
                  <BiUserCircle className="text-4xl text-secondary mt-4" />
                </div>
                <div>
                  <h2 className="text-center font-bold text-xl text-secondary">
                    Create account!!
                  </h2>
                </div>
              </div>

              <div className="p-4">
                <form onSubmit={registerSubmit}>
                  <div className="my-4 text-title2">
                    <div>
                      <label htmlFor="name">Name</label>
                    </div>
                    <input
                      type="text"
                      id="name"
                      className="w-full border-b-2 mt-1 focus:outline-none"
                      name="registerName"
                      value={registerName}
                      onChange={onRegisterInputChange}
                    />
                  </div>

                  <div className="my-4 text-title2">
                    <div>
                      <label htmlFor="emailregister">Email</label>
                    </div>
                    <input
                      type="email"
                      id="emailregister"
                      className="w-full border-b-2 mt-1 focus:outline-none"
                      name="registerEmail"
                      value={registerEmail}
                      onChange={onRegisterInputChange}
                    />
                  </div>

                  <div className="my-4 text-title2">
                    <div>
                      <label htmlFor="passwordregister">Password</label>
                    </div>
                    <input
                      type="password"
                      id="passwordregister"
                      className="w-full border-b-2 mt-1 focus:outline-none"
                      name="registerPassword"
                      value={registerPassword}
                      onChange={onRegisterInputChange}
                    />
                  </div>

                  <div className="my-4 text-title2">
                    <div>
                      <label htmlFor="password2">Password again</label>
                    </div>
                    <input
                      type="password"
                      id="password2"
                      className="w-full border-b-2 mt-1 focus:outline-none"
                      name="registerPassword2"
                      value={registerPassword2}
                      onChange={onRegisterInputChange}
                    />
                  </div>

                  <div>
                    <input
                      type="submit"
                      value={`Create`}
                      className="bg-space text-vintage font-bold hover:bg-secondary transition-colors px-8 py-1 mt-4 mb-2 rounded-md"
                    />
                  </div>
                </form>

                <hr className="mt-6 mb-2" />
                <div>
                  <p className="text-md text-secondary">
                    Or create account using social media!
                  </p>
                  <div className="flex text-space justify-around p-2 text-2xl mt-2">
                    <BsFacebook />
                    <AiFillTwitterCircle />
                    <BsGithub />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
