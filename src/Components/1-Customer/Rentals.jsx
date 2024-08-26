import React from "react";

import Rental from "./Rental";

class Rentals extends React.Component {
  render() {
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    let rentals = this.props.Rentals.map((rental, index) => {
      //console.log(post);
      return (
        <div key={index} style={{ marginBottom: "0.1rem" }}>
          <Rental
            whichNetwork={this.props.whichNetwork}
            //key={index}
            mode={this.props.mode}
            index={index}
            rental={rental}
            today={today}
            yesterday={yesterday}
            identity={this.props.identity} //For if my review so can edit
            //uniqueName={this.props.uniqueName}

            //handleSelectedDapp={this.props.handleSelectedDapp}

            handleSelectedRental={this.props.handleSelectedRental}
          />
        </div>
      );
    });

    return <>{rentals}</>;
  }
}

export default Rentals;
