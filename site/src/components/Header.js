import React from "react";
import { useBucket } from '../context/BucketProvider';

export var Header = () => {
  const bucketState = useBucket();

  var bucketId = "Loading...";
  if (bucketState) {
    bucketId = bucketState.id;
  }
  
  return (
    <div className="header">
      <h1>Capt'n Hook 🏴‍☠️ </h1>
      <h2>Bucket ID: {bucketId}</h2>
    </div>
  );
};
