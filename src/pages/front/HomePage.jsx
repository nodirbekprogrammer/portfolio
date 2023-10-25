// import { useNavigate } from "react-router-dom";
// import request from "../../server";
// import { message } from "antd";
// import Cookies from "js-cookie";
// import { TOKEN } from "../../constants";
// import { controlAuthenticated } from "../../redux/slices/authSlice";
// import { useDispatch } from "react-redux";

// const HomePage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const login = async () => {
//     try {
//       let user = { username: "abdulaziz", password: "12345" };

//       let { data } = await request.post("auth/login", user);

//       if (data.user.role === "admin") {
//         navigate("/dashboard");
//         dispatch(controlAuthenticated(true));
//         Cookies.set(TOKEN, data.token);
//       } else {
//         message.error("You are not admin");
//       }
//     } catch (err) {
//       message.error("Password or username is incorrect");
//     }
//   };
//   return (
//     <div>
//       <button onClick={login}>Login</button>
//     </div>
//   );
// };

// export default HomePage;

import { Button, Form, Input, message } from "antd";

import { useNavigate } from "react-router-dom";
import request from "../../server";
import Cookies from "js-cookie";
import { TOKEN } from "../../constants";
import { useDispatch } from "react-redux";
import { controlAuthenticated } from "../../redux/slices/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const login = async () => {
    try {
      const formData = await form.validateFields();
      console.log(formData);
      let { data } = await request.post("auth/login", formData);
      console.log(data);

      if (data.user.role === "admin") {
        navigate("/dashboard");
        dispatch(controlAuthenticated(true));
        Cookies.set(TOKEN, data.token);
      } else {
        message.error("You are not admin");
      }
    } catch (err) {
      message.error("Password or username is incorrect");
    }
  };
  return (
    <div className="form-bg">
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          form={form}
          name="login"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
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
            <Input placeholder="abdulaziz" />
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
            <Input.Password placeholder="12345"/>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button
              style={{ width: "100%" }}
              type="primary"
              onClick={() => dispatch(login)}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
