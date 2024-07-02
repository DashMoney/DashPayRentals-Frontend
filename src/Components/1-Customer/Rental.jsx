// Rental and the Schedule of Accepted
import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

import Image from "react-bootstrap/Image";

import handleDenomDisplay from "../UnitDisplay";

class Rental extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //copiedName: false,
      copiedAddress: false,
    };
  }

  // handleNameClick = () => {
  //   navigator.clipboard.writeText(`${this.props.tuple[0]}`);
  //   this.setState({
  //     copiedName: true,
  //   });
  // };

  formatDate(theCreatedAt, today, yesterday) {
    let CreatedAt = new Date(theCreatedAt);

    const timeOptions = {
      hour: "numeric",
      minute: "2-digit", //numeric?
    };

    function isSameDay(date1, date2) {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    }

    if (isSameDay(CreatedAt, today)) {
      // it's today
      return `Today at ${CreatedAt.toLocaleTimeString(undefined, timeOptions)}`;
    }

    if (isSameDay(CreatedAt, yesterday)) {
      // it was yesterday
      return `Yesterday at ${CreatedAt.toLocaleTimeString(
        undefined,
        timeOptions
      )}`;
    }
    let dateReturn = CreatedAt.toLocaleDateString().concat(
      "  ",
      CreatedAt.toLocaleTimeString(undefined, timeOptions)
    );
    return dateReturn;
  }

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
    let carouselImgs = this.props.rental.imgArray.map((img, index) => {
      return (
        <Carousel.Item index={index} key={index}>
          <Image
            src={img}
            fluid //rounded
          />
        </Carousel.Item>
      );
    });

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
            <Card.Title className="cardTitle">
              <h5>
                {" "}
                <b //style={{ color: "#008de4" }}
                >
                  {this.props.rental.title}
                </b>
              </h5>
              <span className="textsmaller">
                {this.formatDate(
                  this.props.rental.$updatedAt,
                  this.props.today,
                  this.props.yesterday
                )}
              </span>
            </Card.Title>
            <Carousel slide={false} interval={null}>
              {carouselImgs}
            </Carousel>
            <p></p>
            <div className="d-grid gap-2">
              <Button
                // size="lg"
                variant="primary"
                onClick={() =>
                  this.props.handleSelectedRental(this.props.rental)
                }
              >
                <b> View Availability</b>
              </Button>
            </div>
            <p></p>
            {/* <p
              className="textsmaller"
              style={{ marginTop: "1rem", textAlign: "center" }}
            >
              <b> *Click on me to view availability!*</b>{" "}
            </p> */}

            <p></p>
            {this.props.rental.address !== undefined &&
            this.props.rental.address !== "" ? (
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
                <span style={{ whiteSpace: "pre-wrap" }}>
                  {this.props.rental.address}
                </span>

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
            {/* Description */}
            <p style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              {this.props.rental.description}
            </p>

            {/* Amount */}
            <h5 style={{ marginTop: ".2rem", textAlign: "center" }}>
              {" "}
              <b style={{ color: "#008de4" }}>
                {handleDenomDisplay(this.props.rental.rate)}
              </b>{" "}
              per day
            </h5>

            {/* <Card.Text>{this.props.rental.description}</Card.Text> */}
            {/* <p style={{ marginTop: "1rem" }}>{this.props.rental.description}</p> */}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Rental;
