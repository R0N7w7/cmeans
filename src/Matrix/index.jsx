import { Table } from 'antd';
import React from "react";

const Matrix = ({ matrix, name }) => {
    const dataSource = [];
    const columns = matrix.length ? [{
        title: 'C', dataIndex: 'centroid', key: 'centroid', with: 300, fixed: 'left'
    },] : [];

    if (matrix.length != 0) {
        for (let i = 0; i < matrix.length; i++) {
            const row = {
                key: i,
                centroid: i + 1,
                with: 100
            }

            for (let j = 0; j < matrix[0].length; j++) {
                const propertyName = 'p' + (j + 1);
                row[propertyName] = matrix[i][j].toFixed(4);
            }

            dataSource.push(row);
        }

        for (let i = 0; i < matrix[0].length; i++) {
            columns.push({
                title: 'P' + (i + 1),
                dataIndex: 'p' + (1 + i),
                key: 'p' + (1 + i),
                with: 100,
            });
        }
    }
    return (
        <Table
            title={() => <h2>{name}</h2>}
            dataSource={dataSource}
            columns={columns}
            scroll={{ x: true, y: 200 }}
            pagination={false}
            className='matrix'
        />
    );
}

export { Matrix };
