import React from "react";
import Form from "react-bootstrap/Form";

import Request from "./Request";
import Confirm from "./Confirm";

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

    let requests = this.props.RentalRequests.map((request, index) => {
      //console.log(post);
      return (
        <div key={index}>
          <Request
            //key={index}
            mode={this.props.mode}
            index={index}
            request={request}
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
            RentalRequests={this.props.RentalRequests}
            RentalConfirms={this.props.RentalConfirms}
          />
          <div className="BlackBottomBorder"></div>
        </div>
      );
    });

    let confirms = this.props.RentalConfirms.map((request, index) => {
      //console.log(post);
      return (
        <div key={index}>
          <Confirm
            //key={index}
            mode={this.props.mode}
            index={index}
            request={request}
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
            RentalRequests={this.props.RentalRequests}
            RentalConfirms={this.props.RentalConfirms}
          />
          <div className="BlackBottomBorder"></div>
        </div>
      );
    });

    return (
      <>
        {/* REQUEST FILTER FORM BELOW */}

        <Form.Group className="mb-3" controlId="formRequestFilter">
          {/* <Form.Label>
            <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
              Payment Schedule
            </h5>
          </Form.Label> */}
          <Form.Select>
            <option value="Requests">Requests</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Blocked Off">Blocked Off</option>
          </Form.Select>
        </Form.Group>
        {this.props.DisplayRequests === "Requests" ? (
          <>
            <RequestBlock confirm={this.props.confirm} />
          </>
        ) : (
          <></>
        )}
        <p></p>
        {requests}
        {/* {requests} */}
      </>
    );
  }
}

export default Requests;
