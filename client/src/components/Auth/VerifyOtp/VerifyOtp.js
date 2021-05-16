import React, { Component } from "react";
import OtpInput from "react-otp-input";

class VerifyOtp extends Component {
  state = { otp: "" };

  handleChange = (otp) => this.setState({ otp });

  render() {
    return (
      <OtpInput
        value={this.state.otp}
        onChange={this.handleChange}
        separator={<span>-</span>}
      />
    );
  }
}
export default VerifyOtp;
