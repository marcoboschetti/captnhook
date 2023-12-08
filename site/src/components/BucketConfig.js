import React, { useState, useEffect } from "react";
import { useBucket } from '../context/BucketProvider';
import { Container, Row, Col } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FaSave } from "react-icons/fa";
import { apiPath } from "./Webhooks"
import axios from "axios";

export var BucketConfig = () => {
  const [config, setConfig] = useState({ status_code: 0, response_body: "" });

  // Queries
  const getBucketConfig = async (bucketId) => {
    await axios.get(apiPath + "/api/" + bucketId + "/config")
      .then(res => { setConfig(res.data); });
  };
  const saveBucketConfig = async (bucketId) => {
    console.log(config)
    await axios.post(apiPath + "/api/" + bucketId + "/config", config);
  };

  const bucketState = useBucket();
  var bucketId = "";
  if (bucketState) {
    bucketId = bucketState.id;
  }

  useEffect(() => {
    if (bucketId) {
      getBucketConfig(bucketId)
    }
  }, [bucketState])

  return (
    <div>
      <Form>
        <Row className="align-items-center justify-content-center">
          <Col className='col-2'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Response status code</Form.Label>
              <Form.Control type="number" placeholder="200"
                value={config.status_code}
                onChange={event => {
                  setConfig({
                    status_code: parseInt(event.target.value),
                    response_body: config.response_body
                  });
                }}
              />
            </Form.Group>
          </Col>
          <Col className='col-5'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Response payload</Form.Label>
              <Form.Control as="textarea" rows={1}
                value={config.response_body}
                onChange={event => {
                  setConfig({
                    status_code: config.status_code,
                    response_body: event.target.value,
                  });
                }}
              />
            </Form.Group>
          </Col>

          <Col className='col-1'>
            <Button onClick={() => saveBucketConfig(bucketId)} variant="success" >
              <FaSave />
            </Button>
          </Col>
        </Row>
      </Form>
      <hr />
    </div>
  );
};

export default BucketConfig;
