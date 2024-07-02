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
      //copiedName: false,
      copiedAddress: false,
    };
  }

  verifyRequestStatus = (theRequest, theConfirm) => {
    // if (ride.txId1 !== "") {
    //   //pass to the verify payment function ->
    //   // console.log("Called Verify Payment Status");
    //   return this.verifyPaymentStatus(ride);
    // }

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
      return <Badge bg="warning">Confirm Error</Badge>;
    }

    // if (paidThrs.length === 0) {
    //   //console.log("Requested");
    //   return <Badge bg="success">Requested</Badge>;
    // }

    // if (ride.replyId === this.props.drive.$id) {
    //console.log("Confirmed");
    return <Badge bg="success">Confirmed</Badge>;
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

    //
    //let replies =
    // let replie names??

    // if (rideRequest !== undefined) {
    //   rideRequestName = this.props.rideRequestsNames.find((requestName) => {
    //     return requestName.$ownerId === rideRequest.$ownerId;
    //   });

    //   if (this.props.rideRequestsReplies.length !== 0) {
    //     rideRepliesThrs = this.props.rideRequestsReplies.filter((thr) => {
    //       return (
    //         thr.amt === 0 &&
    //         (this.props.drive.$ownerId === thr.$ownerId ||
    //           rideRequest.$ownerId === thr.$ownerId)
    //       );
    //     });
    //   }
    // }

    // let replyMessages = [];
    // if (rideRequest !== undefined) {
    //   replyMessages = rideRepliesThrs.map((msg, index) => {
    //     return (
    //       <Card
    //         id="comment"
    //         key={index}
    //         index={index}
    //         bg={cardBkg}
    //         text={cardText}
    //       >
    //         <Card.Body>
    //           <Card.Title className="cardTitle">
    //             {msg.$ownerId === this.props.identity ? (
    //               <b style={{ color: "#008de4" }}>{this.props.uniqueName}</b>
    //             ) : (
    //               <b style={{ color: "#008de4" }}>{rideRequestName.label}</b>
    //             )}

    //             {/* <span className="textsmaller">
    //                 {this.formatDate(msg.$createdAt, today, yesterday)}
    //               </span> */}
    //           </Card.Title>
    //           <Card.Text>{msg.msg}</Card.Text>
    //         </Card.Body>
    //       </Card>
    //     );
    //   });
    // }

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

                <Button
                  variant="outline-primary"
                  onClick={() => {
                    navigator.clipboard.writeText(this.props.rental.address);
                    this.setState({
                      copiedAddress: true,
                    });
                  }}
                >
                  {this.state.copiedAddress ? <b>Copied!</b> : <b>Copy</b>}
                </Button>
              </div>
            ) : (
              <></>
            )}

            <p></p>
            <div className="d-grid gap-2">
              <Button
                // size="lg"
                variant="primary"
                onClick={() => this.props.handleSelectedRental(rental)}
              >
                <b>View Rental</b>
              </Button>
            </div>
            <p></p>
            {/* <p
              className="textsmaller"
              style={{ marginTop: "1rem", textAlign: "center" }}
            >
              <b> *Click on me to view availability!*</b>{" "}
            </p> */}

            {/* Description */}
            {/* <p style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              {this.props.rental.description}
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
                {handleDenomDisplay(this.props.rental.rate)}
              </b>{" "}
              per day
            </h5> */}
            <h4
              style={{
                marginTop: "1.5rem",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              Total Cost{" "}
              <b style={{ marginLeft: "1rem", color: "#008de4" }}>
                {handleDenomDisplay(this.props.request.amt)}
              </b>
            </h4>
            <p></p>
            {confirm === undefined && !this.props.isLoadingRequests ? (
              <>
                <Button
                  variant="primary"
                  // onClick={() =>
                  //   this.props.handleAcceptDrive(this.props.ride, nameDocToPass)
                  // }
                >
                  <b>Confirm Reservation</b>
                </Button>
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
                    //   this.props.handleDeleteYourRequest(this.props.index)
                    // }
                  >
                    <b>Delete Request</b>
                  </Button>
                  <Button
                    variant="primary"
                    // onClick={() =>
                    //   this.props.handleEditYourRequest(this.props.index)
                    // }
                  >
                    <b>Edit Request</b>
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )} */}

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

            {this.props.isYourRequestsRefreshReady ? (
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
              </>
            )}
            {/* 
            {confirmedDrive !== undefined ? (
              <>
                <h5>
                  <span
                    style={{
                      marginTop: ".2rem",
                      marginBottom: "0rem",
                    }}
                  >
                    <b>Driver:</b>
                  </span>
                  <span
                    style={{
                      color: "#008de3",
                      marginTop: ".2rem",
                      marginBottom: "0rem",
                    }}
                  >
                    {" "}
                    <b>{replyNames.label}</b>
                  </span>
                </h5>
                <p></p>
              </>
            ) : (
              <></>
            )}
            {confirmedDrive === undefined ? <>{DriversToConfirm}</> : <></>}
            {confirmedDrive === undefined && acceptDrives.length === 0 ? (
              <>
                <p style={{ textAlign: "center", paddingTop: ".5rem" }}>
                  (Currently, there are no responses to this ride request.)
                </p>
              </>
            ) : (
              <></>
            )}

            {replyMessages}

            {confirmedDrive !== undefined ? (
              <>
                <div className="ButtonRightNoUnderline">
                  <Button
                    variant="primary"
                    onClick={() =>
                      this.props.handleYourRideMsgModalShow(
                        this.props.ride,
                        replyNames
                      )
                    }
                  >
                    <b>Add Message</b>
                  </Button>
                </div>
              </>
            ) : (
              <></>
            )} */}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Request;
