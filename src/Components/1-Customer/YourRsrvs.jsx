import React from "react";

import YourRsrv from "./YourRsrv";

class YourRsrvs extends React.Component {
  render() {
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    let requests = this.props.RentalRequests.map((request, index) => {
      //console.log(post);
      return (
        <div key={index} style={{ marginBottom: "0.1rem" }}>
          <YourRsrv
            //key={index}
            mode={this.props.mode}
            index={index}
            request={request}
            today={today}
            yesterday={yesterday}
            identity={this.props.identity} //For if my review so can edit
            //uniqueName={this.props.uniqueName}

            handleSelectedYourRsrv={this.props.handleSelectedYourRsrv}
            handleSelectedDapp={this.props.handleSelectedDapp}
            handleSelectedRental={this.props.handleSelectedRental}
            isLoadingRentals={this.props.isLoadingRentals}
            isLoadingRequests={this.props.isLoadingRequests}
            Rentals={this.props.Rentals}
            RentalRequests={this.props.RentalRequests}
            RentalConfirms={this.props.RentalConfirms}
          />
        </div>
      );
    });

    return <>{requests}</>;
  }
}

export default YourRsrvs;
