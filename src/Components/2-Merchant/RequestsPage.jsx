import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import CreditsOnPage from "../CreditsOnPage";

import handleDenomDisplay from "../UnitDisplay";

import Requests from "./Requests";

class RequestsPage extends React.Component {
  // componentDidMount() {
  //   if (this.props.isLoginComplete && this.props.InitialPullMerchant) {
  //     this.props.pullInitialTriggerMERCHANT();
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
          <div id="sidetextonlysides">
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
          </div>

          {this.props.isLoadingRentals || this.props.isLoadingRequests ? (
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
          {this.props.isLoadingRequests ? (
            <></>
          ) : (
            <>
              <p></p>
              <Requests
                Rentals={this.props.Rentals}
                RentalRequests={this.props.RentalRequests}
                RentalConfirms={this.props.RentalConfirms}
                //
                handleSelectedRental={this.props.handleSelectedRental}
                handleConfirmRequestModal={this.props.handleConfirmRequestModal}
                //
                identity={this.props.identity}
                uniqueName={this.props.uniqueName}
                handleConfirmYourDriverModal={
                  this.props.handleConfirmYourDriverModal
                }
                isLoadingWallet={this.props.isLoadingWallet}
                accountHistory={this.props.accountHistory}
                mode={this.props.mode}
                //
                isLoadingRequests={this.props.isLoadingRequests}
                isRequestsRefreshReady={this.props.isRequestsRefreshReady}
                refreshRequests={this.props.refreshRequests}
                //handleYourRentalMsgModalShow={this.props.handleYourRentalMsgModalShow}
              />
            </>
          )}
        </div>
      </>
    );
  }
}

export default RequestsPage;
