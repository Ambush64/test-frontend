import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function AccountsModal({ accounts, showModal, handleClose }) {
    const [selectedAccount, setSelectedAccount] = useState('');
    const [postDataResponse, setPostDataResponse] = useState('');

    const handleDropdownChange = (event) => {
        const id = event.target.value
        setSelectedAccount(id);

        axios.post('https://test-backend-peach.vercel.app/list-transaction', { id })
            .then((response) => {
                setPostDataResponse(response.data.transactions);
            })
            .catch((error) => {
                console.error('Error making POST request:', error);
            });
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Months are 0-based, so add 1
        const year = date.getUTCFullYear();

        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

        return formattedDate;
    }

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Accounts</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="accountsDropdown">Select an account:</label>
                <select
                    id="accountsDropdown"
                    className="form-control"
                    value={selectedAccount}
                    onChange={handleDropdownChange}
                >
                    <option value="">Select an account</option>
                    {accounts.map((account, index) => (
                        <option key={index} value={account}>
                            {account}
                        </option>
                    ))}
                </select>
                {postDataResponse ? (
                    <div className="mt-2">
                        Transactions:
                        <ul>
                            {postDataResponse.map((item, index) => (
                                <li key={index}>
                                    Price: {Number(item.price).toFixed(2)}<br />
                                    Date: {formatDate(item.date)}<br />
                                    Symbol: {item.symbol}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : <p>No transactions</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AccountsModal;
