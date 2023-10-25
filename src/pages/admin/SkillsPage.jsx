import { Button, Form, Input, Modal, Space, Table, message } from "antd";
import { Fragment, useEffect } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  addSkill,
  controlModal,
  deleteSkill,
  editSkill,
  getSkill,
  getSkills,
  showModal,
  updateSkill,
} from "../../redux/slices/skillSlice";

import { useDispatch, useSelector } from "react-redux";

const SkillsPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { skills, isModalOpen, selected, loading, total, btnLoading } =
    useSelector((state) => state.skill);

  useEffect(() => {
    dispatch(getSkill());
  }, [dispatch]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percents",
      dataIndex: "percent",
      key: "percent",
    },

    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              onClick={async () => {
                await dispatch(editSkill(row._id));
                await dispatch(getSkill());
                let { payload } = await dispatch(getSkills(row._id));
                console.log(payload);
                form.setFieldsValue(payload);
              }}
            >
              Edit
            </Button>
            <Button
              danger
              type="primary"
              onClick={() => confirmDeleteSkill(row._id)}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  function confirmDeleteSkill(id) {
    Modal.confirm({
      title: "Do you want to delete this skill ?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        // await dispatch(deleteSkill(row.id));
        await dispatch(deleteSkill(id));
        await dispatch(getSkill());
      },
      okText: "Yes",
      cancelText: "No",
    });
  }

  const closeModal = () => {
    dispatch(controlModal());
  };

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      if (selected === null) {
        await dispatch(addSkill(values));
      } else {
        await dispatch(updateSkill({ id: selected, values }));
      }
      closeModal();
      await dispatch(getSkill());
    } catch (error) {
      message.error("An error occurred");
    }
  };

  return (
    <Fragment>
      <Table
        loading={loading}
        bordered
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Skills ({total})</h1>
            <Button onClick={() => dispatch(showModal(form))} type="primary">
              Add skill
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={skills}
        rowKey="_id"
      />

      <Modal
        title="Skills data"
        confirmLoading={btnLoading}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={selected ? "Save skill" : "Add skill"}
      >
        <Form
          form={form}
          name="category"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Skill name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Percent"
            name="percent"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SkillsPage;
