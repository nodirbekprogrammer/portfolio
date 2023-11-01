import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";


import { request } from "../../../server";
import { setAuth } from "../../../redux/slices/auth";
import { TOKEN, USER } from "../../../constants";
import "./style.scss";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (values) => {
    try {
      const {
        data: { token, user },
      } = await request.post("auth/register", values);

      Cookies.set(TOKEN, token);
      localStorage.setItem(USER, JSON.stringify(user));
      request.defaults.headers.Authorization = `Bearer ${token}`;
      navigate("/dashboard");
      dispatch(setAuth(user));
      message.success("You registered succesully!");
    } catch (error) {
      message.error(error.response.data.message);
    }
    
  };
  return (
    <section className="register">
      <div className="container">
        <Form
          className="register-form"
          name="register"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={register}
          autoComplete="off"
        >
          <Form.Item>
            <h2 className="register__title">Register</h2>
          </Form.Item>
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your firstname!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            className="btn-container"
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <button className="submit-btn" type="submit">
              Register
            </button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default RegisterPage;
