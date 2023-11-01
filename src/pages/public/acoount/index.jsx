import { Tabs } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";

import "./style.scss"

const UserAccount = () => {
  return (
    <div className="container user-account">
      <Tabs
        size="large" 
        defaultActiveKey="1"
        items={[UserOutlined, KeyOutlined].map((Icon, i) => {
          const id = String(i + 1);
          return {
            label: (
              <span>
                <Icon />
                Tab {id}
              </span>
            ),
            key: id,
            children: `Tab ${id}`,
          };
        })}
      />
    </div>
  );
};

export default UserAccount;
