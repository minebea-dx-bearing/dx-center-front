import { useState, useCallback } from "react";
import { Button, Form, Input, Select, Checkbox } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL, key } from "../constance/constance";
import PageBreadcrumb from "../components/common/PageBreadcrumb";

const { Option } = Select;
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
export default function UserLogin() {
  const [state, setState] = useState({
    username: "",
    empNumber: "",
    password: "",
    levelUser: "",
    division: "",
    confirmpassword: "",
    oldpassword: "",
    LoginDisplay: "block",
    RegisterDisplay: "none",
    ChangPassDisplay: "none",
  });
  const updateState = (newState) => {
    setState((prev) => ({ ...prev, ...newState }));
  };
  const doLogin = useCallback(async () => {
    let command = await axios.post(`${BASE_URL}` + "/user/login", {
      empNumber: state.empNumber,password: state.password,
    });
    if (command.data.api_result === "ok") {
      localStorage.setItem(key.LOGIN_PASSED, "yes");
      localStorage.setItem("username", command.data.result.username);
      localStorage.setItem("levelUser", command.data.result.levelUser);
      localStorage.setItem("empNumber", command.data.result.empNumber);
      localStorage.setItem("division", command.data.result.division);
      await Swal.fire({
        icon: "success",
        title: "Welcome " + command.data.result.username,
        text: "to the web-site !!!",
        showConfirmButton: false,
        timer: 1000,
      });
      window.location.replace("/job_request");
    } else {
      Swal.fire({
        icon: "error",
        title: "User or Password not correct!",
      });
    }
  }, [state.empNumber, state.password]);
  const doRegister = useCallback(async () => {
    if (state.division === "" || state.levelUser === "") {
      await Swal.fire({
        icon: "error",
        text: "Please input data !",
      });
      return;
    }
    if (state.confirmpassword !== state.password) {
      Swal.fire({
        icon: "error",
        text: "Password not correct!",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      let command = await axios.post(`${BASE_URL}` + "/user/insert", {
        username: state.username,
        empNumber: state.empNumber,
        password: state.password,
        confirmpassword: state.confirmpassword,
        division: state.division,
        levelUser: state.levelUser,
      });
      if (command.data.api_result === "ok") {
        Swal.fire({
          icon: "success",
          title: "Registration",
          text: "to the web-site !!!",
          showConfirmButton: false,
          timer: 1000,
        });
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  }, [
    state.division,state.levelUser,state.confirmpassword,
    state.password,state.username,state.empNumber,
  ]);
  const doChangPass = useCallback(async () => {
    if (state.confirmpassword !== state.password) {
      Swal.fire({
        icon: "error",
        text: "Passwords do not match! Please enter correct information.",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    if (
      state.empNumber === "" || state.oldpassword === "" ||
      state.password === "" || state.confirmpassword === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Please. input data !",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "ChangePassword " + state.empNumber,
    });
    let command = await axios.put(`${BASE_URL}` + "/user/update", {
      empNumber: state.empNumber,
      oldpassword: state.oldpassword,
      password: state.password,
      confirmpassword: state.confirmpassword,
    });
    if (command.data.api_result === "ok") {
      window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: "Password not correct!",
      });
    }
  }, [
    state.confirmpassword,state.password,
    state.empNumber,state.oldpassword,
  ]);
  const renderLogin = () => {
    return (
      <div className="content" style={{ display: state.LoginDisplay }}>
        <div
          className="form-container shadow-lg"
          style={{
            width: "330px",
            textAlign: "center",
            padding: "20px",
            border: "2px solid #cce1f9",
            borderRadius: "10px",
          }}
        >
          <h3 className="title">DX Bearing</h3>
          <span className="description">Sign in to start your session</span>
          <Form
            name="basic_login"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, marginTop: "20px" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="empNumber"
              rules={[{required: true,message: "Please input your Emp.Number!"}]}
            >
              <Input
                placeholder="Emp Number"
                value={state.empNumber.toUpperCase()}
                onChange={(e) =>
                  updateState({ empNumber: e.target.value.toUpperCase() })
                }
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                value={state.password}
                onChange={(e) => updateState({ password: e.target.value })}
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  doLogin();
                }}
              >
                Log In
              </Button>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  updateState({
                    LoginDisplay: "none",
                    RegisterDisplay: "block",
                    ChangPassDisplay: "none",
                  });
                }}
              >
                Register
              </Button>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  updateState({
                    LoginDisplay: "none",
                    RegisterDisplay: "none",
                    ChangPassDisplay: "block",
                  });
                }}
              >
                Change Password
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  };
  const renderRegister = () => {
    return (
      <div className="content" style={{ display: state.RegisterDisplay }}>
        <div
          className="form-container shadow-lg"
          style={{
            width: "330px",
            textAlign: "center",
            padding: "20px",
            border: "2px solid #cce1f9",
            borderRadius: "10px",
          }}
        >
          <h3 className="title">Registration</h3>
          <span className="description">Register a new membership</span>
          <Form
            name="basic_register"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, marginTop: "20px" }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please input your Username!" }]}
            >
              <Input
                placeholder="Username"
                value={state.username}
                onChange={(e) => {
                  updateState({ username: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Emp. No"
              name="empNumber"
              rules={[{required: true,message: "Please input your Emp.Number!"}]}
            >
              <Input
                placeholder="Emp Number"
                value={state.empNumber}
                onChange={(e) => {
                  updateState({ empNumber: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                placeholder="Password"
                value={state.password}
                onChange={(e) => {
                  updateState({ password: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Confirm PW"
              name="confirmpassword"
              rules={[{required: true,message: "Please input your Confirmpassword!"}]}
            >
              <Input.Password
                placeholder="Confirm Password"
                value={state.confirmpassword}
                onChange={(e) => {
                  updateState({ confirmpassword: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Divition"
              name="division"
              rules={[{ required: true, message: "Please input your Divition!" }]}
            >
              <Select
                placeholder="Select Division"
                value={state.division}
                onChange={(value) => updateState({ division: value })}
              >
                <Option value="NMB Bearing">NMB Bearing</Option>
                <Option value="PELMEC Bearing">PELMEC Bearing</Option>
                <Option value="NHB Bearing">NHB Bearing</Option>
                <Option value="NHT Bearing">NHT Bearing</Option>
                <Option value="NAT Bearing">NAT Bearing</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="LevelUser"
              name="levelUser"
              rules={[{ required: true, message: "Please input your LevelUser!" }]}
            >
              <Select
                placeholder="Select LevelUser"
                value={state.levelUser}
                onChange={(value) => updateState({ levelUser: value })}
              >
                <Option value="Admin">Admin</Option>
                <Option value="User">User</Option>
                <Option value="Guest">Guest</Option>
              </Select>
            </Form.Item>
            <div style={{display: "flex",flexDirection: "column",gap: "10px",marginTop: "20px"}}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  doRegister();
                }}
              >
                Register
              </Button>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  updateState({
                    LoginDisplay: "block",
                    RegisterDisplay: "none",
                    ChangPassDisplay: "none",
                  });
                }}
              >
                Log In
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  };
  const renderChangPass = () => {
    return (
      <div className="content" style={{ display: state.ChangPassDisplay }}>
        <div
          className="form-container shadow-lg"
          style={{
            width: "330px",
            textAlign: "center",
            padding: "20px",
            border: "2px solid #cce1f9",
            borderRadius: "10px",
          }}
        >
          <h3 className="title">Change Password</h3>
          <span className="description" style={{ fontSize: "15px" }}>
            You are only one step a way from your new password, recover your
            password now.
          </span>
          <Form
            name="basic_changepass"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600, marginTop: "20px" }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Emp. No"
              name="empNumber"
              rules={[{ required: true, message: "Please input your EmpNumber!" }]}
            >
              <Input
                placeholder="Emp Number"
                value={state.empNumber}
                onChange={(e) => {
                  updateState({ empNumber: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Current PW"
              name="oldpassword"
              rules={[{required: true,message: "Please input your Current Password!"}]}
            >
              <Input
                placeholder="Current Password"
                value={state.oldpassword}
                onChange={(e) => {
                  updateState({ oldpassword: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                placeholder="New Password"
                value={state.password}
                onChange={(e) => {
                  updateState({ password: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Confirm PW"
              name="confirmpassword"
              rules={[{required: true,message: "Please input your Confirmpassword!"}]}
            >
              <Input.Password
                placeholder="Confirm Password"
                value={state.confirmpassword}
                onChange={(e) => {
                  updateState({ confirmpassword: e.target.value });
                }}
              />
            </Form.Item>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  doChangPass();
                }}
              >
                Change Password
              </Button>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={(e) => {
                  e.preventDefault();
                  updateState({
                    LoginDisplay: "block",
                    RegisterDisplay: "none",
                    ChangPassDisplay: "none",
                  });
                }}
              >
                Log In
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  };
  return (
    <div className="content-wrapper">
      <div className="min-h-screen justify-center grid gap-4 bg-gradient-to-br from-teal-200 via-white to-gray-200">
        <div className="text-center mt-8 px-2">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800 drop-shadow-md">DX Bearing</h1>
          <p className="text-lg md:text-xl mt-3 text-slate-500">Digital Transformation</p>
          <h5 />
          <PageBreadcrumb pageTitle="LOG-IN" />
        </div>
        {renderLogin()}
        {renderRegister()}
        {renderChangPass()}
      </div>
    </div>
  );
}