import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';

import axios from "axios";
import Button from 'react-bootstrap/Button';
import SimpleDateTime from 'react-simple-timestamp-to-date';
import Form from 'react-bootstrap/Form';
import { FaTrash, FaRedo } from "react-icons/fa";

import { useBucket } from '../context/BucketProvider';
import { WebhookDetails } from '../components/WebhookDetails';

export const apiPath = ""
// export const apiPath = "http://localhost:8080"

export const DisplayWebhooks = () => {
    const [retrievedWebhooks, setRetrievedWebhooks] = useState([]);
    const [selectedWebhook, setSelectedWebhook] = useState(null);
    const [fieldsSummary, setFieldsSummary] = useState("");

    // Queries
    const retrieveWebhooks = async (bucketId) => {
        const response = await axios.get(apiPath + "/api/" + bucketId + "/check");
        var webhooks = response.data;
        console.log(webhooks)
        if(webhooks){
            webhooks = webhooks.sort((a, b) => a.id < b.id ? 1 : -1)
        }
        setRetrievedWebhooks(webhooks);
    };
    const deleteWebhook = async (bucketId, webhook) => {
        axios.post(apiPath + "/api/" + bucketId + "/delete/" + webhook.id)
            .then(res => { retrieveWebhooks(bucketId); })
    };
    const deleteBucket = async (bucketId) => {
        axios.post(apiPath + "/api/" + bucketId + "/delete")
            .then(res => { retrieveWebhooks(bucketId); setSelectedWebhook(null); })
    };


    // Resolve bucket
    const bucketState = useBucket();
    var bucketId = "";
    if (bucketState) {
        bucketId = bucketState.id;
    }

    // Handle request
    var webhookList = "";
    if (!retrievedWebhooks || !retrievedWebhooks.length) {
        retrieveWebhooks(bucketId);
        webhookList = "No webhooks found"
    } else {
        // Populate summary fields
        var webhookSummaryFields = {}
        retrievedWebhooks.map((webhook) => {
            webhookSummaryFields[webhook.id] = [];
            var parsed = null;
            try {
                parsed = JSON.parse(webhook.body)
            } catch (e) { }
            fieldsSummary.split(",").map((field) => {
                if (parsed && parsed[field]) {
                    webhookSummaryFields[webhook.id].push({ k: field, v: parsed[field] })
                }
            })
        })

        console.log(webhookSummaryFields)

        webhookList = <ul>
            {retrievedWebhooks.map((webhook) => (
                <li key={webhook.id} onClick={() => setSelectedWebhook(webhook)} style={{ cursor: 'pointer' }}>
                    <Row>
                        <Col className='col-10'>
                            <strong>ID:</strong> {webhook.id}<br />
                            <strong>Timestamp:</strong>
                            <SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{webhook.timestamp}</SimpleDateTime>
                            <br />
                            <strong>Method:</strong> {webhook.method}<br />
                            {webhookSummaryFields[webhook.id].map((header) => (
                                <div key={header.k}>
                                    <strong>{header.k}:</strong> {header.v}<br />
                                </div>
                            ))}
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
    }

    // Render
    return (
        <Container style={{ maxWidth: "unset" }}>
            <Row>
                <Col className='col-3'>
                    <Row className="align-items-center">
                        <Col>
                            <h1>Calls</h1>
                        </Col>
                        <Col style={{ textAlign: 'right', bottom: 0 }}>
                            <Button onClick={() => deleteBucket(bucketId)} variant="danger" >
                                <FaTrash />
                            </Button>

                            <Button onClick={() => retrieveWebhooks(bucketId)} variant="info" >
                                <FaRedo />
                            </Button>
                        </Col>
                    </Row>

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text"
                                placeholder="Payload fields in summary (comma separated)"
                                value={fieldsSummary}
                                onChange={event => {
                                    setFieldsSummary(event.target.value)
                                }} />
                        </Form.Group>
                    </Form>
                    {webhookList}
                </Col>
                <Col className='col-9'>
                    <WebhookDetails selectedWebhook={selectedWebhook} />
                </Col>
            </Row>
        </Container>

    );
};

export default DisplayWebhooks;
