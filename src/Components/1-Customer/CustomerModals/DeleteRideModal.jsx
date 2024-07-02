import React from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";

import getRelativeTimeAgo from "../../TimeDisplayRelative";

import handleDenomDisplay from "../../UnitDisplay";

class DeleteRideModal extends React.Component {
  handleCloseClick = () => {
    this.props.hideModal();
  };

  render() {
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    let modalBkg = "";
    let closeButtonColor;
    let modalBackdrop;

    if (this.props.mode === "primary") {
      modalBackdrop = "modal-backdrop-nochange";
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} />;
    } else {
      modalBackdrop = "modal-backdrop-dark";
      modalBkg = "text-bg-dark";
      closeButtonColor = (
        <CloseButton onClick={this.handleCloseClick} variant="white" />
      );
    }

    let paymentSchedule = "";

    switch (
      this.props.ride.pmtType // pmtType: 1 On Dropoff
    ) {
      case 1:
        paymentSchedule = <b>On Dropoff</b>;
        break;
      case 2:
        paymentSchedule = <b>On Pickup</b>;
        break;
      default:
        paymentSchedule = <b>1/2 & 1/2</b>;
    }

    let priceUnit = "";
    let priceUnitDisplay;

    priceUnit = (this.props.ride.amt / this.props.ride.timeEst) * 30;
    priceUnitDisplay = handleDenomDisplay(priceUnit);
    //per half hour.. //bc per minute is small and could be kD..

    return (
      <Modal
        show={this.props.isModalShowing}
        backdropClassName={modalBackdrop}
        contentClassName={modalBkg}
      >
        {/* <Modal.Header> */}

        {/* NO HEADER JUST PUT EVERYTHING IN THE BODY??? -> PROBABLY NEED TO TEST AND LOOK AT ->  */}

        {/* <Modal.Title>
          <h3>
               <b>Selected Ride</b>
               </h3>
               </Modal.Title>  */}

        {/* </Modal.Header> */}
        <Modal.Body>
          <div className="postModalCloseButton">
            <Modal.Title>{closeButtonColor}</Modal.Title>
          </div>

          <div
            className="locationTitle"
            style={{ marginBottom: ".4rem", marginTop: ".4rem" }}
          >
            {this.props.ride.area !== "" &&
            this.props.ride.area !== undefined ? (
              <Badge bg="primary" style={{ marginRight: ".5rem" }}>
                {this.props.ride.area}
              </Badge>
            ) : (
              <></>
            )}

            <Badge bg="primary" style={{ marginRight: ".5rem" }}>
              {this.props.ride.city}
            </Badge>

            <Badge bg="primary">{this.props.ride.region}</Badge>
          </div>

          <div className="cardTitle">
            {/* {this.handleName(this.props.post)} */}

            <span
              style={{
                color: "#008de3",
                marginTop: ".2rem",
                marginBottom: "0rem",
              }}
            >
              <b>{this.props.uniqueName}</b>
            </span>

            {/* <span className="textsmaller">
                {this.formatDate(this.props.ride.$updatedAt)}
              </span> */}
          </div>

          <p></p>

          <div className="cardTitle">
            <div>
              <span style={{ whiteSpace: "pre-wrap" }}>
                {this.props.ride.pickupAddr}
              </span>
            </div>
          </div>

          <p></p>

          <div className="cardTitle">
            <span style={{ whiteSpace: "pre-wrap" }}>
              {this.props.ride.dropoffAddr}
            </span>
          </div>
          <p></p>
          <p style={{ marginBottom: ".2rem" }}>
            Estimated Time: <b>{this.props.ride.timeEst} minutes</b>
          </p>

          <p style={{ marginTop: "0rem", marginBottom: ".2rem" }}>
            Estimated Distance: <b>{this.props.ride.distEst}</b>
          </p>
          <div
            className="BottomBorder"
            style={{ paddingTop: ".7rem", marginBottom: ".7rem" }}
          ></div>
          <p
            style={{
              marginTop: ".6rem", //, textAlign: "right"
            }}
          >
            Pickup Time:{" "}
            <b style={{ color: "#008de4" }}>
              {getRelativeTimeAgo(this.props.ride.reqTime, Date.now())}
            </b>
          </p>

          <h5 style={{ marginTop: ".2rem", textAlign: "center" }}>
            {" "}
            Pays <b>{handleDenomDisplay(this.props.ride.amt)}</b>
          </h5>

          <p style={{ textAlign: "center", marginBottom: ".2rem" }}>
            ({priceUnitDisplay} per 30 minutes)
          </p>
          <div
            className="BottomBorder"
            style={{ paddingTop: ".7rem", marginBottom: ".7rem" }}
          ></div>

          <p style={{ marginBottom: ".2rem" }}>Payment: {paymentSchedule}</p>

          {/* <p style={{ whiteSpace: "pre-wrap" }}>
              {this.props.post.description}
            </p> */}

          <p style={{ marginTop: "0rem", marginBottom: ".2rem" }}>
            Passengers: <b>{this.props.ride.numOfRiders}</b>
          </p>

          {this.props.ride.extraInstr !== undefined &&
          this.props.ride.extraInstr !== "" ? (
            <>
              <p
                style={{
                  paddingBottom: "0.5rem",
                  whiteSpace: "pre-wrap",
                  textAlign: "center",
                }}
              >
                <b>{this.props.ride.extraInstr}</b>
              </p>
            </>
          ) : (
            <></>
          )}

          <p></p>
        </Modal.Body>
        <div className="TwoButtons">
          <Button variant="primary" onClick={() => this.props.deleteYourRide()}>
            <b>Delete Ride</b>
          </Button>
          <Button variant="primary" onClick={() => this.handleCloseClick()}>
            <b>Cancel</b>
          </Button>
        </div>
        <p></p>
      </Modal>
    );
  }
}

export default DeleteRideModal;
