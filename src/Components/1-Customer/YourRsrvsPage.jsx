import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

//import LowCreditsOnPage from "../LowCreditsOnPage";
import CreditsOnPage from "../CreditsOnPage";

import YourRsrvs from "./YourRsrvs";

class YourRsrvsPage extends React.Component {
  //https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
  scrollToTop = () => {
    this.positionStart.scrollIntoView({
      behavior: "instant",
      block: "start",
      inline: "nearest",
    });
  };

  componentDidMount() {
    this.scrollToTop();
    //   if (this.props.isLoginComplete && this.props.InitialPullCustomer) {
    //     this.props.pullInitialTriggerCUSTOMER();
    //   }
  }
  render() {
    return (
      <>
        <div
          className="bodytext"
          ref={(el) => {
            this.positionStart = el;
          }}
        >
          {/* <LowCreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          /> */}

          <CreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />

          <h5 style={{ marginTop: ".2rem" }}>
            <b>Reservations</b>{" "}
          </h5>

          {this.props.isYourRsrvsRefreshReady ? (
            <div className="d-grid gap-2" id="button-edge-noTop">
              <Button
                variant="primary"
                onClick={() => {
                  this.props.refreshYourRsrvs();
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
          <p></p>

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

          {this.props.RentalRequests.length === 0 ||
          this.props.isLoadingRequests ? (
            <></>
          ) : (
            <>
              <YourRsrvs
                whichNetwork={this.props.whichNetwork}
                mode={this.props.mode}
                identity={this.props.identity}
                MerchantNameDoc={this.props.MerchantNameDoc}
                uniqueName={this.props.uniqueName}
                //
                handleSelectedPage={this.props.handleSelectedPage}
                handleSelectedRental={this.props.handleSelectedRental}
                handleCustomerReplyModalShow={
                  this.props.handleCustomerReplyModalShow
                }
                handleDeleteRequestModal={this.props.handleDeleteRequestModal}
                //
                isLoadingRentals={this.props.isLoadingRentals}
                isLoadingRequests={this.props.isLoadingRequests}
                Rentals={this.props.Rentals}
                RentalRequests={this.props.RentalRequests}
                RentalConfirms={this.props.RentalConfirms}
                RentalReplies={this.props.RentalReplies}
              />
            </>
          )}

          {this.props.RentalRequests.length === 0 &&
          !this.props.isLoadingRequests ? (
            <div className="bodytext">
              <p>Sorry, no requests have been made.</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default YourRsrvsPage;
