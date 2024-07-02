import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import InputGroup from "react-bootstrap/InputGroup";
import CloseButton from "react-bootstrap/CloseButton";

import handleDenomDisplay from "../../UnitDisplay";

//Ride Request
/**
        'area', //can just be ''
        'city',
        'region',
        'reqTime', //DATE.now()

        'pickupAddr',
        'dropoffAddr',
        
        //pmtForm: QEdits, Duffs, both
        'pmtType', //OnArrival OnDropoff 1/2&1/2 // 1,2,5050, 2080 OnConfirm??

        'timeEst', // number input convert to number
        'timeEstUnit', //just minutes for now


        'distEst', //just do a string convert to number
        'distEstUnit', //don't use for now don't need

        'amt',
        'extraInstr',
        'numOfRiders',
        'replyId',
        //toId
        'txId1',
        //txId2
        //txId3

 */

// validArea;
// validCity;
// validRegion;
// validpickupAddr;
// validdropoffAddr;
// //pmtForm
// validtimeEst;
// //validtimeEstUnit;
// validdistEst;
// //validdistEstUnit
// //paymentType
// validAmt;
// validReqTime;
// //numOfRidersInput
// validextraInstr;

class EditRideModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areaInput: this.props.selectedYourRide.area,
      validArea: true,
      tooLongAreaError: false,

      cityInput: this.props.selectedYourRide.city,
      validCity: true,
      tooLongCityError: false,

      regionInput: this.props.selectedYourRide.region,
      validRegion: true,
      tooLongRegionError: false,

      // 'pickupAddr',
      pickupAddrInput: this.props.selectedYourRide.pickupAddr,
      validpickupAddr: true,
      tooLongpickupAddrError: false,

      //   'dropoffAddr',
      dropoffAddrInput: this.props.selectedYourRide.dropoffAddr,
      validdropoffAddr: true,
      tooLongdropoffAddrError: false,

      //'timeEst', // number input convert to number
      timeEstInput: this.props.selectedYourRide.timeEst,
      validtimeEst: true,
      tooLongtimeEstError: false,

      //  'distEst', //just do a string convert to number
      distEstInput: this.props.selectedYourRide.distEst,
      validdistEst: true,
      tooLongdistEstError: false,

      paymentType: this.props.selectedYourRide.pmtType, //Payment Schedule

      amtInput: Number(
        (this.props.selectedYourRide.amt / 100000000).toFixed(5)
      ),
      validAmt: true,

      //

      reqTimeInput: this.props.selectedYourRide.reqTime,
      //IN 5 in 15 in 30
      //set custom
      validReqTime: true,

      selectedPickupTime: "",

      reqTimeTime: [],
      reqTimeDate: [],

      numOfRidersInput: this.props.selectedYourRide.numOfRiders,

      //   'extraInstr',
      extraInstrInput: this.props.selectedYourRide.extraInstr,
      validextraInstr: true,
      tooLongextraInstrError: false,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  handlePickupTimeButtons = (time) => {
    this.setState(
      {
        selectedPickupTime: time,
        reqTimeTime: [],
        reqTimeDate: [],
        reqTimeInput: "",
      },
      () => {
        if (time !== "Custom") {
          this.handleDateTimeCalcNotCustom(time);
        }
      }
    );
  };

  handleDateTimeCalcNotCustom = (time) => {
    let dateTime = Date.now();
    if (this.state.selectedPickupTime === "Right now") {
      this.setState({
        reqTimeInput: dateTime + 60000,
        validReqTime: true,
      });
      //console.log(dateTime);
    } else if (this.state.selectedPickupTime === "20 mins") {
      this.setState({
        reqTimeInput: dateTime + 1230000,
        validReqTime: true,
      });
      // console.log(dateTime);
    } else if (this.state.selectedPickupTime === "1 hour") {
      this.setState({
        reqTimeInput: dateTime + 3630000,
        validReqTime: true,
      });
      //console.log(dateTime);
    } else {
      console.log("No Not Custom Time");
    }
  };

  handleDateTimeCalc = () => {
    //errors to handle
    // past date
    //past time on date
    // incomplete date time
    // if (this.state.reqTimeInput === "") {
    //   this.setState({
    //     reqTimeInput: "incomplete",
    //     validReqTime: false,
    //   });
    // }
    //
    let dateArr = [];

    if (
      this.state.reqTimeDate.length === 3 &&
      this.state.reqTimeTime.length === 2
    ) {
      dateArr = [...this.state.reqTimeDate, ...this.state.reqTimeTime];
      //console.log(dateArr);
      const d = new Date(
        dateArr[0],
        dateArr[1],
        dateArr[2],
        dateArr[3],
        dateArr[4]
      );
      //  console.log(d);
      // console.log(d.getTime()); //.getTime() just w/o milliseconds
      this.setState({
        reqTimeInput: d.getTime(),
        validReqTime: true,
      });
    } else {
      console.log("No date avail..");
      this.setState({
        reqTimeInput: "",
        validReqTime: false,
      });
    }
  };

  handlePaymentSchedule = (num) => {
    this.setState(
      {
        paymentType: num,
      },
      () => console.log(this.state.paymentType)
    );
  };

  handleNumOfRiders = (num) => {
    this.setState(
      {
        numOfRidersInput: num,
      },
      () => console.log(this.state.numOfRidersInput)
    );
  };

  onChange = (event) => {
    // console.log(event.target.value);

    //console.log(`id = ${event.target.id}`);

    if (event.target.id === "formAreaName") {
      event.preventDefault();
      event.stopPropagation();
      this.areaValidate(event.target.value);
    }

    if (event.target.id === "formCityName") {
      event.preventDefault();
      event.stopPropagation();
      this.cityValidate(event.target.value);
    }

    if (event.target.id === "formRegionName") {
      event.preventDefault();
      event.stopPropagation();
      this.regionValidate(event.target.value);
    }

    if (event.target.id === "formPickupAddress") {
      event.preventDefault();
      event.stopPropagation();
      this.pickupAddrValidate(event.target.value);
    }
    if (event.target.id === "formDropoffAddress") {
      event.preventDefault();
      event.stopPropagation();
      this.dropoffAddrValidate(event.target.value);
    }

    if (event.target.id === "formTimeEstimate") {
      event.preventDefault();
      event.stopPropagation();
      this.timeEstValidate(event.target.value);
    }
    if (event.target.id === "formDistanceEstimate") {
      event.preventDefault();
      event.stopPropagation();
      this.distEstValidate(event.target.value);
    }
    //Payment Schedule
    if (event.target.id === "formPaymentSchedule") {
      event.stopPropagation();
      this.handlePaymentSchedule(event.target.value);
    }
    //Ride Price
    if (event.target.id === "formAmount") {
      event.preventDefault();
      event.stopPropagation();
      this.amtValidate(event.target.value);
    }
    if (event.target.id === "formReqTime") {
      event.preventDefault();
      event.stopPropagation();
      //console.log(event.target.value);
      //console.log(event);
      this.reqTimeTimeParse(event.target.value);
    }
    if (event.target.id === "formReqTimeDate") {
      event.preventDefault();
      event.stopPropagation();
      //console.log(event.target.value);
      //console.log(event);
      this.reqTimeDateParse(event.target.value);
    }

    if (event.target.id === "formNumOfRiders") {
      event.stopPropagation();
      this.handleNumOfRiders(event.target.value);
    }

    if (event.target.id === "formExtraInstr") {
      event.preventDefault();
      event.stopPropagation();
      this.extraInstrValidate(event.target.value);
    }
  };

  areaValidate = (area) => {
    let regex = /^[\S\s]{0,32}$/;
    let valid = regex.test(area);

    if (valid) {
      this.setState({
        areaInput: area,
        tooLongAreaError: false,
        validArea: true,
      });
    } else {
      if (area.length > 32) {
        this.setState({
          areaInput: area,
          tooLongAreaError: true,
          validArea: false,
        });
      } else {
        this.setState({
          areaInput: area,
          validArea: false,
        });
      }
    }
  };

  cityValidate = (city) => {
    let regex = /^\S.{1,30}\S$/;
    let valid = regex.test(city);

    if (valid) {
      this.setState({
        cityInput: city,
        tooLongCityError: false,
        validCity: true,
      });
    } else {
      if (city.length > 32) {
        this.setState({
          cityInput: city,
          tooLongCityError: true,
          validCity: false,
        });
      } else {
        this.setState({
          cityInput: city,
          validCity: false,
        });
      }
    }
  };

  regionValidate = (region) => {
    let regex = /^\S.{1,30}\S$/;
    let valid = regex.test(region);

    if (valid) {
      this.setState({
        regionInput: region,
        tooLongRegionError: false,
        validRegion: true,
      });
    } else {
      if (region.length > 32) {
        this.setState({
          regionInput: region,
          tooLongRegionError: true,
          validRegion: false,
        });
      } else {
        this.setState({
          regionInput: region,
          validRegion: false,
        });
      }
    }
  };

  pickupAddrValidate = (pickupAddr) => {
    // let regex = /^[\S\s]{0,150}$/;
    // let valid = regex.test(pickupAddr);

    let regex1 = /^.[\S\s]{0,149}$/;

    let valid1 = regex1.test(pickupAddr);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,2}[^\r\n]*$/;

    let valid2 = regex2.test(pickupAddr);

    let valid = false;

    if (valid1 && valid2) {
      valid = true;
    }

    if (valid) {
      this.setState({
        pickupAddrInput: pickupAddr,
        tooLongpickupAddrError: false,
        validpickupAddr: true,
      });
    } else {
      if (pickupAddr.length > 150) {
        this.setState({
          pickupAddrInput: pickupAddr,
          tooLongpickupAddrError: true,
          validpickupAddr: false,
        });
      } else {
        this.setState({
          pickupAddrInput: pickupAddr,
          validpickupAddr: false,
        });
      }
    }
  };

  dropoffAddrValidate = (dropoffAddr) => {
    // let regex = /^[\S\s]{0,150}$/;
    // let valid = regex.test(dropoffAddr);

    let regex1 = /^.[\S\s]{0,149}$/;

    let valid1 = regex1.test(dropoffAddr);

    let regex2 = /^(?:[^\r\n]*(?:\r\n?|\n)){0,2}[^\r\n]*$/;

    let valid2 = regex2.test(dropoffAddr);

    let valid = false;

    if (valid1 && valid2) {
      valid = true;
    }

    if (valid) {
      this.setState({
        dropoffAddrInput: dropoffAddr,
        tooLongdropoffAddrError: false,
        validdropoffAddr: true,
      });
    } else {
      if (dropoffAddr.length > 150) {
        this.setState({
          dropoffAddrInput: dropoffAddr,
          tooLongdropoffAddrError: true,
          validdropoffAddr: false,
        });
      } else {
        this.setState({
          dropoffAddrInput: dropoffAddr,
          validdropoffAddr: false,
        });
      }
    }
  };

  timeEstValidate = (time) => {
    let regex = /(^[0-9]{1,4}$)/;
    // timeEstInput: "",
    // validtimeEst: false,
    // tooLongtimeEstError: false,

    let valid = regex.test(time);

    if (valid && time > 0) {
      this.setState({
        timeEstInput: time,
        validtimeEst: true,
        tooLongtimeEstError: false,
      });
    } else if (time.length >= 5) {
      this.setState({
        timeEstInput: time,
        validtimeEst: false,
        tooLongtimeEstError: true,
      });
    } else {
      this.setState({
        timeEstInput: time,
        validtimeEst: false,
      });
    }
  }; //this is a number

  distEstValidate = (distEst) => {
    let regex = /^\S.{0,31}$/;
    let valid = regex.test(distEst);

    if (valid) {
      this.setState({
        distEstInput: distEst,
        tooLongdistEstError: false,
        validdistEst: true,
      });
    } else {
      if (distEst.length > 32) {
        this.setState({
          distEstInput: distEst,
          tooLongdistEstError: true,
          validdistEst: false,
        });
      } else {
        this.setState({
          distEstInput: distEst,
          validdistEst: false,
        });
      }
    }
  };

  //Payment Schedule is just dropdown

  //amtValidate - props.accountBalance checks for sufficient money
  amtValidate = (amount) => {
    //console.log(this.props.accountBalance);

    //let regex = /(^[0-9]+[.,]{0,1}[0-9]*$)|(^[.,][0-9]+$)/;

    let regex = /(^[0-9]+[.,]{0,1}[0-9]{0,5}$)|(^[.,][0-9]{1,5}$)/;
    //CHANGED TO LIMIT TO minimum mDash possible

    let valid = regex.test(amount);

    // let result = this.props.accountBalance - amount * 100000000;
    //console.log(result);
    let result = 1;
    // amtInput: 0,
    //   validAmt: false,

    if (result >= 0 && valid && amount > 0) {
      this.setState({
        amtInput: amount,
        validAmt: true,
        amtError: "",
      });
    } else if (result < 0) {
      this.setState({
        amtInput: amount,
        validAmt: false,
        amtError: "Insufficient Funds",
      });
    } else {
      this.setState({
        amtInput: amount,
        validAmt: false,
        amtError: "",
      });
    }
  };

  reqTimeTimeParse = (time) => {
    //13:54
    let hour = time.slice(0, 2);
    let minute = time.slice(3, 5);
    minute = (Number(minute) + 1).toString();
    this.setState(
      {
        reqTimeTime: [hour, minute],
      },
      () => this.handleDateTimeCalc()
    );
  };

  reqTimeDateParse = (date) => {
    //2024-04-15
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    month = (Number(month) - 1).toString();
    let day = date.slice(8, 10);
    this.setState(
      {
        reqTimeDate: [year, month, day],
      },
      () => this.handleDateTimeCalc()
    );
  };
  //Num of Passengers is Dropdown
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

    //CHANGE TO edittedRIDE AND SET THE LOWERCASE HERE!
    let edittedRide;

    edittedRide = {
      area: this.state.areaInput.toLocaleLowerCase(),
      city: this.state.cityInput.toLocaleLowerCase(),
      region: this.state.regionInput.toLocaleLowerCase(),

      pickupAddr: this.state.pickupAddrInput,
      dropoffAddr: this.state.dropoffAddrInput,

      timeEst: Number(this.state.timeEstInput),
      //  'timeEstUnit'
      distEst: this.state.distEstInput,
      // 'distEstUnit',

      //pmtForm  QEdits, Duffs, both

      pmtType: Number(this.state.paymentType), //1 ,2, 3 //OnArrival OnDropoff 1/2&1/2 // 1,2,5050, 2080 OnConfirm??

      amt: Number((this.state.amtInput * 100000000).toFixed(0)),

      reqTime: this.state.reqTimeInput,
      numOfRiders: Number(this.state.numOfRidersInput),
      extraInstr: this.state.extraInstrInput,

      replyId: "",
      // toId:''
      txId1: "",
      //txId2: '',// sort out in createRide Function ->
    };

    console.log(edittedRide);
    this.props.editYourRide(edittedRide);
    this.props.hideModal();
  };

  render() {
    let modalBkg = "";
    let closeButtonColor;
    let modalBackdrop;

    if (this.props.mode === "primary") {
      modalBackdrop = "modal-backdrop-nochange";
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} />;
    } else {
      modalBackdrop = "modal-backdrop-dark";
      modalBkg = "text-bg-dark";
      closeButtonColor = (
        <CloseButton onClick={this.handleCloseClick} variant="white" />
      );
    }

    //max = "1979-12-31"; // FARTHEST bACK
    let dateNow = new Date(Date.now() - 55000000);
    let dateMin = dateNow.toISOString().slice(0, 10);
    //console.log(dateMin);

    let dateMax = new Date(Date.now() + 7776000000);
    dateMax = dateMax.toISOString().slice(0, 10);
    //console.log(dateMax);
    //ISO DATE FORMATE
    //min = "2000-01-02"; //FARTHEST FORWARD

    let timeMinimum = false;
    if (
      this.state.reqTimeInput !== "" &&
      this.state.reqTimeInput < Date.now()
    ) {
      timeMinimum = true;
    }
    //If you set time in the past this will trigger the error alert

    let priceUnit = "";
    let priceUnitDisplay;
    if (this.state.validtimeEst && this.state.validAmt) {
      priceUnit = (this.state.amtInput / this.state.timeEstInput) * 30;
      priceUnitDisplay = handleDenomDisplay((priceUnit * 100000000).toFixed(0));
      //per half hour.. //bc per minute is small and could be kD..
    }

    // let priceUnitProps = "";
    // let priceUnitDisplayProps;

    // priceUnitProps =
    //   (this.props.selectedYourRide.amt / this.props.selectedYourRide.timeEst) *
    //   30;
    // priceUnitDisplayProps = handleDenomDisplay(priceUnit);

    return (
      <>
        <Modal
          show={this.props.isModalShowing}
          backdropClassName={modalBackdrop}
          contentClassName={modalBkg}
        >
          <Modal.Header style={{ paddingBottom: ".2rem" }}>
            <Modal.Title>
              <h3>
                <b>Ride Request</b>
              </h3>
            </Modal.Title>
            {closeButtonColor}
          </Modal.Header>

          {/* <div className="BottomBorder" style={{ paddingTop: ".5rem" }}></div> */}

          <Modal.Body>
            <p style={{ textAlign: "center", color: "#008de3" }}>
              Search Criteria
            </p>

            <>
              <Form
                noValidate
                onSubmit={this.handleSubmitClick}
                onChange={this.onChange}
              >
                {/* AREA FORM BELOW */}
                <Form.Group className="mb-3" controlId="formAreaName">
                  <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                    Area
                  </h5>
                  <Form.Control
                    type="text"
                    placeholder="(Optional)"
                    defaultValue={this.props.selectedYourRide.area}
                    required
                    isInvalid={this.state.tooLongAreaError}
                    isValid={this.state.validArea}
                  />
                  <p className="smallertext">
                    (e.g. Downtown, by Costco, Stadium, or Airport)
                  </p>
                  <p></p>
                  <Form.Control.Feedback type="invalid">
                    Area name is too long.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* CITY FORM BELOW */}
                <Form.Group className="mb-3" controlId="formCityName">
                  <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                    City/Town
                  </h5>
                  <Form.Control
                    type="text"
                    defaultValue={this.props.selectedYourRide.city}
                    required
                    isInvalid={this.state.tooLongCityError}
                    isValid={this.state.validCity}
                  />
                  <p></p>
                  <Form.Control.Feedback type="invalid">
                    City/Town name is too long.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* REGION FORM BELOW */}
                <Form.Group className="mb-3" controlId="formRegionName">
                  <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                    Region
                  </h5>
                  <Form.Control
                    type="text"
                    defaultValue={this.props.selectedYourRide.region}
                    required
                    isInvalid={this.state.tooLongRegionError}
                    isValid={this.state.validRegion}
                  />
                  <p></p>
                  <Form.Control.Feedback type="invalid">
                    State/Province name is too long.
                  </Form.Control.Feedback>
                </Form.Group>

                <div
                  className="BottomBorder"
                  style={{ paddingTop: ".5rem" }}
                ></div>
                <p></p>
                <p style={{ textAlign: "center", color: "#008de3" }}>
                  Ride Details
                </p>
                {/* PICKUP ADDRESS FORM BELOW */}
                <Form.Group className="mb-3" controlId="formPickupAddress">
                  <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                    Pickup Address
                  </h5>
                  <Form.Control
                    //onChange={this.onChange}
                    as="textarea"
                    rows={2}
                    defaultValue={this.props.selectedYourRide.pickupAddr}
                    required
                    isInvalid={this.state.tooLongpickupAddrError}
                    isValid={this.state.validpickupAddr}
                  />
                  <p></p>
                  <Form.Control.Feedback type="invalid">
                    Address is too long.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* DROPOFF ADDRESS FORM BELOW */}
                <Form.Group className="mb-3" controlId="formDropoffAddress">
                  <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                    Dropoff Address
                  </h5>
                  <Form.Control
                    //onChange={this.onChange}
                    as="textarea"
                    rows={2}
                    defaultValue={this.props.selectedYourRide.dropoffAddr}
                    required
                    isInvalid={this.state.tooLongdropoffAddrError}
                    isValid={this.state.validdropoffAddr}
                  />
                  <p></p>
                  <Form.Control.Feedback type="invalid">
                    Address is too long.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* TIME ESTIMATE FORM BELOW */}

                <Form.Group className="mb-3" controlId="formTimeEstimate">
                  <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                    Time Estimate
                  </h5>

                  <InputGroup className="mb-3">
                    <Form.Control
                      type="number"
                      // step="1"
                      // precision="0"
                      // min="1"
                      // max="2000"
                      // defaultValue="15"

                      defaultValue={this.props.selectedYourRide.timeEst}
                      required
                      isInvalid={this.state.tooLongtimeEstError}
                      isValid={this.state.validtimeEst}
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Text id="basic-addon2">minutes</InputGroup.Text>
                  </InputGroup>

                  <p></p>
                  <Form.Control.Feedback type="invalid">
                    Time estimate is too long.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* DISTANCE ESTIMATE FORM BELOW */}

                <Form.Group className="mb-3" controlId="formDistanceEstimate">
                  <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                    Distance Estimate
                  </h5>

                  <Form.Control
                    type="text"
                    defaultValue={this.props.selectedYourRide.distEst}
                    required
                    isInvalid={this.state.tooLongdistEstError}
                    isValid={this.state.validdistEst}
                  />
                  <p className="smallertext">(e.g. 15 miles or 20 km)</p>
                  <p></p>
                  <Form.Control.Feedback type="invalid">
                    Distance estimate is too long.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* PAYMENT SCHEDULE FORM BELOW */}

                <Form.Group className="mb-3" controlId="formPaymentSchedule">
                  <Form.Label>
                    <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                      Payment Schedule
                    </h5>
                  </Form.Label>
                  <Form.Select>
                    <option value="1">On Dropoff</option>
                    {/* <option value="2">On Pickup</option>
                    <option value="3">1/2 & 1/2</option> */}
                  </Form.Select>
                </Form.Group>

                {/*  AMT FORM BELOW */}

                <Form.Group className="mb-3" controlId="formAmount">
                  <Form.Label>
                    <h4 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                      Ride Price (in Dash)
                    </h4>
                  </Form.Label>
                  {/* let priceUnit = "";
    let priceUnitDisplay; */}
                  <Form.Control
                    type="text"
                    defaultValue={this.state.amtInput}
                    required
                    isValid={this.state.validAmt}
                    //isInvalid={!this.state.validAmt}
                  />
                  {/* <p className="smallertext">
                    (i.e. Must include 2 decimal precision)
                  </p> */}
                </Form.Group>

                {priceUnit !== "" ? (
                  <p>
                    <b>{priceUnitDisplay} per 30 minutes</b>
                  </p>
                ) : (
                  <></>
                )}

                <div
                  className="BottomBorder"
                  style={{ paddingTop: ".5rem" }}
                ></div>
                <p></p>

                {/* 'reqTime', //DATE.now() Have to convert to a time for display
                 */}
                {/* REQ TIME FORM BELOW */}
                {/* BUTTONS AND CUSTOM */}

                <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                  <b>Time of Pickup</b>
                </h5>

                {/* {this.state.selectedPickupTime === "" ? (
                  <>
                    {" "}
                    <p className="smallertext" style={{ color: "red" }}>
                      Please select a time for pickup.
                    </p>
                  </>
                ) : (
                  <></>
                )} */}
                {/* Selected Time */}
                {this.state.selectedPickupTime === "Right now" ? (
                  <Button
                    variant="primary"
                    style={{
                      textDecoration: "underline",
                      marginRight: ".5rem",
                      marginBottom: ".7rem",
                    }}
                  >
                    <b>Right now</b>
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    style={{ marginRight: ".5rem", marginBottom: ".7rem" }}
                    onClick={() => this.handlePickupTimeButtons("Right now")}
                  >
                    <b>Right now</b>
                  </Button>
                )}

                {this.state.selectedPickupTime === "20 mins" ? (
                  <Button
                    variant="primary"
                    style={{
                      textDecoration: "underline",
                      marginRight: ".5rem",
                      marginBottom: ".7rem",
                    }}
                  >
                    <b
                      style={{
                        paddingLeft: ".5rem",
                        paddingRight: ".5rem",
                      }}
                    >
                      In 20 mins
                    </b>
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    style={{
                      marginBottom: ".7rem",
                      marginRight: ".5rem",
                    }}
                    onClick={() => this.handlePickupTimeButtons("20 mins")}
                  >
                    <b
                      style={{
                        paddingLeft: ".5rem",
                        paddingRight: ".5rem",
                      }}
                    >
                      In 20 mins
                    </b>
                  </Button>
                )}

                {this.state.selectedPickupTime === "1 hour" ? (
                  <Button
                    variant="primary"
                    style={{
                      textDecoration: "underline",
                      marginRight: ".5rem",

                      marginBottom: ".7rem",
                    }}
                  >
                    <b>In 1 hour</b>
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    style={{ marginRight: ".5rem", marginBottom: ".7rem" }}
                    onClick={() => this.handlePickupTimeButtons("1 hour")}
                  >
                    <b>In 1 hour</b>
                  </Button>
                )}

                {this.state.selectedPickupTime === "Custom" ? (
                  <Button
                    variant="primary"
                    style={{
                      textDecoration: "underline",
                      marginRight: ".5rem",
                      marginBottom: ".7rem",
                    }}
                  >
                    <b
                      style={{
                        paddingLeft: ".7rem",
                        paddingRight: ".7rem",
                      }}
                    >
                      Custom
                    </b>
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    style={{ marginRight: ".5rem", marginBottom: ".7rem" }}
                    onClick={() => this.handlePickupTimeButtons("Custom")}
                  >
                    <b
                      style={{
                        paddingLeft: ".7rem",
                        paddingRight: ".7rem",
                      }}
                    >
                      Custom
                    </b>
                  </Button>
                )}

                {this.state.selectedPickupTime === "Custom" ? (
                  <>
                    {/* Time FORM BELOW */}

                    <Form.Group className="mb-3" controlId="formReqTime">
                      <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                        <b>Pickup Time</b>
                      </h5>
                      <Form.Control
                        type="time"
                        // placeholder="Enter time (Optional)"
                        required
                        // isInvalid={this.state.tooLongTimeError}
                        // isValid={this.state.validTime}
                      />
                      <p></p>
                      {/* <Form.Control.Feedback type="invalid">
                    Time info is too long.
                  </Form.Control.Feedback> */}
                    </Form.Group>
                    <p></p>
                    {/* Date FORM BELOW */}
                    <Form.Group className="mb-3" controlId="formReqTimeDate">
                      <h5 style={{ marginTop: ".2rem", marginBottom: ".2rem" }}>
                        <b>Pickup Date</b>
                      </h5>
                      <Form.Control
                        type="date"
                        //placeholder="Enter date (Optional)"
                        required
                        max={dateMax}
                        min={dateMin}
                        //  isInvalid={this.state.tooLongDateError}
                        //isValid={this.state.validDate}
                      />
                      {/* <p className="smallertext">
                    (e.g."Friday, 2nd of January" or "Every Saturday")
                  </p> */}
                      {/* <p></p> */}
                      {/* <Form.Control.Feedback type="invalid">
                    Date info is too long.
                  </Form.Control.Feedback> */}
                    </Form.Group>
                  </>
                ) : (
                  <></>
                )}

                {this.state.validReqTime && !timeMinimum ? (
                  <>
                    {" "}
                    <p className="smallertext" style={{ color: "green" }}>
                      Time looks good.
                    </p>
                  </>
                ) : (
                  <></>
                )}
                {timeMinimum ? (
                  <>
                    {" "}
                    <p className="smallertext" style={{ color: "red" }}>
                      This time is in the past.
                    </p>
                  </>
                ) : (
                  <></>
                )}
                <div
                  className="BottomBorder"
                  style={{ paddingTop: ".5rem" }}
                ></div>
                <p></p>

                {/* NUMBER OF PASSENGERS FORM BELOW */}

                <Form.Group className="mb-3" controlId="formNumOfRiders">
                  <Form.Label>
                    <h5 style={{ marginTop: ".5rem", marginBottom: ".2rem" }}>
                      Number of Passengers
                    </h5>
                  </Form.Label>
                  <Form.Select
                  // controlId="formNumOfRiders"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">Other</option>
                  </Form.Select>
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
                    //placeholder="(Optional)"
                    defaultValue={this.props.selectedYourRide.extraInstr}
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
                    {this.state.validArea &&
                    this.state.validCity &&
                    this.state.validRegion &&
                    this.state.validpickupAddr &&
                    this.state.validdropoffAddr &&
                    this.state.validtimeEst &&
                    this.state.validdistEst &&
                    this.state.validAmt &&
                    this.state.validReqTime &&
                    !timeMinimum &&
                    this.state.validextraInstr ? (
                      <Button variant="primary" type="submit">
                        <b>Edit Ride</b>
                      </Button>
                    ) : (
                      <Button variant="primary" disabled>
                        <b>Edit Ride</b>
                      </Button>
                    )}
                  </>
                </div>
              </Form>
            </>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default EditRideModal;
