import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

import ImgsComponent from "./ImgsComponent";

import { IoMdArrowRoundBack } from "react-icons/io";

//import handleDenomDisplay from "../UnitDisplay";

//Rental
/**
      name: "Beach House",

          // imgs: {img1: https://i.imgur.com/SCWLldx.png},
          img1: "https://i.imgur.com/SCWLldx.png",
          img2: "https://i.imgur.com/0JeY7E5.png",
          img3: "https://i.imgur.com/oQDp6Yp.png",

          description: "This place is pretty cool!",

          address: "100 Beach Drive \n Destin,Florida",

           amenities: "", //{kitchen: true, self checkin, TV, hot tub, free parking, washer and Dryer, dishwasher, wifi  }

       // maxOccupents: 3, //sleeps: 4
        howFarAhead: 180, //days in advance can schedule
        dailyRate: "",
        //numBR: 2,
        //numBD: 3,
       
 */

class CreateRental extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: "",
      validName: false,
      tooLongNameError: false,

      // 'Addr',
      addrInput: "",
      validAddr: false,
      tooLongAddrError: false,

      descriptionInput: "",
      validDescription: false,
      tooLongDescriptionError: false,

      imgStateArray: [],

      //linkStateArray: [],
      howFarAheadInput: "", //days in advance can schedule
      validHowFarAhead: false,
      tooLongHowFarAheadError: false,

      //'min'
      minInput: 1,
      validMin: true,
      tooLongMinError: false,

      //'max'
      maxInput: 30,
      validMax: true,
      tooLongMaxError: false,

      amenitiesInput: "",
      validAmenities: true,
      tooLongAmenitiesError: false,

      //paymentType: "1", //Payment Schedule OR COULD THIS BE PAYBEFORE OR PAYAFTER
      //Its always before <-

      // numOfBRsInput: 1,
      // numOfBHsInput: 1,

      // maxOccupents: 3, //sleeps: 4
      // validMaxOccupents: false,

      dailyRateInput: "",
      validDailyRate: false,

      //   'extraInstr',
      extraInstrInput: "",
      validextraInstr: true,
      tooLongextraInstrError: false,

      //'active'
      active: true,
    };
  }
  //imgStateArray
  addFieldOfImg = (stringURL) => {
    this.setState(
      {
        imgStateArray: [...this.state.imgStateArray, stringURL],
      },
      () => console.log(this.state.imgStateArray)
    );
  };

  removeFieldOfImg = () => {
    let removedFieldArray = this.state.imgStateArray;
    removedFieldArray.pop();
    this.setState({
      imgStateArray: removedFieldArray,
    });
  };

  handleActive = () => {
    if (this.state.active) {
      this.setState({
        active: false,
      });
    } else {
      this.setState({
        active: true,
      });
    }
  };

  onChange = (event) => {
    // console.log(event.target.value);

    //console.log(`id = ${event.target.id}`);
    if (event.target.id === "formName") {
      event.preventDefault();
      event.stopPropagation();
      this.nameValidate(event.target.value);
    }

    if (event.target.id === "formAddress") {
      event.preventDefault();
      event.stopPropagation();
      this.addrValidate(event.target.value);
    }
    if (event.target.id === "formDescription") {
      event.preventDefault();
      event.stopPropagation();
      this.descriptionValidate(event.target.value);
    }
    if (event.target.id === "formAmenities") {
      event.preventDefault();
      event.stopPropagation();
      this.amenitiesValidate(event.target.value);
    }

    if (event.target.id === "formHowFarAhead") {
      event.preventDefault();
      event.stopPropagation();
      this.howFarAheadValidate(event.target.value);
    }

    if (event.target.id === "formMinDays") {
      event.preventDefault();
      event.stopPropagation();
      this.minValidate(event.target.value);
    }
    if (event.target.id === "formMaxDays") {
      event.preventDefault();
      event.stopPropagation();
      this.maxValidate(event.target.value);
    }

    if (event.target.id === "formDailyRate") {
      event.preventDefault();
      event.stopPropagation();
      this.dailyRateValidate(event.target.value);
    }

    if (event.target.id === "formExtraInstr") {
      event.preventDefault();
      event.stopPropagation();
      this.extraInstrValidate(event.target.value);
    }
    if (event.target.id === "custom-switch") {
      event.stopPropagation();
      this.handleActive();
    }
  };

  //nameValidate
  nameValidate = (name) => {
    let regex = /^\S.{0,31}$/;
    let valid = regex.test(name);

    if (valid) {
      this.setState({
        nameInput: name,
        tooLongNameError: false,
        validName: true,
      });
    } else {
      if (name.length > 32) {
        this.setState({
          nameInput: name,
          tooLongNameError: true,
          validName: false,
        });
      } else {
        this.setState({
          nameInput: name,
          validName: false,
        });
      }
    }
  };

  addrValidate = (Addr) => {
    // let regex = /^[\S\s]{0,150}$/;
    // let valid = regex.test(Addr);

    let regex1 = /^.[\S\s]{0,249}$/;

    let valid1 = regex1.test(Addr);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,2}[^\r\n]*$/;

    let valid2 = regex2.test(Addr);

    let valid = false;

    if (valid1 && valid2) {
      valid = true;
    }

    if (valid) {
      this.setState({
        addrInput: Addr,
        tooLongAddrError: false,
        validAddr: true,
      });
    } else {
      if (Addr.length > 250) {
        this.setState({
          addrInput: Addr,
          tooLongAddrError: true,
          validAddr: false,
        });
      } else {
        this.setState({
          addrInput: Addr,
          validAddr: false,
        });
      }
    }
  };

  //descriptionValidate
  descriptionValidate = (description) => {
    // let regex = /^.[\S\s]{0,350}$/;

    // let valid = regex.test(description);

    let regex1 = /^.[\S\s]{0,349}$/;

    let valid1 = regex1.test(description);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,4}[^\r\n]*$/;

    let valid2 = regex2.test(description);

    let valid = false;

    if (valid1 && valid2) {
      valid = true;
    }

    if (valid) {
      this.setState({
        descriptionInput: description,
        validDescription: true,
        tooLongDescriptionError: false,
      });
    } else {
      if (description.length > 350 || !valid2) {
        this.setState({
          descriptionInput: description,
          validDescription: false,
          tooLongDescriptionError: true,
        });
      } else {
        this.setState({
          descriptionInput: description,
          validDescription: false,
        });
      }
    }
  };

  //amenitiesValidate
  amenitiesValidate = (amenities) => {
    // let regex = /^.[\S\s]{0,350}$/;

    // let valid = regex.test(amenities);

    let regex1 = /^.[\S\s]{0,349}$/;

    let valid1 = regex1.test(amenities);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,4}[^\r\n]*$/;

    let valid2 = regex2.test(amenities);

    let valid = false;

    if (valid1 && valid2) {
      valid = true;
    }

    if (valid) {
      this.setState({
        amenitiesInput: amenities,
        validAmenities: true,
        tooLongAmenitiesError: false,
      });
    } else {
      if (amenities.length > 350 || !valid2) {
        this.setState({
          amenitiesInput: amenities,
          validAmenities: false,
          tooLongAmenitiesError: true,
        });
      } else {
        this.setState({
          amenitiesInput: amenities,
          validAmenities: false,
        });
      }
    }
  };

  howFarAheadValidate = (days) => {
    let regex = /(^[0-9]{1,4}$)/;

    let valid = regex.test(days);

    if (valid && days > 0) {
      this.setState({
        howFarAheadInput: days,
        validHowFarAhead: true,
        tooLongHowFarAheadError: false,
      });
    } else if (days.length >= 5) {
      this.setState({
        howFarAheadInput: days,
        validHowFarAhead: false,
        tooLongHowFarAheadError: true,
      });
    } else {
      this.setState({
        howFarAheadInput: days,
        validHowFarAhead: false,
      });
    }
  }; //this is a number

  minValidate = (days) => {
    let regex = /(^[0-9]{1,3}$)/;
    // minInput: "",
    // validmin: false,

    let valid = regex.test(days);

    if (valid) {
      this.setState({
        minInput: days,
        validMin: true,
        tooLongMinError: false,
      });
    } else if (days.length >= 4) {
      this.setState({
        minInput: days,
        validMin: false,
        tooLongMinError: true,
      });
    } else {
      this.setState({
        minInput: days,
        validMin: false,
        tooLongMinError: false,
      });
    }
  };

  maxValidate = (days) => {
    let regex = /(^[0-9]{1,3}$)/;
    // maxInput: "",
    // validmax: false,

    let valid = regex.test(days);

    if (valid) {
      this.setState({
        maxInput: days,
        validMax: true,
        tooLongMaxError: false,
      });
    } else if (days.length >= 4) {
      this.setState({
        maxInput: days,
        validMax: false,
        tooLongMaxError: true,
      });
    } else {
      this.setState({
        maxInput: days,
        validMax: false,
        tooLongMaxError: false,
      });
    }
  };

  dailyRateValidate = (amount) => {
    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO minimum mDash possible

    let valid = regex.test(amount);

    if (valid) {
      this.setState({
        dailyRateInput: amount,
        validDailyRate: true,
      });
    } else {
      this.setState({
        dailyRateInput: amount,
        validDailyRate: false,
      });
    }
  };

  extraInstrValidate = (extraInstr) => {
    // let regex = /^.[\S\s]{0,350}$/;

    // let valid = regex.test(extraInstr);

    let regex1 = /^.[\S\s]{0,349}$/;

    let valid1 = regex1.test(extraInstr);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,4}[^\r\n]*$/;

    let valid2 = regex2.test(extraInstr);

    let valid = false;

    if (valid1 && valid2) {
      valid = true;
    }

    if (valid) {
      this.setState({
        extraInstrInput: extraInstr,
        validextraInstr: true,
        tooLongextraInstrError: false,
      });
    } else {
      if (extraInstr.length > 350 || !valid2) {
        this.setState({
          extraInstrInput: extraInstr,
          validextraInstr: false,
          tooLongextraInstrError: true,
        });
      } else {
        this.setState({
          extraInstrInput: extraInstr,
          validextraInstr: false,
        });
      }
    }
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    //console.log(event.target.ControlTextarea1.value);

    let newRental;

    newRental = {
      title: this.state.nameInput,
      description: this.state.descriptionInput,
      address: this.state.addrInput,

      imgArray: JSON.stringify(this.state.imgStateArray),
      linkArray: "",
      // cartItemsForDocCreation = JSON.stringify(cartItemsForDocCreation);
      // returnedDoc.cart = JSON.parse(returnedDoc.cart);

      howFarAhead: Number(this.state.howFarAheadInput),
      min: Number(this.state.minInput),
      max: Number(this.state.maxInput),

      amenities: this.state.amenitiesInput,

      rate: Number((this.state.dailyRateInput * 100000000).toFixed(0)),

      active: this.state.active,

      extraInstr: this.state.extraInstrInput,
    };

    console.log(newRental);
    this.props.createRental(newRental);
    this.props.handleSelectedDapp("Rentals");
  };

  render() {
    let dayMinimum = true;
    if (
      Number(this.state.minInput) >= Number(this.state.maxInput) &&
      this.state.validMin &&
      this.state.validMax
    ) {
      dayMinimum = false;
    } else {
      dayMinimum = true;
    }
    return (
      <>
        <Navbar bg={this.props.mode} variant={this.props.mode} fixed="top">
          <Container>
            {" "}
            <Button
              variant="primary"
              onClick={() => this.props.handleSelectedDapp("Rentals")}
            >
              <IoMdArrowRoundBack size={28} />
            </Button>{" "}
            <h3 style={{ textAlign: "center" }}>
              {this.props.mode === "primary" ? (
                <b className="lightMode">Create Rental</b>
              ) : (
                <b>Create Rental</b>
              )}
            </h3>
            <div style={{ marginRight: "4rem" }}></div>
          </Container>
        </Navbar>
        <div className="bodytext">
          <>
            <Form
              noValidate
              onSubmit={this.handleSubmitClick}
              onChange={this.onChange}
            >
              {/* Name FORM BELOW */}
              <Form.Group className="mb-3" controlId="formName">
                <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                  <b>Title of Rental</b>
                </h5>
                <Form.Control
                  type="text"
                  placeholder="Enter title of rental..."
                  required
                  isInvalid={this.state.tooLongNameError}
                  isValid={this.state.validName}
                />
                <p></p>
                <Form.Control.Feedback type="invalid">
                  Rental name is too long.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="bodytext">
                <ImgsComponent
                  imgStateArray={this.state.imgStateArray}
                  addFieldOfImg={this.addFieldOfImg}
                  removeFieldOfImg={this.removeFieldOfImg}
                  mode={this.props.mode}
                />
              </div>

              {/*  ADDRESS FORM BELOW */}
              <Form.Group className="mb-3" controlId="formAddress">
                <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                  Address
                </h5>
                <Form.Control
                  //onChange={this.onChange}
                  as="textarea"
                  rows={2}
                  placeholder="Enter address..."
                  required
                  isInvalid={this.state.tooLongAddrError}
                  isValid={this.state.validAddr}
                />
                <p></p>
                <Form.Control.Feedback type="invalid">
                  Address is too long.
                </Form.Control.Feedback>
              </Form.Group>

              {/* DESCRIPTION FORM BELOW */}

              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>
                  <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                    Description
                  </h5>
                </Form.Label>

                <Form.Control
                  // onChange={this.onChange}
                  as="textarea"
                  rows={2}
                  placeholder="Put description here.."
                  required
                  isInvalid={this.state.tooLongDescriptionError}
                  isValid={this.state.validDescription}
                />
                <p className="smallertext">
                  (e.g. Number of Bedrooms and Bathrooms, Max Number of
                  Occupents, Description of Rental Location)
                </p>
                <p></p>

                <Form.Control.Feedback className="floatLeft" type="invalid">
                  Sorry, this is too long! Please use less than 500 characters.
                </Form.Control.Feedback>
              </Form.Group>

              {/* AMENITIES FORM BELOW */}
              <Form.Group className="mb-3" controlId="formAmenities">
                <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                  <b>Amenities</b>
                </h5>
                <Form.Control
                  type="text"
                  placeholder="Add amenities here.."
                  required
                  isInvalid={this.state.tooLongAmenitiesError}
                  isValid={this.state.validAmenities}
                />
                <p className="smallertext">
                  (e.g. kitchen, Self-Checkin, TV, hot tub, free parking, washer
                  and dryer, dishwasher, wifi)
                </p>
                <p></p>
                <Form.Control.Feedback type="invalid">
                  Amenities is too long.
                </Form.Control.Feedback>
              </Form.Group>
              <div
                className="BottomBorder"
                style={{ paddingTop: ".5rem" }}
              ></div>
              <p></p>

              {/* HOW FAR AHEAD FORM BELOW */}

              <Form.Group className="mb-3" controlId="formHowFarAhead">
                <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                  Allow Schedule: How Far Ahead
                </h5>

                <InputGroup className="mb-3">
                  <Form.Control
                    type="number"
                    // step="1"
                    // precision="0"
                    // min="1"
                    // max="2000"
                    // defaultValue="15"
                    placeholder="Enter a number (days)"
                    required
                    isInvalid={this.state.tooLongHowFarAheadError}
                    isValid={this.state.validHowFarAhead}
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Text id="basic-addon2">days</InputGroup.Text>
                </InputGroup>

                <p></p>
                <Form.Control.Feedback type="invalid">
                  How Far Ahead is too long.
                </Form.Control.Feedback>
              </Form.Group>
              <div className="cardTitle">
                {/*  MIN FORM BELOW */}

                <Form.Group className="mb-3" controlId="formMinDays">
                  <Form.Label>
                    <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                      Minimum Days to Rent
                    </h5>
                  </Form.Label>

                  <Form.Control
                    type="number"
                    //step="1"
                    // precision="0"
                    //min="1"
                    //max="999"
                    //placeholder="1"
                    defaultValue={this.state.minInput}
                    required
                    isValid={this.state.validMin}
                    isInvalid={this.state.tooLongMinError}
                  />
                  <p></p>
                  <Form.Control.Feedback type="invalid">
                    Minimum days is too long.
                  </Form.Control.Feedback>
                  {/* <p className="smallertext">
                    (i.e. Must include 2 decimal precision)
                  </p> */}
                </Form.Group>

                {/*  MAX FORM BELOW */}
                <Form.Group className="mb-3" controlId="formMaxDays">
                  <Form.Label>
                    <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                      Maximum Days to Rent
                    </h5>
                  </Form.Label>

                  <Form.Control
                    type="number"
                    //step="1"
                    // precision="0"
                    // min="1"
                    //max="999"
                    //placeholder="1"
                    defaultValue={this.state.maxInput}
                    required
                    isValid={this.state.validMax}
                    isInvalid={this.state.tooLongMaxError}
                  />
                  <p></p>
                  <Form.Control.Feedback type="invalid">
                    Maximum days is too long (Max is 999).
                  </Form.Control.Feedback>
                  {/* <p className="smallertext">
                    (i.e. Must include 2 decimal precision)
                  </p> */}
                </Form.Group>
              </div>
              {!dayMinimum ? (
                <>
                  {" "}
                  <p className="smallertext" style={{ color: "red" }}>
                    Minimum days is not less than maximum days.
                  </p>
                </>
              ) : (
                <></>
              )}
              {/* PAYMENT SCHEDULE FORM BELOW */}

              {/* <Form.Group className="mb-3" controlId="formPaymentSchedule">
                <Form.Label>
                  <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                    Payment Schedule
                  </h5>
                </Form.Label>
                <Form.Select>
                  <option value="1">On Dropoff</option>
                  {/* <option value="2">On Pickup</option>
                    <option value="3">1/2 & 1/2</option> 
                </Form.Select>
              </Form.Group> */}

              {/*  AMT FORM BELOW */}

              <Form.Group className="mb-3" controlId="formDailyRate">
                <Form.Label>
                  <h4 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                    Daily Rate (in Dash)
                  </h4>
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="0.85 for example.."
                  required
                  isValid={this.state.validDailyRate}
                  //isInvalid={!this.state.validAmt}
                />
                {/* <p className="smallertext">
                    (i.e. Must include 2 decimal precision)
                  </p> */}
              </Form.Group>

              {/* NUMBER OF BEDROOMS FORM BELOW */}

              {/* <Form.Group className="mb-3" controlId="formNumOfBRs">
                <Form.Label>
                  <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                    Number of Bedrooms
                  </h5>
                </Form.Label>
                <Form.Select
                // controlId="formNumOfBRs"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">6+</option>
                </Form.Select>
              </Form.Group> */}

              {/* NUMBER OF BATHROOMS FORM BELOW */}

              {/* <Form.Group className="mb-3" controlId="formNumOfBHs">
                <Form.Label>
                  <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                    Number of Bathrooms
                  </h5>
                </Form.Label>
                <Form.Select
                // controlId="formNumOfBHs"
                >
                  <option value="0">0</option>
                  <option value=".5">.5</option>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                  <option value="3.5">3.5</option>
                  <option value="4">4</option>
                  <option value="5">4+</option>
                </Form.Select>
              </Form.Group> */}

              <Form.Group className="mb-3" id="formGridCheckbox">
                {/* <Form.Label>
                  <b>Is Post Active?</b>
                </Form.Label> */}
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={this.state.active ? <b>Active</b> : <b>Inactive</b>}
                />

                <p>
                  <b>Active</b> means people can schedule days to rent.
                </p>
              </Form.Group>

              {/* EXTRA INFO FORM BELOW */}

              <Form.Group className="mb-3" controlId="formExtraInstr">
                <Form.Label>
                  <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                    Extra Instructions
                  </h5>
                </Form.Label>

                <Form.Control
                  // onChange={this.onChange}
                  as="textarea"
                  rows={2}
                  placeholder="(Optional)"
                  required
                  isInvalid={this.state.tooLongextraInstrError}
                  isValid={this.state.validextraInstr}
                />

                {this.state.tooLongextraInstrError ? (
                  <Form.Control.Feedback className="floatLeft" type="invalid">
                    Sorry, this is too long! Please use less than 300
                    characters.
                  </Form.Control.Feedback>
                ) : (
                  <></>
                )}
              </Form.Group>

              <div className="ButtonRightNoUnderline">
                <>
                  {this.state.validName &&
                  this.state.validAddr &&
                  this.state.validDescription &&
                  this.state.validAmenities &&
                  this.state.validDailyRate &&
                  this.state.validHowFarAhead &&
                  this.state.validMin &&
                  this.state.validMax &&
                  dayMinimum &&
                  this.state.validextraInstr ? (
                    <Button variant="primary" type="submit">
                      <b>Create Rental</b>
                    </Button>
                  ) : (
                    <Button variant="primary" disabled>
                      <b>Create Rental</b>
                    </Button>
                  )}
                </>
              </div>
            </Form>
          </>
        </div>
      </>
    );
  }
}

export default CreateRental;
