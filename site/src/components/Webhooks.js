import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';

import { useQuery } from "react-query";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import SimpleDateTime from 'react-simple-timestamp-to-date';

import { useBucket } from '../context/BucketProvider';
import { WebhookDetails } from '../components/WebhookDetails';

const apiPath = "http://localhost:8080"

// Queries
const retrieveWebhooksQuery = async (params) => {
    const [_, bucketId] = params.queryKey
    return retrieveWebhooks(bucketId);
};
const retrieveWebhooks = async (bucketId) => {
    const response = await axios.get(apiPath + "/api/" + bucketId + "/check");
    return response.data;
};
const deleteWebhook = async (bucketId, webhook) => {
    axios.post(apiPath + "/api/" + bucketId + "/delete/" + webhook.id)
        .then(res => { retrieveWebhooks(bucketId);})
};
const deleteBucket = async (bucketId) => {
    axios.post(apiPath + "/api/" + bucketId + "/delete")
        .then(res => { })
};

export const DisplayWebhooks = () => {
    const [selectedWebhook, setSelectedWebhook] = useState(null);

    // Resolve bucket
    const bucketState = useBucket();
    var bucketId = "";
    if (bucketState) {
        bucketId = bucketState.id;
    }

    // Handle request
    const { data: webhooks, error, isLoading } = useQuery(["webhooksData", bucketId], retrieveWebhooksQuery, { skip: !bucketState });
    if (isLoading) return <div>Fetching webhooks...</div>;
    if (error) return <div>An error occurred while retrieving webhooks: {error.message}</div>;
    if (!webhooks) {
        return "No webhooks recorded yet"
    }

    // Render
    return (

        <Container style={{ maxWidth: "unset" }}>
            <Row>
                <Col className='col-4'>
                    <div style={{ display: "flex" }}>
                        <Button onClick={() => deleteBucket(bucketId)} variant="danger" >
                            <FaTrash />
                        </Button>
                        <h1>Calls</h1>

                    </div>

                    <ul>
                        {webhooks.map((webhook) => (
                            <li key={webhook.id} onClick={() => setSelectedWebhook(webhook)} style={{ cursor: 'pointer' }}>
                                <Row>
                                    <Col className='col-10'>
                                        <strong>ID:</strong> {webhook.id}<br />
                                        <strong>Timestamp:</strong>
                                        <SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{webhook.timestamp}</SimpleDateTime>
                                        <br />
                                        <strong>Method:</strong> {webhook.method}<br />
                                    </Col>
                                    <Col className='col-2'>
                                        <Button onClick={() => deleteWebhook(bucketId, webhook)} variant="warning">
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>

                                <hr />
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col className='col-8'>
                    <WebhookDetails selectedWebhook={selectedWebhook} />
                </Col>
            </Row>
        </Container>

    );
};

export default DisplayWebhooks;
