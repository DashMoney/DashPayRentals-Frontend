import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import CreditsOnPage from "../CreditsOnPage";

import Calendar from "./CalendarComponents/Calendar";

import handleDenomDisplay from "../UnitDisplay";

import YourRentals from "./YourRentals";

class YourRentalsPage extends React.Component {
  // componentDidMount() {
  //   if (this.props.isLoginComplete && this.props.InitialPullRentals) {
  //     this.props.pullInitialTriggerRENTALS();
  //   }
  // }

  render() {
    return (
      <>
        <div className="bodytext">
          <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />
          {/* <div id="sidetextonlysides">
            {this.props.isLoadingWallet ? (
              <>
                <div className="paddingBadge">
                  <b>Wallet Balance</b>

                  <h4>Loading..</h4>
                </div>
              </>
            ) : (
              <>
                <div className="paddingBadge">
                  <b>Wallet Balance</b>
                  <h4 style={{ color: "#008de4" }}>
                    <b>{handleDenomDisplay(this.props.accountBalance, 1)}</b>
                  </h4>
                </div>
              </>
            )}
          </div> */}
          <p></p>
          <div className="d-grid gap-2">
            {this.props.isLoadingRentals ? (
              <>
                <Button variant="primary" disabled>
                  <b style={{ fontSize: "larger" }}>Create Rental</b>
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  // onClick={() => this.props.showModal("CreateRideModal")}
                  onClick={() => this.props.handleSelectedDapp("Create Rental")}
                >
                  <b style={{ fontSize: "larger" }}>Create Rental</b>
                </Button>
              </>
            )}
          </div>
          {this.props.isLoadingRentals ? (
            <>
              <p></p>
              <div id="spinner">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
              <p></p>
            </>
          ) : (
            <></>
          )}

          <p></p>
          <YourRentals
            Rentals={this.props.Rentals}
            identity={this.props.identity}
            uniqueName={this.props.uniqueName}
            handleSelectedRental={this.props.handleSelectedRental}
            //

            isLoadingWallet={this.props.isLoadingWallet}
            accountHistory={this.props.accountHistory}
            mode={this.props.mode}
            isLoadingYourRentals={this.props.isLoadingYourRentals}
            isYourRentalsRefreshReady={this.props.isYourRentalsRefreshReady}
            refreshYourRentals={this.props.refreshYourRentals}
            //handleYourRentalMsgModalShow={this.props.handleYourRentalMsgModalShow}
          />
        </div>
      </>
    );
  }
}

export default YourRentalsPage;
