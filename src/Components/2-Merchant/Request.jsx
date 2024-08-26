import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import handleDenomDisplay from "../UnitDisplay";
import formatDate from "../TimeDisplayLong";

import simpleDate from "../DateDisplay";

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
      copiedAddress: false,
    };
  }

  handleNameClick = (nameLabel) => {
    navigator.clipboard.writeText(nameLabel);
    this.setState({
      copiedName: true,
    });
  };

  verifyRequestStatus = (theRequest, theConfirm) => {
    if (theConfirm === undefined) {
      //console.log("Awaiting Confirmation");
      return <Badge bg="warning">Awaiting Confirm</Badge>;
    }

    //if(confirm!==undefined){this will check if the request and confirm dates and amts match }
    //
    if (
      theConfirm.amt === theRequest.amt &&
      theConfirm.arriveDate === theRequest.arriveDate &&
      theConfirm.departDate === theRequest.departDate
    ) {
      //console.log("Acceptance Rejected");
      return <Badge bg="success">Confirmed</Badge>;
    }

    // if (paidThrs.length === 0) {
    //   //console.log("Requested");
    //   return <Badge bg="success">Requested</Badge>;
    // }

    // if (ride.replyId === this.props.drive.$id) {
    //console.log("Confirmed");
    return <Badge bg="warning">Confirm Error</Badge>;
    //}
  };

  // handleNameClick = () => {
  //   navigator.clipboard.writeText(`${this.props.tuple[0]}`);
  //   this.setState({
  //     copiedName: true,
  //   });
  // };

  render() {
    let cardBkg;
    let cardText;

    if (this.props.mode === "primary") {
      cardBkg = "white";
      cardText = "dark";
    } else {
      cardBkg = "dark";
      cardText = "white";
    }

    // "Requests"
    // "Confirmed"
    // "Blocked Off"

    let rental = this.props.Rentals.find((rental) => {
      return rental.$id === this.props.request.rentalId;
    });

    let confirm = undefined;

    if (this.props.DisplayRequests === "Confirmed") {
      confirm = this.props.RentalConfirms.find((confirm) => {
        return this.props.request.$id === confirm.reqId;
      });
    }

    //this.props.RentalRequestsNames
    //this.props.RentalReplies

    //

    let requestName = "No Name";

    //if (confirm !== undefined) {
    requestName = this.props.RentalRequestsNames.find((reqName) => {
      return reqName.$ownerId === this.props.request.$ownerId;
    });
    //}

    let rentalReplies = [];

    if (
      this.props.RentalReplies.length !== 0 &&
      this.props.DisplayRequests === "Confirmed"
    ) {
      rentalReplies = this.props.RentalReplies.filter((msg) => {
        return confirm.$id === msg.confirmId;
      });
    }

    let rentalReplyMessages = [];

    if (confirm !== undefined && rentalReplies.length !== 0) {
      rentalReplyMessages = rentalReplies.map((msg, index) => {
        return (
          // <Card
          //   id="comment"
          //   key={index}
          //   index={index}
          //   bg={cardBkg}
          //   text={cardText}
          // >
          //   <Card.Body>
          <div index={index} key={index}>
            <div
              className="ThreadBorder"
              style={{ paddingTop: ".3rem", marginBottom: ".3rem" }}
            ></div>

            <Card.Title className="cardTitle">
              {msg.$ownerId === this.props.identity ? (
                <b style={{ color: "#008de4" }}>{this.props.uniqueName}</b>
              ) : (
                <b style={{ color: "#008de4" }}>{requestName.label}</b>
              )}

              <span className="textsmaller">
                {formatDate(
                  msg.$createdAt,
                  this.props.today,
                  this.props.yesterday
                )}
              </span>
            </Card.Title>
            <Card.Text>{msg.msg}</Card.Text>
          </div>
          //   </Card.Body>
          // </Card>
        );
      });
    }

    return (
      <>
        <Card
          id="card"
          key={this.props.index}
          index={this.props.index}
          bg={cardBkg}
          text={cardText}
        >
          <Card.Body>
            {}
            <Card.Title className="cardTitle">
              <h5>
                {" "}
                <b //style={{ color: "#008de4" }}
                >
                  {rental.title}
                </b>
              </h5>

              <span className="textsmaller">
                {formatDate(
                  this.props.request.$updatedAt,
                  this.props.today,
                  this.props.yesterday
                )}
              </span>
            </Card.Title>
            <Card.Title style={{ display: "flex", justifyContent: "center" }}>
              {this.verifyRequestStatus(this.props.request, confirm)}
            </Card.Title>
            <p></p>
            {rental.address !== undefined && rental.address !== "" ? (
              <div
                style={{
                  display: "flex",
                  alignContent: "baseline",
                  justifyContent: "space-between",
                  marginLeft: "1rem",
                  marginRight: "2rem",
                  marginBottom: "1.2rem",
                }}
              >
                <span style={{ whiteSpace: "pre-wrap" }}>{rental.address}</span>

                {/* <Button
                  variant="outline-primary"
                  onClick={() => {
                    navigator.clipboard.writeText(rental.address);
                    this.setState({
                      copiedAddress: true,
                    });
                  }}
                >
                  {this.state.copiedAddress ? <b>Copied!</b> : <b>Copy</b>}
                </Button> */}
              </div>
            ) : (
              <></>
            )}

            {/* <p></p>
            <div className="d-grid gap-2">
              <Button
                // size="lg"
                variant="primary"
                onClick={() => this.props.handleSelectedRental(rental)}
              >
                <b>View Rental</b>
              </Button>
            </div>
            <p></p> */}

            {/* <p
              className="textsmaller"
              style={{ marginTop: "1rem", textAlign: "center" }}
            >
              <b> *Click on me to view availability!*</b>{" "}
            </p> */}

            {/* Description */}
            {/* <p style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              {rental.description}
            </p> */}

            {/* ArriveDate*/}
            <p
              style={{
                marginTop: ".2rem",
                marginBottom: "0rem",
                color: "#008de4",
              }}
            >
              <b>Arrival</b>
            </p>

            <h5 style={{ textAlign: "center" }}>
              <b> {simpleDate(this.props.request.arriveDate)}</b>{" "}
            </h5>

            {/* DepartDate*/}
            <p
              style={{
                marginTop: ".2rem",
                marginBottom: "0rem",
                color: "#008de4",
              }}
            >
              <b>Departure</b>
            </p>

            <h5 style={{ textAlign: "center" }}>
              <b> {simpleDate(this.props.request.departDate)}</b>{" "}
            </h5>

            {/* Amount */}

            {/* <h5 style={{ marginTop: ".2rem", textAlign: "center" }}>
              {" "}
              <b style={{ color: "#008de4" }}>
                {handleDenomDisplay(rental.rate)}
              </b>{" "}
              per day
            </h5> */}
            <h4
              style={{
                marginTop: "1.5rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Total Cost{" "}
              <b style={{ marginLeft: "1rem", color: "#008de4" }}>
                {handleDenomDisplay(this.props.request.amt)}
              </b>
            </h4>

            {confirm === undefined && !this.props.isLoadingRequests ? (
              <>
                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    onClick={() =>
                      this.props.handleConfirmRequestModal(this.props.request)
                    }
                  >
                    <b>Confirm Reservation</b>
                  </Button>
                </div>
                <p></p>
              </>
            ) : (
              <></>
            )}
            {/* {confirm === undefined ? (
              <>
                <div className="TwoButtons">
                  <Button
                    variant="primary"
                    // onClick={() =>
                    //   this.props.handleDeleteRequest(this.props.index)
                    // }
                  >
                    <b>Delete Request</b>
                  </Button>
                  <Button
                    variant="primary"
                    // onClick={() =>
                    //   this.props.handleEditRequest(this.props.index)
                    // }
                  >
                    <b>Edit Request</b>
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )} */}

            {/* {confirm !== undefined ? (
              <>
                {this.props.isYourRequestsRefreshReady ? (
                  <>
                    <div className="d-grid gap-2" id="button-edge-noTop">
                      <Button
                        variant="primary"
                        // onClick={() => {
                        //   this.props.refreshYourRides();
                        // }}
                        style={{
                          fontSize: "larger",
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                        }}
                      >
                        <b>Refresh</b>
                      </Button>
                    </div>
                    <p></p>
                  </>
                ) : (
                  <>
                    <div className="d-grid gap-2" id="button-edge-noTop">
                      <Button
                        variant="primary"
                        disabled
                        style={{
                          fontSize: "larger",
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                        }}
                      >
                        <b>Refresh</b>
                      </Button>
                    </div>
                    <p></p>
                  </>
                )}
              </>
            ) : (
              <></>
            )} */}

            {confirm !== undefined ? (
              <>
                <div
                  className="BottomBorder"
                  style={{ paddingTop: ".7rem", marginBottom: ".7rem" }}
                ></div>
                <div
                  className="cardTitle"
                  style={{ marginTop: ".4rem", marginBottom: ".5rem" }}
                >
                  <h5>Responses</h5>
                  {this.verifyRequestStatus(this.props.request, confirm)}
                </div>
              </>
            ) : (
              <></>
            )}

            {/* {confirm !== undefined ? (
              <> */}
            <h5>
              <span
                style={{
                  marginTop: ".2rem",
                  marginBottom: "0rem",
                }}
              >
                <b>Renter:</b>
              </span>
              <span
                style={{
                  color: "#008de3",
                  marginTop: ".2rem",
                  marginBottom: "0rem",
                }}
              >
                {" "}
                <b onClick={() => this.handleNameClick(requestName.label)}>
                  {requestName.label}
                </b>
              </span>
              <span>{this.state.copiedName ? <span>✅</span> : <></>}</span>
            </h5>
            <p></p>
            {/* </>
            ) : (
              <></>
            )} */}

            {confirm !== undefined && rentalReplies.length === 0 ? (
              <>
                <p style={{ textAlign: "center", paddingTop: ".5rem" }}>
                  (Currently, there are no messages to this reservation.)
                </p>
              </>
            ) : (
              <></>
            )}

            {rentalReplyMessages}
            <p></p>
            {confirm !== undefined ? (
              <>
                <div className="ButtonRightNoUnderline">
                  <Button
                    variant="primary"
                    onClick={() =>
                      this.props.handleMerchantReplyModalShow(
                        confirm,
                        requestName
                      )
                    }
                  >
                    <b>Add Message</b>
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Request;
