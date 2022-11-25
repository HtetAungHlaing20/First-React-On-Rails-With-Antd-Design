import React from "react";
import SideBar from "./_sideBar";
import Body from "./_body";

import "../../bundles/i18n/ja.js";
import "antd/dist/antd.css";

import { Layout } from "antd";
import { BrowserRouter, Route, Switch } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

class Home extends React.Component {
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
      <BrowserRouter>
        <Layout style={{ minHeight: "100vh" }}>
          <SideBar />
          <Body />
        </Layout>
      </BrowserRouter>
    );
  }
}

export default Home;
