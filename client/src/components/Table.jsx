import React from 'react'

const Table = (props) => {
    const { headers } = props;

    const tableHeaders = headers && headers.map((header) => {
        return (
            <th key={header}>{header}</th>
        )
    });

    return (
        <>
            <thead>
                <tr>
                    {tableHeaders}
                </tr>
            </thead>
        </>
    )
}

export default Table;