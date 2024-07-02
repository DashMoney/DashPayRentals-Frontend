// Rental and the Schedule of Accepted
import React from "react";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";

import Image from "react-bootstrap/Image";

class YourRental extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copiedName: false,
    };
  }

  handleNameClick = () => {
    navigator.clipboard.writeText(`${this.props.tuple[0]}`);
    this.setState({
      copiedName: true,
    });
  };

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
                <b style={{ color: "#008de4" }}>{this.props.rental.title}</b>
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

            <Card.Text>{this.props.rental.description}</Card.Text>
            <p></p>
            <div className="d-grid gap-2">
              <Button
                // size="lg"
                variant="primary"
                onClick={() =>
                  this.props.handleSelectedRental(this.props.rental)
                }
              >
                <b>View/Edit Rental</b>
              </Button>
            </div>
            <p></p>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default YourRental;
