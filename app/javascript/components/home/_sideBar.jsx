import React from "react";
import I18n from "i18n-js";
import "../../bundles/i18n/ja.js";

import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import logo from "../../../../app/assets/images/logo.svg";
const { Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div>
          <img
            src={logo}
            className="logo"
            alt="logo"
            style={{
              height: "64px",
              marginLeft: "1rem",
            }}
          />
        </div>
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu
            key="sub1"
            icon={<UserOutlined />}
            title={I18n.t("home.menu1.title")}
          >
            <Menu.Item key="1">
              <Link to="/samples"> {I18n.t("home.menu1.side1")}</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/users"> {I18n.t("home.menu1.side2")}</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/header_classification_dicts">
                {" "}
                {I18n.t("home.menu1.side8")}
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="8" icon={<UserOutlined />}>
            {I18n.t("home.menu2.title")}
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideBar;
