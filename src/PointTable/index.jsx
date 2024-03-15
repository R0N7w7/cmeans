import { Table } from 'antd';
import React from "react";

const PointTable = ({ points, name }) => {

    const dataSource = [];

    const columns = [
        { title: "X", dataIndex: 'x', key: 'x', align: 'center' },
        { title: "Y", dataIndex: 'y', key: 'y', align: 'center' },
    ]

    if (!!points.length) {
        for (let i = 0; i < points.length; i++) {
            dataSource.push({ key: i, x: points[i].x.toFixed(4), y: points[i].y.toFixed(4) });
        }
    }

    return (
        <div>
            <Table
                title={() => <h3>{name}</h3>}
                columns={columns}
                dataSource={dataSource}
                scroll={{ x: true, y: 150 }}
                pagination={false}
                className='point-table'
            />
        </div>
    );
}

export { PointTable };
