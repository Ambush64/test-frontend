import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import AccountsModal from './AccountsModal';
import { useNavigate } from 'react-router-dom';
import useTokenVerification from "./useTokenVerification"

const CustomerDataTable = () => {
    useTokenVerification();
    const [loaded, setLoaded] = useState(false)
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [distinctProducts, setDistinctProducts] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchCustomer();
    }, []);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Address',
                accessor: 'address',
            },
            {
                Header: 'Accounts',
                accessor: 'accounts',
                Cell: ({ cell: { value } }) => (
                    <Button onClick={() => handleOpenModal(value)}>View Accounts</Button>
                ),
            },
        ],
        []
    );

    async function fetchCustomer() {
        try {
            const response = await axios.get('http://localhost:8000/customers');
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

    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: 10,
            },
        },
        useSortBy,
        usePagination
    );


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
    } = tableInstance;

    const handleOpenModal = (accounts) => {
        setSelectedAccounts(accounts);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    function redirectTranscaction() {
        navigate("/account-transaction")
    }

    async function fetchProducts() {
        try {
            const response = await axios.get('http://localhost:8000/distinct-products');
            setDistinctProducts(response.data)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Error');
            } else {
                console.error('Login failed:', error);
            }
        }

    }

    const openProductModal = () => {
        fetchProducts()
        setShowProductModal(true);
    };

    const closeProductModal = () => {
        setShowProductModal(false);
    };


    return (
        <div className='container mt-4'>
            <div className='mb-4'>
                <button type="submit" className="btn btn-primary mx-4 " onClick={redirectTranscaction}>Display Accounts (&lt;5000)</button>
                <button
                    type="button"
                    className="btn btn-success mx-5"
                    onClick={openProductModal}
                >
                    Distinct Products
                </button>
            </div>
            <h2>
                Active Customers details
            </h2>

            {loaded ?
                <table {...getTableProps()} className="table table-bordered table-striped">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                    </th>
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
                </table> : <p>Loading...</p>}
            <AccountsModal
                accounts={selectedAccounts}
                showModal={showModal}
                handleClose={handleCloseModal}
            />

            <Modal show={showProductModal} onHide={closeProductModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Distinct Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {distinctProducts.map((product, index) => (
                            <li key={index}>{product}</li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeProductModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default CustomerDataTable;
