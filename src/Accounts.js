import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useTokenVerification from "./useTokenVerification"
import { useNavigate } from 'react-router-dom';
import { useTable, usePagination } from 'react-table';

const Accounts = () => {
    useTokenVerification()
    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAcc();
        console.log(data[0])
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Account ID',
                accessor: 'account_id',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        previousPage,
        canPreviousPage,
        nextPage,
        canNextPage,
        pageIndex,
        pageOptions,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 20 },
        },
        usePagination
    );

    async function fetchAcc() {
        try {
            const response = await axios.get('http://localhost:8000/account-transaction');
            setData(response.data)
            setLoaded(true)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Error');
            } else {
                console.error('Login failed:', error);
            }
        }
    }

    function redirectCustomer() {
        navigate("/customers")
    }

    return (
        <div className='container mt-4 mb-5'>
            <button type="submit" className="btn btn-primary mb-4" onClick={redirectCustomer}>Customers</button>
            <h2>
                Account ids which has made at least one transaction below the amount 5000
            </h2>
            <br />
            {loaded ? (
                <>
                    <table {...getTableProps()} className="table table-bordered">
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="pagination d-flex justify-content-center mt-3">
                        <button
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                            className="btn btn-primary mr-2"
                        >
                            Previous
                        </button>
                        <span className="align-self-center mx-2">
                            Toggle between pages
                        </span>
                        <button
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                            className="btn btn-primary ml-2"
                        >
                            Next
                        </button>
                    </div>

                </>
            ) : (
                <p>Loading...</p>
            )}

        </div>
    );
}

export default Accounts;
