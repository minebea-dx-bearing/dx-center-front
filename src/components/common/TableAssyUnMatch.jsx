import { Table } from 'antd';

function TableAssyUnMatch({data, columns}) {

  return (
    <div>
        <div className='flex justify-center'>
           <Table columns={columns} dataSource={data} />
        </div>
    </div>
  )
}

export default TableAssyUnMatch