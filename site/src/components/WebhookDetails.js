import React from 'react';
import ReactJson from 'react-json-view'

export const WebhookDetails = (props) => {
    var selectedWebhook = props.selectedWebhook;
    if (!selectedWebhook) {
        return <div>
            Please select a webhook to see details
        </div>
    }

    var bodyElem = selectedWebhook.body
    try {
        var parsed = JSON.parse(selectedWebhook.body)
        bodyElem = <ReactJson src={parsed} name={null} displayDataTypes={false} />
    } catch (e) { }

    return (
        <div>
            <h1>Webhook Details</h1>
            <ul>
                <li key={selectedWebhook.id}>
                    <strong>ID:</strong> {selectedWebhook.id}<br />
                    <strong>Timestamp:</strong> {selectedWebhook.timestamp}<br />
                    <strong>URL:</strong> {selectedWebhook.url}<br />
                    <strong>Method:</strong> {selectedWebhook.method}<br />
                    <strong>Headers:</strong>
                    <ul>
                        {selectedWebhook.headers.map((header, index) => (
                            <li key={index}>{header}</li>
                        ))}
                    </ul>
                    <hr />
                    <strong>Body:</strong>{bodyElem}
                    <br />
                    <hr />
                </li>
            </ul>
        </div>
    );
};

export default WebhookDetails;

