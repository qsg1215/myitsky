# 自定义hooks(抽取分页逻辑)


### hooks
hooks/useModal.js
```js
import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  }
};

export default useModal;
```

hooks/usePagination.js
```js
import { useState } from 'react';

export default  () => {
    const [pagination, setPagination] = useState({
        pageNum: 1,
        pageSize: 10
    });

    return {
        pagination,
        setPage(pageNum) {
            setPagination({
                pageNum,
                pageSize: pagination.pageSize
            });
        },
        setPageSize(pageSize) {
            setPagination({
                pageNum:1,
                pageSize
            });
        }
    };
}
```


hooks/useTableDataLoader.js
```js
import { useState, useEffect } from 'react';

export default (api, pagination) => {
    const [data, setData] = useState({
        total: 0,
        tableData: []
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        api(pagination)
            .then(res => {
                setData({
                    total: res.data.totalCount,
                    tableData: res.data.list
                });
              
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false);
            });
    }, [pagination]);

    return {
        data, loading
    };
}

```

### components

components/TableDisplay.jsx
```js
import React from 'react';
import { Table } from 'antd';

export default (props) => {
   
    const {loading = fasle,data = [], columns = [] } = props
    return (
        <Table loading={loading} dataSource={data} pagination={false} columns={columns} ></Table>
    )
}
```
components/Pagination.jsx
```js
import React from 'react';
import { Pagination } from 'antd';

export default React.memo((props) => {
    const { total = 0, setPage, setPageSize, pageNum: page, pageSize } = props;
    return(
        <div style={{paddingTop:'20px'}}>
            <Pagination
                current={page}
                onChange={(page) => {setPage(page)}}
                onShowSizeChange={(page,pageSize) => setPageSize(pageSize)}
                showSizeChanger
                total={total}
                pageSize={pageSize}
            > </Pagination>
        </div>
    )
}) 
```


index.jsx
```js
import React, { Component } from 'react';
import { getParkingSpaceRealtimelistApi } from '@/services/parkingStatistics/realTimeParkingData';
import { Table, Modal } from 'antd';
import TableDisplay from '@/components/TableDisplay';
import Pagination from '@/components/Pagination';
import useTableDataLoader from '@/hooks/useTableDataLoader';
import usePagination from '@/hooks/usePagination';
import useModal from '@/hooks/useModal';
import { Button } from 'antd';


export default () => {

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '操作',
      render(record) {
        return <Button onClick={toggle}>编辑</Button>
      }
    }
    
  ];

  const { pagination, setPage, setPageSize } = usePagination();
  const { isShowing,toggle } = useModal();
  const { data, loading } = useTableDataLoader(getParkingSpaceRealtimelistApi, pagination);
  const { tableData, total } = data;
  return (
    <div>
      <TableDisplay {...{ data: tableData, loading, columns }}></TableDisplay>
      <Pagination
        {
        ...{
          total:total,
          setPage,
          setPageSize,
          ...pagination
        }
        }
      ></Pagination>
       <Modal
          visible={isShowing}
          title={'23'}
          onCancel={() => toggle()}
        >
          hello
      </Modal>
    </div>

  );
}

```