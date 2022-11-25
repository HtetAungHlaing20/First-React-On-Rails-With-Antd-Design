import React from "react";
import "../../bundles/i18n/ja.js";
import I18n from "i18n-js";
import { Button, Form, Input, Card, Alert, Row, Col, InputNumber } from "antd";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class HeaderClassificationDictEntry extends React.Component {
  formRef = React.createRef();
  onFinish = (values) => {
    this.props.headerClassificationDict(values, this.formRef);
  };

  render() {
    if (this.props.update_flag == true) {
      let id = this.props.id;
      let keyword = this.props.keyword;
      let header_classification = this.props.header_classification;
      let display_order = parseInt(this.props.display_order);
      console.log("display_order is " + display_order);
      this.formRef.current.setFieldsValue({
        id: id,
        keyword: keyword,
        display_order: display_order,
        header_classification: header_classification,
      });
    }
    return (
      <Form
        {...layout}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={this.onFinish}
        ref={this.formRef}
        style={{ marginTop: 30 }}
      >
        <Card>
          <Row>
            <Col span={12} offset={6}>
              {this.props.visible
                ? (console.log(),
                  (
                    <Alert
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 4 }}
                      message={this.props.message}
                      type={this.props.type}
                      afterClose={this.props.messageClose}
                      closable
                    />
                  ))
                : null}
            </Col>
          </Row>
          <Form.Item
            style={{ marginTop: 30 }}
            name="display_order"
            label="表示順"
            rules={[
              {
                required: true,
                message: I18n.t("message.M013"),
              },
            ]}
          >
            <InputNumber
              min={1}
              style={{
                width: 414.4,
              }}
            />
          </Form.Item>

          <Form.Item
            label="見出し分類"
            name="header_classification"
            rules={[
              {
                required: true,
                message: I18n.t("message.M015"),
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="id" hidden={true}>
            <Input type="text" />
          </Form.Item>

          <Form.Item
            name="keyword"
            label="キーワード"
            rules={[
              {
                required: true,
                message: I18n.t("message.M017"),
                whitespace: true,
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Card>
      </Form>
    );
  }
}

export default HeaderClassificationDictEntry;
