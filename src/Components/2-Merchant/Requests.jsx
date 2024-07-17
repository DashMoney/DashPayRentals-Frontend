import React from "react";
import Form from "react-bootstrap/Form";

import Request from "./Request";
import BlockedOff from "./BlockedOff";

class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DisplayRequests: "Requests", //Payment Schedule
    };
  }

  handleRequestFilter = (selected) => {
    this.setState(
      {
        DisplayRequests: selected,
      } //,() => console.log(this.state.DisplayRequests)
    );
  };

  onChange = (event) => {
    //Payment Schedule
    if (event.target.id === "formRequestFilter") {
      event.stopPropagation();
      this.handleRequestFilter(event.target.value);
    }
  };

  render() {
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    //Put the filter here <- NO otherwise will have to filter here

    let rsrvConfirms = [];
    let blockedConfirms = [];
    this.props.RentalConfirms.forEach((confirm) => {
      if (confirm.amt === 0) {
        blockedConfirms.push(confirm);
      } else {
        rsrvConfirms.push(confirm);
      }
    });

    let unconfirmedReqs = [];
    let confirmedReqs = [];

    this.props.RentalRequests.forEach((request) => {
      let bool = rsrvConfirms.some((confirm) => confirm.reqId === request.$id);
      if (bool) {
        confirmedReqs.push(request);
      } else {
        unconfirmedReqs.push(request);
      }
    });
    let requests = [];

    if (this.state.DisplayRequests === "Requests") {
      requests = unconfirmedReqs.map((request, index) => {
        //console.log(post);
        return (
          <div key={index} style={{ marginBottom: "0.1rem" }}>
            <Request
              //key={index}
              mode={this.props.mode}
              index={index}
              request={request}
              today={today}
              yesterday={yesterday}
              identity={this.props.identity} //For if my review so can edit
              //uniqueName={this.props.uniqueName}
              handleConfirmRequestModal={this.props.handleConfirmRequestModal}
              //
              DisplayRequests={this.state.DisplayRequests}
              handleSelectedYourRsrv={this.props.handleSelectedYourRsrv}
              handleSelectedDapp={this.props.handleSelectedDapp}
              handleSelectedRental={this.props.handleSelectedRental}
              isLoadingRentals={this.props.isLoadingRentals}
              isLoadingRequests={this.props.isLoadingRequests}
              Rentals={this.props.Rentals}
              // RentalRequests={this.props.RentalRequests}
              RentalConfirms={rsrvConfirms}
            />
          </div>
        );
      });
    }

    if (this.state.DisplayRequests === "Confirmed") {
      requests = confirmedReqs.map((request, index) => {
        //console.log(post);
        return (
          <div key={index} style={{ marginBottom: "0.1rem" }}>
            <Request
              //key={index}
              mode={this.props.mode}
              index={index}
              request={request}
              today={today}
              yesterday={yesterday}
              identity={this.props.identity} //For if my review so can edit
              //uniqueName={this.props.uniqueName}
              handleConfirmRequestModal={this.props.handleConfirmRequestModal}
              //
              DisplayRequests={this.state.DisplayRequests}
              handleSelectedYourRsrv={this.props.handleSelectedYourRsrv}
              handleSelectedDapp={this.props.handleSelectedDapp}
              handleSelectedRental={this.props.handleSelectedRental}
              isLoadingRentals={this.props.isLoadingRentals}
              isLoadingRequests={this.props.isLoadingRequests}
              Rentals={this.props.Rentals}
              // RentalRequests={this.props.RentalRequests}
              RentalConfirms={rsrvConfirms}
            />
          </div>
        );
      });
    }

    let blocks = [];

    if (this.state.DisplayRequests === "Blocked Off") {
      blocks = blockedConfirms.map((confirmBlock, index) => {
        //console.log(post);
        return (
          <div key={index} style={{ marginBottom: "0.1rem" }}>
            <BlockedOff
              //key={index}
              mode={this.props.mode}
              index={index}
              confirmBlock={confirmBlock}
              today={today}
              yesterday={yesterday}
              identity={this.props.identity} //For if my review so can edit
              //uniqueName={this.props.uniqueName}

              DisplayRequests={this.state.DisplayRequests}
              handleSelectedYourRsrv={this.props.handleSelectedYourRsrv}
              handleSelectedDapp={this.props.handleSelectedDapp}
              handleSelectedRental={this.props.handleSelectedRental}
              isLoadingRentals={this.props.isLoadingRentals}
              isLoadingRequests={this.props.isLoadingRequests}
              Rentals={this.props.Rentals}
              //RentalConfirms={this.props.RentalConfirms}
            />
          </div>
        );
      });
    }

    let formBkg;
    let formText;

    if (this.props.mode === "primary") {
      formBkg = "light";
      formText = "dark";
    } else {
      formBkg = "dark";
      formText = "light";
    }

    return (
      <>
        <Form
          noValidate
          // onSubmit={this.handleSubmitClick}
          onChange={this.onChange}
        >
          {/* REQUEST FILTER FORM BELOW */}

          <Form.Group className="mb-3" controlId="formRequestFilter">
            {/* <Form.Label>
            <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
              Payment Schedule
            </h5>
          </Form.Label> */}

            <Form.Select
              style={{ fontWeight: "bold" }}
              // bg={formBkg}
              //text={formText}
              data-bs-theme={formBkg}
            >
              <option value="Requests" style={{ fontWeight: "bold" }}>
                Requests
              </option>
              <option value="Confirmed" style={{ fontWeight: "bold" }}>
                Confirmed
              </option>
              <option value="Blocked Off" style={{ fontWeight: "bold" }}>
                Blocked Off
              </option>
            </Form.Select>
          </Form.Group>
        </Form>

        <p></p>
        {this.state.DisplayRequests === "Requests" ? <>{requests}</> : <></>}
        {this.state.DisplayRequests === "Confirmed" ? <>{requests}</> : <></>}
        {this.state.DisplayRequests === "Blocked Off" ? <>{blocks}</> : <></>}
      </>
    );
  }
}

export default Requests;
