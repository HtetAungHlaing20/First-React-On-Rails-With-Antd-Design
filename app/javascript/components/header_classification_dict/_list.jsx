import React from "react";
import I18n from "i18n-js";
import "../../bundles/i18n/ja.js";
import Highlighter from "react-highlight-words";
import { Form, Input, Button, Table, Popconfirm, Space, Tooltip } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class HeaderClassificationDictList extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleReset = (clearFilters) => {
    clearFilters();
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  sortData = (data) => {
    return data.slice().sort((a, b) => a.display_order - b.display_order);
  };

  columns = [
    {
      title: I18n.t("header_classification_dict.display_order"),
      dataIndex: "display_order",
      key: "display_order",
      align: "center",
      width: "10%",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.display_order - b.display_order,
    },
    {
      title: I18n.t("header_classification_dict.header_classification"),
      dataIndex: "header_classification",
      key: "header_classification",
      width: "40%",
      ...this.getColumnSearchProps("header_classification"),
    },
    {
      title: I18n.t("header_classification_dict.keyword"),
      dataIndex: "keyword",
      key: "keyword",
      width: "40%",
      ...this.getColumnSearchProps("keyword"),
    },
    {
      title: I18n.t("header_classification_dict.action"),
      key: "action",
      align: "center",
      render: (_text, record) => (
        <Space size="middle">
          <a onClick={() => this.props.editStatus(record)}>
            <Tooltip placement="topLeft" title="Edit">
              <EditOutlined />
            </Tooltip>
          </a>
          <Popconfirm
            title="削除してもよろしいでしょうか？"
            onConfirm={() => this.props.deleteStatus(record)}
            okText="Yes"
            cancelText="No"
          >
            <a href="#" type="danger">
              <Tooltip placement="topLeft" title="Delete">
                <DeleteOutlined />{" "}
              </Tooltip>
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  render() {
    return (
      <Form
        {...layout}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        style={{ marginTop: 20 }}
      >
        <div className="site-layout-background" style={{ minHeight: 360 }}>
          <Table
            bordered
            align="center"
            className="table-striped-rows"
            dataSource={this.sortData(this.props.header_classification_dicts)}
            columns={this.columns}
            pagination={{
              pageSize: 10,
              showTotal: (total, range) =>
                `${total}件の中から${range[0]}から${range[1]}を表示`,
              position: "relative",
              right: 0,
              align: "center",
            }}
            total={this.props.header_classification_dicts.length}
            style={{
              whiteSpace: "pre",
            }}
          />
        </div>
      </Form>
    );
  }
}

export default HeaderClassificationDictList;
