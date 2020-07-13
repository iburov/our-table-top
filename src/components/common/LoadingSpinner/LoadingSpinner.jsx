//(Use these comments to find and replace)
// LoadingSpinner
// blank-component

import React from "react";
import "./LoadingSpinner.scss";
import { connect } from "react-redux";

class LoadingSpinner extends React.Component {
  componentDidMount() { }

  render() {
    return <div className="ott-loading-spinner spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>;
  }
}

let mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(LoadingSpinner);
