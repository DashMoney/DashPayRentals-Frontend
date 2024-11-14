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

          {this.props.isMerchantRequestsRefreshReady ? (
            <>
              <div className="d-grid gap-2" id="button-edge-noTop">
                <Button
                  variant="primary"
                  onClick={() => {
                    this.props.refreshMerchantRequests();
                  }}
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

          {this.props.isLoadingRentals || this.props.isLoadingRequests ? (
            <>
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
              <Requests
                whichNetwork={this.props.whichNetwork}
                Rentals={this.props.Rentals}
                RentalRequests={this.props.RentalRequests}
                RentalConfirms={this.props.RentalConfirms}
                //
                RentalRequestsProxies={this.props.RentalRequestsProxies}
                RentalRequestsControllers={this.props.RentalRequestsControllers}
                //
                RentalRequestsNames={this.props.RentalRequestsNames}
                RentalReplies={this.props.RentalReplies}
                //
                handleSelectedRental={this.props.handleSelectedRental}
                handleConfirmRequestModal={this.props.handleConfirmRequestModal}
                handleMerchantReplyModalShow={
                  this.props.handleMerchantReplyModalShow
                }
                handleMerchantRequestFilter={
                  this.props.handleMerchantRequestFilter
                }
                handleDeleteBlockConfirmModal={
                  this.props.handleDeleteBlockConfirmModal
                }
                //
                identity={this.props.identity}
                uniqueName={this.props.uniqueName}
                isLoadingWallet={this.props.isLoadingWallet}
                accountHistory={this.props.accountHistory}
                mode={this.props.mode}
                DisplayRequests={this.props.DisplayRequests}
                //
                isLoadingRequests={this.props.isLoadingRequests}
                isRequestsRefreshReady={this.props.isRequestsRefreshReady}
                refreshRequests={this.props.refreshRequests}
              />
            </>
          )}
        </div>
      </>
    );
  }
}

export default RequestsPage;
