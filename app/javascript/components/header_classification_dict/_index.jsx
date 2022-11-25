import React from "react";
import "../../bundles/i18n/ja.js";
import I18n from "i18n-js";
import HeaderClassificationDictEntry from "./_entry.jsx";
import HeaderClassificationDictList from "./_list.jsx";

class HeaderClassificationDict extends React.Component {
  state = {
    header_classification_dicts: [],
    update_flag: false,
    id: "",
    keyword: "",
    display_order: "",
    header_classification: "",
    message: "",
    visible: false,
    type: "",
  };

  loadHeaderClassificationDictData = () => {
    const url = "/api/v1/header_classification_dict/load";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        } else {
          this.setState({
            message: I18n.t("message.M060"),
            type: "error",
            visible: true,
          });
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        if (data.length > 0) {
          data.forEach((header_classification_dict) => {
            const newEl = {
              key: header_classification_dict.id,
              id: header_classification_dict.id,
              display_order: parseInt(header_classification_dict.display_order),
              header_classification:
                header_classification_dict.header_classification,
              keyword: header_classification_dict.keyword,
            };

            this.setState((prevState) => ({
              header_classification_dicts: [
                ...prevState.header_classification_dicts,
                newEl,
              ],
            }));
          });
        }
      });
  };

  componentDidMount() {
    this.loadHeaderClassificationDictData();
  }

  createHeaderClassificationDict = (values, form) => {
    const url = "/api/v1/header_classification_dict/create";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: values.id,
        display_order: parseInt(values.display_order),
        header_classification: values.header_classification,
        keyword: values.keyword,
      }),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
      })
      .then((data) => {
        if (data.errStatus == 1) {
          this.setState({
            message: data.message,
            type: data.messageType,
            visible: true,
          });
        } else {
          const newEl = {
            key: data.id,
            id: data.id,
            display_order: parseInt(data.display_order),
            header_classification: data.header_classification,
            keyword: data.keyword,
          };

          this.setState((prevState) => ({
            header_classification_dicts: [
              ...prevState.header_classification_dicts,
              newEl,
            ],
          }));

          form.current.resetFields();

          this.setState({
            message: I18n.t("message.M004"),
            type: "success",
            visible: true,
          });
        }
      })
      .catch((err) => console.error("Error: " + err));
  };

  editStatus = (record) => {
    this.setState({
      update_flag: true,
      id: record.id,
      keyword: record.keyword,
      display_order: parseInt(record.display_order),
      header_classification: record.header_classification,
      visible: false,
    });
  };

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  updateHeaderClassificationDict = (record, myForm) => {
    const url = `/api/v1/header_classification_dict/update/${record.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: record.id,
        display_order: parseInt(record.display_order),
        header_classification: record.header_classification,
        keyword: record.keyword,
      }),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
      })
      .then((data) => {
        if (data.errStatus == 1) {
          this.setState({
            message: data.message,
            type: data.messageType,
            visible: true,
          });
        } else {
          this.setState({
            message: I18n.t("message.M005"),
            type: "success",
            visible: true,
          });
          this.handleUpdate(record);
        }
      });
    myForm.current.resetFields();
  };

  messageClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleUpdate(record) {
    var dataIndex = this.state.header_classification_dicts.findIndex(
      (x) => x.id === record.id
    );
    this.setState({
      header_classification_dicts: [
        ...this.state.header_classification_dicts.slice(0, dataIndex),
        Object.assign(
          {},
          this.state.header_classification_dicts[dataIndex],
          record
        ),
        ...this.state.header_classification_dicts.slice(dataIndex + 1),
      ],
    });
  }

  handleDelete(id) {
    let newDeleteData = this.state.header_classification_dicts.filter(
      (record) => record.id !== id
    );
    this.setState({
      header_classification_dicts: newDeleteData,
    });
  }

  deleteStatus = (record) => {
    const url = `/api/v1/header_classification_dict/${record.id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
      })
      .then((data) => {
        if (data.errStatus == 1) {
          this.setState({
            message: data.message,
            type: data.messageType,
            visible: true,
          });
        } else {
          this.setState({
            message: I18n.t("message.M007"),
            type: "success",
            visible: true,
          });
          this.handleDelete(record.id);
        }
      });
  };

  headerClassificationDict = (values, myForm) => {
    if (this.state.update_flag) {
      this.updateHeaderClassificationDict(values, myForm);
      this.state.update_flag = false;
    } else {
      let entryArray = this.state.header_classification_dicts.filter(
        (res) => res.display_order == values.display_order
      );
      let entryHeaderArray = this.state.header_classification_dicts.filter(
        (res) => res.header_classification == values.header_classification
      );
      if (Object.keys(entryArray).length == 1) {
        this.setState({
          message: I18n.t("message.M014"),
          type: "error",
          visible: true,
        });
      } else if (Object.keys(entryHeaderArray).length == 1) {
        this.setState({
          message: I18n.t("message.M016"),
          type: "error",
          visible: true,
        });
      } else {
        this.createHeaderClassificationDict(values, myForm);
      }
    }
  };

  render() {
    const { header_classification_dicts } = this.state;
    return (
      <div>
        <HeaderClassificationDictEntry
          headerClassificationDict={this.headerClassificationDict}
          update_flag={this.state.update_flag}
          id={this.state.id}
          keyword={this.state.keyword}
          header_classification={this.state.header_classification}
          display_order={this.state.display_order}
          message={this.state.message}
          type={this.state.type}
          visible={this.state.visible}
          messageClose={this.messageClose}
        />
        <HeaderClassificationDictList
          header_classification_dicts={header_classification_dicts}
          reloadHeaderClassificationDicts={this.reloadHeaderClassificationDicts}
          editStatus={this.editStatus}
          deleteStatus={this.deleteStatus}
        />
      </div>
    );
  }
}

export default HeaderClassificationDict;
