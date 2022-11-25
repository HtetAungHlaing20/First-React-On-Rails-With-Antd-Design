import React from "react";
import I18n from "i18n-js";
import "../../bundles/i18n/ja.js";
import { Breadcrumb, Table, message, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

class User extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.loadUserData();
  }

  columns = [
    {
      title: I18n.t("user.id"),
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: I18n.t("user.user_name"),
      dataIndex: "user_name",
      key: "user_name",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: I18n.t("user.user_name_last"),
      dataIndex: "user_name_last",
      key: "user_name_last",
      width: "40%",
      sorter: (a, b) => a.user_name_last.length - b.user_name_last.length,
    },
    {
      title: I18n.t("user.action"),
      key: "action",
      render: (_text, record) => (
        <Space size="middle">
          <a onClick={() => this.editStatus(record)}>
            <EditOutlined />
          </a>
          <Popconfirm
            title="削除してもよろしいでしょうか？"
            onConfirm={() => this.deleteStatus(record)}
            okText="Yes"
            cancelText="No"
          >
            <a href="#" type="danger">
              <DeleteOutlined />{" "}
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  loadUserData = () => {
    const url = "/api/v1/user/index";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        if (data.users.length > 0) {
          data.users.forEach((user) => {
            const newEl = {
              key: user.id,
              id: user.id,
              user_name: user.user_name,
              user_name_last: user.user_name_last,
            };

            this.setState((prevState) => ({
              users: [...prevState.users, newEl],
            }));
          });
        } else {
          console.log("NO DATA");
        }
      })
      .catch((err) => message.error("Error: " + err));
  };

  render() {
    return (
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>User</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Table
            className="table-striped-rows"
            dataSource={this.state.users}
            columns={this.columns}
            pagination={{ pageSize: 5 }}
          />
          ;
        </div>
      </>
    );
  }
}

export default User;
