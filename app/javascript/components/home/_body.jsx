import React from "react";
import Routes from "../routes/_index";

import { Layout } from "antd";
const { Header, Content } = Layout;

class Body extends React.Component {
  render() {
    return (
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Routes />
        </Content>
      </Layout>
    );
  }
}

export default Body;
