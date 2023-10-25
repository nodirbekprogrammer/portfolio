import { Fragment, useState } from "react";
import { Button, Form, Input, Modal, Pagination, Space, Table } from "antd";
import {
  useAddPortfolioMutation,
  useDeletePortfolioMutation,
  useGetPortfolioMutation,
  useGetPortfoliosQuery,
  useUpdatePortfolioMutation,
} from "../../redux/services/portfolioService";

const PortfoliosPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, refetch } = useGetPortfoliosQuery(page);

  const [addPortfolio] = useAddPortfolioMutation();
  const [getPortfolio] = useGetPortfolioMutation();
  const [updatePortfolio] = useUpdatePortfolioMutation();
  const [deletePortfolio] = useDeletePortfolioMutation();

  const columns = [
    {
      title: "Portfolio name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Portfolio url",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <a rel="noreferrer" target="_blank" href={url}>
          {url}
        </a>
      ),
    },
    {
      title: "Portfolio description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => editPortfolio(row._id)}>
              Edit
            </Button>
            <Button
              danger
              type="primary"
              onClick={async () => {
                await deletePortfolio(row._id);
                refetch();
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setSelected(null);
    form.resetFields();
  };

  console.log(data);

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      values.photo = "6521485e1b06670014733226";
      if (selected === null) {
        await addPortfolio(values);
      } else {
        await updatePortfolio({ id: selected, body: values });
      }
      closeModal();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  async function editPortfolio(id) {
    try {
      setSelected(id);
      setIsModalOpen(true);
      const { data } = await getPortfolio(id);
      console.log(data);
      form.setFieldsValue(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      <Table
        loading={isLoading}
        bordered
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Portfolios ({data?.pagination.total})</h1>
            <Button onClick={openModal} type="primary">
              Add portfolios
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={data?.data}
        rowKey="_id"
        pagination={false}
        scroll={{ x: 800 }}
      />
      <Pagination
        total={data?.pagination.total}
        current={page}
        onChange={(page) => setPage(page)}
      />
      <Modal
        title="Portfolios data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={selected ? "Save portfolio" : "Add portfolios"}
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
            label="Portfolio name"
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
            label="Portfolio Url"
            name="url"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default PortfoliosPage;
