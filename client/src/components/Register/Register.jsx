import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { fetchRegister } from "../../redux/slices/auth";

function Register({ toggle, setToggle }) {
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isValidPassword, setIsValidPassword] = React.useState("");
  const [isValidEmail, setIsValidEmail] = React.useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (value) => {
    if (value.password !== confirmPassword) {
      setConfirmPassword("");
      setIsValidPassword("Пароль не совпадают");
      setTimeout(() => setIsValidEmail(""), 3000);
      return;
    }

    const data = await dispatch(fetchRegister(value));

    if (data.error?.message === "Request failed with status code 400") {
      setIsValidEmail("Данный емейл уже зарегистрирован");
      setTimeout(() => setIsValidEmail(""), 3000);
    }

    if (data.payload) {
      localStorage.setItem("token", data.payload.token);
    }
    if (data.payload?.user) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Welcome</h3>
      <div>
        <input
          type="text"
          placeholder={errors.fristName?.message || "Введите имя"}
          className={errors.fristName?.message && "error"}
          {...register("fristName", {
            required: {
              value: true,
              message: "Введите имя",
            },
            minLength: {
              value: 3,
              message: "Минимум 3 буков",
            },
          })}
        />
        <input
          type="text"
          placeholder={errors.lastName?.message || "Введите фамилию"}
          className={errors.lastName?.message && "error"}
          {...register("lastName", {
            required: {
              value: true,
              message: "Введите фамилю",
            },
            minLength: {
              value: 3,
              message: "Минимум 3 буков",
            },
          })}
        />
      </div>
      <input
        type="text"
        placeholder={errors.email?.message || (isValidEmail && "e-mail")}
        className={errors.email?.message || (isValidEmail && "error")}
        {...register("email", {
          required: {
            value: true,
            message: "введите адрес электронной почты",
          },
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Введите,  действительный адрес электронной почты",
          },
        })}
      />
      <div>
        <input
          type="password"
          placeholder={errors.password?.message || "Придумайте пароль "}
          className={errors.password?.message && "error"}
          autoComplete="off"
          {...register("password", {
            required: {
              value: true,
              message: "Придумайте пароль",
            },
            minLength: {
              value: 6,
              message: "Минимум 6 буков",
            },
          })}
        />
        <input
          type="password"
          placeholder={isValidPassword || "подтвердите пароль"}
          autoComplete="off"
          className={isValidPassword && "error"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          Войти
        </button>
        <button className="button" type="submit">
          Зарегистрироваться
        </button>
      </div>
    </form>
  );
}

export default Register;
