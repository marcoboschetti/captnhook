import React from 'react';

export const WebhookDetails = (props) => {
    var selectedWebhook = props.selectedWebhook;
    if(!selectedWebhook){
        return <div>
            Please select a webhook to see details
        </div>
    }

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
                    <strong>Body:</strong>
                    {selectedWebhook.body}
                    <br />
                    <hr />
                </li>
            </ul>
        </div>
    );
};

export default WebhookDetails;

