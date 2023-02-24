import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { fetchLogin } from "../../redux/slices/auth";

function Login({ toggle, setToggle }) {
  const [errorMsg, setErrorMsg] = React.useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (value) => {
    const data = await dispatch(fetchLogin(value));
    if (data.payload?.token) {
      window.localStorage.setItem("token", data.payload.token);
      navigate("/");
    }

    if (data.error?.message) {
      setErrorMsg("неправильный логин или пароль");
      setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Welcome</h3>

      <input
        type="text"
        placeholder={
          errors.email?.message || errorMsg || "Введите логин или e-mail"
        }
        className={errors.email?.message || (errorMsg && "error")}
        {...register("email", {
          required: {
            value: true,
            message: "введите действительный адрес электронной почты",
          },
        })}
      />

      <input
        type="password"
        placeholder={errors.password?.message || errorMsg || "Введите пароль"}
        autoComplete="off"
        className={errors.password?.message || (errorMsg && "error")}
        {...register("password", {
          required: {
            value: true,
            message: "Введите пароль",
          },
        })}
      />

      <Link to="/password">Забыли пароль?</Link>
      <div>
        <button
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          Создать аккаунт
        </button>
        <button type="submit" className="button">
          Войти
        </button>
      </div>
    </form>
  );
}

export default Login;
