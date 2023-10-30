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
import {
  Layout,
  Menu,
  Button,
  theme,
  Modal,
  Badge,
  Avatar,
  Dropdown,
  Table,
  Pagination,
  message,
  Space,
} from "antd";
import useScreenSize from "../../../utils/screenSize";

import Cookies from "js-cookie";
import { IMGURL, LIMIT, TOKEN, USER } from "../../../constants";
import { setAuth } from "../../../redux/slices/auth";
import { userObj } from "../../../redux/types";
import { request } from "../../../server";
import {
  useGetUserMutation,
  useGetUsersQuery,
  useUpgradeUserMutation,
} from "../../../redux/queries/users";

import "./style.scss";

const AdminLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState(1);
  // const [search, setSearch] = useState("");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const {
    data: { users, total } = { users: [], total: 0 },
    isFetching,
    refetch,
  } = useGetUsersQuery({
    role: "user",
    page,
    // search,
    limit: 5,
  });

  const [upgradeUser] = useUpgradeUserMutation();
  const [getUser] = useGetUserMutation();

  const { Header, Sider, Content } = Layout;

  const [meInfo, setMeInfo] = useState(userObj);

  const { firstName, lastName, photo } = meInfo;

  const getMeInfo = async () => {
    try {
      const { data } = await request("auth/me");
      setMeInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMeInfo();
  }, []);

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

  const upgradeToClient = async (id) => {
    const values = await getUser(id);
    values.role = "client";
    await upgradeUser({ id, values });
    refetch();
    message.success("User upgraded to client");
  };

  const columns = [
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() =>
              Modal.confirm({
                title: "Do you want to add this user to clients?",
                onOk: () => upgradeToClient(id),
              })
            }
          >
            Upgrade
          </Button>
        </Space>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  //   setPage(1);
  // };

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          {firstName ? firstName + " " + lastName : "Your Name"}
        </a>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <p style={{marginBottom:"0"}} onClick={showModal}>Unclient users</p>,
    },
    {
      key: "3",
      label: <Link to="/account">Account</Link>,
    },
    {
      type: "divider",
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
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const [loading, setLoading] = useState(false);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // const hasSelected = selectedRowKeys.length > 0;

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
          <div className="userName">
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
          </div>
          <div className="user">
            <h2>{firstName ? firstName + " " + lastName : "Your Name"}</h2>
            <Dropdown
              menu={{ items }}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              trigger={["click"]}
            >
              <Badge count={total}>
                <Avatar
                  shape="square"
                  src={
                    photo
                      ? IMGURL + photo
                      : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  }
                />
              </Badge>
            </Dropdown>
          </div>
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
      <Modal
        title="Unclient users"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          rowSelection={rowSelection}
          pagination={false}
          loading={isFetching}
          dataSource={users}
          columns={columns}
          bordered={true}
        />
        {total > LIMIT ? (
          <Pagination
            className="pagination"
            total={total}
            current={page}
            onChange={(page) => setPage(page)}
          />
        ) : null}
      </Modal>
    </Layout>
  );
};

export default AdminLayout;
