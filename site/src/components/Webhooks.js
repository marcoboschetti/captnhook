import React, {useState} from "react";
import { useQuery } from "react-query";
import axios from "axios";

import { useBucket } from '../context/BucketProvider';
import { WebhookDetails } from '../components/WebhookDetails';

const retrieveWebhooks = async (params) => {
    console.log("queryKey", params.queryKey)
    const [_, bucketId] = params.queryKey
    const response = await axios.get("/api/" + bucketId + "/check");
    return response.data;
};

export var retrievedWebhooks;

export const DisplayWebhooks = () => {
    const [selectedWebhook, setSelectedWebhook] = useState(null);

    // Resolve bucket
    const bucketState = useBucket();
    var bucketId = "";
    if (bucketState) {
        bucketId = bucketState.id;
    }

    // Handle request
    const { data: webhooks, error, isLoading } = useQuery(["webhooksData", bucketId], retrieveWebhooks, { skip: !bucketState });
    if (isLoading) return <div>Fetching webhooks...</div>;
    if (error) return <div>An error occurred while retrieving webhooks: {error.message}</div>;
    if (!webhooks) {
        return "No webhooks recorded yet"
    }
    retrievedWebhooks = webhooks;

    // Render
    return (
        <div>
            <h1>Webhook Calls</h1>
            <ul>
                {webhooks.map((webhook) => (
                    <li key={webhook.id} onClick={() => setSelectedWebhook(webhook)} style={{ cursor: 'pointer' }}>
                        <strong>ID:</strong> {webhook.id}<br />
                        <strong>Timestamp:</strong> {webhook.timestamp}<br />
                        <br />
                        <hr />
                    </li>
                ))}
            </ul>

            <WebhookDetails selectedWebhook={selectedWebhook} />
        </div>
    );
};

export default DisplayWebhooks;
