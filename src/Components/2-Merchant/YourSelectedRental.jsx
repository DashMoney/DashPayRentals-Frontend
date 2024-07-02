import React from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

import LowCreditsOnPage from "../LowCreditsOnPage";
//import CreditsOnPage from "../CreditsOnPage";

import formatDate from "../TimeDisplayShort";
import handleDenomDisplay from "../UnitDisplay";

import Calender from "../2-Merchant/CalenderComponents/Calendar";

import { IoMdArrowRoundBack } from "react-icons/io";

class YourSelectedRental extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LoadingRental: true,
      // copiedName: false,
      copiedAddress: false,
      //
      //ScheduleConfirms: [0, 4, 5, 6, 20, 21, 22, 23], //I just want a list of numbers I don't care about the confirms. 0-34
      //
      //JUST ^^^ PASS - RENTALID AND MerchantId AND QUERY STUFF ->
      //
      arrivalDate: "",
      departureDate: "",

      arrivalMs: "",
      departureMs: "",
    };
  }

  // handleArrivalDateCalc = () => {
  //   let dateArr = [];

  //   if (this.state.arrivalDate.length === 3) {
  //     dateArr = [...this.state.arrivalDate];
  //     //console.log(dateArr);
  //     const d = new Date(dateArr[0], dateArr[1], dateArr[2]);
  //     //  console.log(d);
  //     // console.log(d.getTime()); //.getTime() just w/o milliseconds
  //     this.setState({
  //       reqDateInput: d.getTime(),
  //       validReqTime: true,
  //     });
  //   } else {
  //     console.log("No date avail..");
  //     this.setState({
  //       reqDateInput: "",
  //       validReqTime: false,
  //     });
  //   }
  // };

  // handleDepartureDateCalc = () => {
  //   let dateArr = [];

  //   if (this.state.departureDate.length === 3) {
  //     dateArr = [...this.state.departureDate];
  //     //console.log(dateArr);
  //     const d = new Date(dateArr[0], dateArr[1], dateArr[2]);
  //     //  console.log(d);
  //     // console.log(d.getTime()); //.getTime() just w/o milliseconds
  //     this.setState({
  //       reqDateInput: d.getTime(),
  //       validReqTime: true,
  //     });
  //   } else {
  //     console.log("No date avail..");
  //     this.setState({
  //       reqDateInput: "",
  //       validReqTime: false,
  //     });
  //   }
  // };

  onChange = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.target.id === "formArrival") {
      // console.log(event.target.value);

      this.ArrivalDateParse(event.target.value);
    }
    if (event.target.id === "formDeparture") {
      // console.log(event.target.value);

      this.DepartureDateParse(event.target.value);
    }
  };

  ArrivalDateParse = (date) => {
    //2024-04-15
    // console.log(date);
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    month = (Number(month) - 1).toString();
    let day = date.slice(8, 10);
    // console.log(month);
    this.setState(
      {
        arrivalDate: new Date(year, month, day),
        arrivalMs: new Date(year, month, day).getTime(),
      } //,() => this.handleDateCalc()
    );
  };

  DepartureDateParse = (date) => {
    //2024-04-15
    // console.log(date);
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    month = (Number(month) - 1).toString();
    let day = date.slice(8, 10);
    // console.log(month);
    this.setState(
      {
        departureDate: new Date(year, month, day),
        departureMs: new Date(year, month, day).getTime(),
      } //,() => this.handleDateCalc()
    );
  };

  // QUERY REQUESTS OF CUSTOMER -> BASED ON RENTAL AND CUSTOMERiD
  //    -> CHAINED TO QUERY CONFIRM OF REQUEST
  //Or just pass here and filter... <-!!

  // componentDidMount() {
  // if (this.props.isLoginComplete && this.props.InitialPullReviews) {
  //   this.props.pullInitialTriggerREVIEWS();
  // }
  //  }
  render() {
    let today = new Date();
    let yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

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

    //max = "1979-12-31"; // FARTHEST bACK
    //let dateNow = new Date(Date.now() - 55000000); //This was that midnight thing
    //let dateMin = dateNow.toISOString().slice(0, 10);
    let dateMin = Date.now() - 55000000;
    let dateMinForm = new Date(dateMin).toISOString().slice(0, 10);
    //console.log(dateMin);

    //let dateMax = new Date(Date.now() + 7776000000);
    // dateMax = dateMax.toISOString().slice(0, 10);
    let dateMax = Date.now() + this.props.rental.howFarAhead * 86400000;
    let dateMaxForm = new Date(dateMax).toISOString().slice(0, 10);
    //console.log(dateMax);
    //ISO DATE FORMATE
    //min = "2000-01-02"; //FARTHEST FORWARD

    let datesOrdered = true;
    if (this.state.arrivalMs !== "" && this.state.departureMs !== "") {
      if (Number(this.state.arrivalMs) >= Number(this.state.departureMs)) {
        datesOrdered = false;
      } else {
        datesOrdered = true;
      }
    }
    // ALSO CHECK THE MINIMUM nUM oF dAYS AND mAX nUM oF dAYS ->
    let minDays = true;
    if (this.state.arrivalMs !== "" && this.state.departureMs !== "") {
      if (
        Number(this.state.departureMs) - Number(this.state.arrivalMs) <
        this.props.rental.min * 86400000
      ) {
        minDays = false;
      } else {
        minDays = true;
      }
    }
    let maxDays = true;
    if (this.state.arrivalMs !== "" && this.state.departureMs !== "") {
      if (
        Number(this.state.departureMs) - Number(this.state.arrivalMs) >
        this.props.rental.max * 86400000
      ) {
        maxDays = false;
      } else {
        maxDays = true;
      }
    }
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

          {this.props.LoadingRental ? (
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

          <div className="cardTitle">
            <Button
              variant="primary"
              onClick={() => this.props.handleSelectedDapp("Rentals")}
            >
              <IoMdArrowRoundBack size={28} />
            </Button>
            <h5>
              {" "}
              <b //style={{ color: "#008de4" }}
              >
                {this.props.rental.title}
              </b>
            </h5>
            <span className="textsmaller">
              {formatDate(
                this.props.rental.$updatedAt,
                this.props.today,
                this.props.yesterday
              )}
            </span>
          </div>

          <p></p>

          <Carousel slide={false} interval={null}>
            {carouselImgs}
          </Carousel>
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
          <div className="d-grid gap-2">
            <Button
              size="lg"
              variant="primary"
              // onClick={() =>
              //   this.props.handleSelectedRental(this.props.rental)
              // }
            >
              <b>Edit/Delete Rental</b>
            </Button>
          </div>
          <p></p>

          <div className="BottomBorder" style={{ paddingTop: ".5rem" }}></div>
          <p></p>

          {/* Schedule */}
          <Calender
            mode={this.props.mode}
            rental={this.props.rental}
            MerchantId={this.props.MerchantId}
            DataContractRENTALS={this.props.DataContractRENTALS}
            whichNetwork={this.props.whichNetwork}
            dateMin={dateMin}
            dateMinForm={dateMinForm}
            dateMax={dateMax}
            dateMaxForm={dateMaxForm}
          />

          <>
            <h6 style={{ color: "#008de4" }}>Reserve Dates</h6>
            {/* Date FORM BELOW */}
            <Form.Group
              className="mb-3"
              controlId="formArrival"
              onChange={this.onChange}
            >
              <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                <b>Arrival Date</b>
              </h5>
              <Form.Control
                type="date"
                placeholder="Date of Arrival.."
                max={dateMaxForm}
                min={dateMinForm}
                //  isInvalid={this.state.tooLongDateError}
                //isValid={this.state.validDate}
              />

              {/* <Form.Control.Feedback type="invalid">
                    Date info is too long.
                  </Form.Control.Feedback> */}
            </Form.Group>
            <p></p>
            {/* Date FORM BELOW */}
            <Form.Group
              className="mb-3"
              controlId="formDeparture"
              onChange={this.onChange}
            >
              <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                <b>Departure Date</b>
              </h5>
              <Form.Control
                type="date"
                placeholder="Date of Departure.."
                max={dateMaxForm}
                min={dateMinForm}
                //  isInvalid={this.state.tooLongDateError}
                //isValid={this.state.validDate}
              />

              {/* <Form.Control.Feedback type="invalid">
                    Date info is too long.
                  </Form.Control.Feedback> */}
            </Form.Group>
            {!datesOrdered ? (
              <>
                {" "}
                <p className="smallertext" style={{ color: "red" }}>
                  Arrival date is after departure date.
                </p>
              </>
            ) : (
              <></>
            )}
            {/* 
            {!minDays ? (
              <>
                {" "}
                <p className="smallertext" style={{ color: "red" }}>
                  Minimum number of days not reached.
                </p>
              </>
            ) : (
              <></>
            )}
            {!maxDays ? (
              <>
                {" "}
                <p className="smallertext" style={{ color: "red" }}>
                  Maximum number of days exceeded.
                </p>
              </>
            ) : (
              <></>
            )} */}

            <p></p>
            <div className="d-grid gap-2">
              {this.state.arrivalMs !== "" &&
              this.state.departureMs !== "" &&
              datesOrdered ? (
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() =>
                    this.props.handleBlockConfirmModal(
                      this.state.arrivalMs,
                      this.state.departureMs
                    )
                  }
                >
                  <b>Block Off Dates</b>
                </Button>
              ) : (
                <Button size="lg" variant="primary" disabled>
                  <b>Block Off Dates</b>
                </Button>
              )}
            </div>
            <p></p>
          </>

          {/* <p></p>
          <h4>
            <b>Your Reservations</b>
          </h4> */}
          <div
            className="BottomBorder"
            style={{ paddingTop: ".5rem", marginBottom: "1rem" }}
          ></div>
          {/* Amenities */}
          {this.props.rental.amenities !== undefined &&
          this.props.rental.amenities !== "" ? (
            <>
              <p
                style={{
                  paddingBottom: "0.5rem",
                  whiteSpace: "pre-wrap",
                  textAlign: "center",
                }}
              >
                <b>{this.props.rental.amenities}</b>
              </p>
            </>
          ) : (
            <></>
          )}
          <p></p>
          <div
            className="cardTitle"
            style={{ marginLeft: "1.5rem", marginRight: "1.5rem" }}
          >
            <div
              style={{
                textAlign: "center",
              }}
            >
              <h6>Minimum Days</h6>
              <p>
                <b>{this.props.rental.min}</b>
              </p>
            </div>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <h6>Maximum Days</h6>
              <p>
                <b>{this.props.rental.max}</b>
              </p>
            </div>
          </div>
          <p></p>

          {this.props.rental.extraInstr !== undefined &&
          this.props.rental.extraInstr !== "" ? (
            <>
              <p
                style={{
                  paddingBottom: "0.5rem",
                  whiteSpace: "pre-wrap",
                  textAlign: "center",
                }}
              >
                <b>{this.props.rental.extraInstr}</b>
              </p>
            </>
          ) : (
            <></>
          )}

          <p></p>
          <div className="BottomBorder"></div>

          <p></p>

          <div className="d-grid gap-2">
            <Button
              size="lg"
              variant="primary"
              // onClick={() =>
              //   this.props.handleSelectedRental(this.props.rental)
              // }
            >
              <b>Edit/Delete Rental</b>
            </Button>
          </div>
          <p></p>

          <h4>
            <b>Q&A</b>
          </h4>
          {/* {this.state.SearchedReviews.length === 0 && !this.state.LoadingDGR ? ( */}
          <div className="bodytext">
            <p>
              This is where Customer's questions and the owner's answers will
              go.
            </p>
          </div>
          {/* ) : (
            <></>
          )} */}
          <p></p>

          <h4>
            <b>Reviews</b>
          </h4>
          {/* {this.state.SearchedReviews.length === 0 && !this.state.LoadingDGR ? ( */}
          <div className="bodytext">
            <p>This is where Customer's reviews will go.</p>
          </div>
          {/* ) : (
            <></>
          )} */}
          <p></p>

          {/*  */}
          {/*  */}
          {/*  */}
          {/* <Rentals
            mode={this.props.mode}
            Rentals={this.props.Rentals}
            //SearchedReviewNames={this.props.SearchedReviewNames}
          /> */}

          {/* {this.props.Rentals.length === 0 && !this.props.isLoadingRentals ? (
            <div className="bodytext">
              <p>Sorry, there are no rentals available.</p>
            </div>
          ) : (
            <></>
          )} */}
        </div>
      </>
    );
  }
}

export default YourSelectedRental;
