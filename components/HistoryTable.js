import { Table, Button } from 'antd';

export default function HistoryTable({ history, loadMore }) {
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  };

  const columns = [
    {
      title: 'File Name',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <a href={record.link}>{text}</a>,
    },
    {
      title: 'Import Date & Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => formatDate(date),
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => formatDate(date),
    },
    {
      title: 'Failed',
      dataIndex: 'failedJobs',
      key: 'failedJobs',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (date) => formatDate(date),
    },
  ];

  return (
    <div>
      <Button onClick={loadMore} style={{ marginBottom: '10px' }}>Load More</Button>
      <Table
        columns={columns}
        dataSource={history}
        rowKey={(record, index) => index}
        pagination={true}
      />
    </div>
  );
}
