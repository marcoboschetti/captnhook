import React from "react";
import { useBucket } from '../context/BucketProvider';
import { Container, Row, Col } from 'react-bootstrap';

export var Header = () => {
  const bucketState = useBucket();

  var bucketId = "Loading...";
  if (bucketState) {
    bucketId = bucketState.id;
  }

  var apiRoot = window.location.origin + "/api/" + bucketId

  return (
    <div className="header">
      <h1>Capt'n Hook 🏴‍☠️ </h1>
      <hr />
      <Row>
        <Col xs={7}>
          <div>
            <h4>Set webhook URL: {apiRoot}/catch</h4>
            <h4>API to check calls: {apiRoot}/check</h4>
          </div>
        </Col>
        <Col xs={3}>
          <h2>Bucket ID: {bucketId}</h2>
        </Col>
      </Row>
      <hr />
    </div>
  );
};
