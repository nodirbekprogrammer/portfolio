import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  BookOutlined,
  CheckSquareOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  ReadOutlined,
  StarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Modal } from "antd";
import useScreenSize from "../../../utils/screenSize";

import "./style.scss";
import Cookies from "js-cookie";
import { TOKEN, USER } from "../../../constants";
import { setAuth } from "../../../redux/slices/auth";

const AdminLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Header, Sider, Content } = Layout;

  const logout = () => {
    Cookies.remove(TOKEN);
    localStorage.removeItem(USER);
    setAuth();
    navigate("/");
  };

  useEffect(() => {
    if (screenSize <= 650) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screenSize]);

  return (
    <Layout>
      <Sider
        className="dashboard-sider"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <h3 className="dashboard-logo">{collapsed ? "NN" : "NN Dashboard"}</h3>
        <Menu
          className="menu"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={pathname}
          items={[
            {
              key: "/dashboard",
              icon: <DashboardOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/users",
              icon: <TeamOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              key: "/portfolios",
              icon: <BookOutlined />,
              label: <Link to="/portfolios">Portfolios</Link>,
            },
            {
              key: "/education",
              icon: <ReadOutlined />,
              label: <Link to="/education">Education</Link>,
            },
            {
              key: "/experience",
              icon: <CheckSquareOutlined />,
              label: <Link to="/experience">Experience</Link>,
            },
            {
              key: "/skills",
              icon: <StarOutlined />,
              label: <Link to="/skills">Skills</Link>,
            },
            {
              key: "/messages",
              icon: <MessageOutlined />,
              label: <Link to="/messages">Messages</Link>,
            },
            {
              key: "4",
              icon: <LogoutOutlined />,
              label: (
                <Button
                  danger
                  type="primary"
                  onClick={() =>
                    Modal.confirm({
                      title: "Do you want to log out ?",
                      onOk: () => logout(),
                    })
                  }
                >
                  Logout
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="dashboard-header"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="dashboard-main"
          style={{
            padding: 24,
            margin: "24px 16px",
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
