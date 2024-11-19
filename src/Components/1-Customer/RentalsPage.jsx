import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import LowCreditsOnPage from "../LowCreditsOnPage";
import CreditsOnPage from "../CreditsOnPage";

import Rentals from "./Rentals";

class RentalsPage extends React.Component {
  componentDidMount() {
    // if (this.props.isLoginComplete && this.props.InitialPullReviews) {
    //   this.props.pullInitialTriggerREVIEWS();
    // }
  }
  render() {
    return (
      <>
        <div className="bodytext">
          <LowCreditsOnPage
            identityInfo={this.props.identityInfo}
            uniqueName={this.props.uniqueName}
            showModal={this.props.showModal}
          />

          {/* <CreditsOnPage
                    identityInfo={this.props.identityInfo}
                    uniqueName={this.props.uniqueName}
                    showModal={this.props.showModal}
                  /> */}

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

          <Rentals
            whichNetwork={this.props.whichNetwork}
            mode={this.props.mode}
            Rentals={this.props.Rentals}
            //handleSelectedDapp={this.props.handleSelectedDapp}
            handleSelectedRental={this.props.handleSelectedRental}
            //SearchedReviewNames={this.props.SearchedReviewNames}
          />

          {this.props.Rentals.length === 0 && !this.props.isLoadingRentals ? (
            <div className="bodytext" style={{ textAlign: "center" }}>
              <p>Sorry, there are no rentals available.</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default RentalsPage;
