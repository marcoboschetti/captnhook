import React from "react";
import { useBucket } from '../context/BucketProvider';
import { Container, Row, Col } from 'react-bootstrap';
import BucketConfig from "./BucketConfig"

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
      <div style={{ textAlign: 'center', fontSize: "0.75em;" }}>
        Made with <span class="footer-icon" style={{ color: "blue;" }}>♥</span> by Marco
      </div>
      <hr />
      <Row>
        <Col className='col-8'>
          <div>
            <h4>Set webhook URL: {apiRoot}/catch</h4>
            <h4>API to check calls: {apiRoot}/check</h4>
          </div>
        </Col>
        <Col className='col-4'>
          <h4>Bucket ID: {bucketId}</h4>
        </Col>
      </Row>
      <hr />
      <BucketConfig />
    </div>
  );
};
