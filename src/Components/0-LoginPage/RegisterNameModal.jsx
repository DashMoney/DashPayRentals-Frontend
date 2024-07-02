import React from "react";
import LocalForage from "localforage";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import CloseButton from "react-bootstrap/CloseButton";

import Dash from "dash";

class RegisterNameModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      nameTaken: false,
      nameAvailable: false,
      searchedName: "",
      validityCheck: false,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  onChange = (event) => {
    this.setState({
      isError: false,
      isLoading: false,
      nameTaken: false,
      nameAvailable: false,
    });
    if (this.formValidate(event.target.value) === true) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        validityCheck: true,
      });
    } else {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        validityCheck: false,
      });
    }
  };

  formValidate = (nameInput) => {
    let regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/;
    let valid = regex.test(nameInput);

    if (valid) {
      this.setState({
        searchedName: nameInput,
      });
      return true;
    } else {
      return false;
    }
  };

  searchName = (nameToRetrieve) => {
    let client = new Dash.Client({ network: this.props.whichNetwork });

    const retrieveName = async () => {
      // Retrieve by full name (e.g., myname.dash)

      return client.platform.names.resolve(`${nameToRetrieve}.dash`);
    };

    retrieveName()
      .then((d) => {
        if (d === null) {
          this.setState({
            nameAvailable: true,
            nameTaken: false,
            isLoading: false,
            isError: false,
          });
        } else {
          console.log("Name retrieved:\n", d.toJSON());
          this.setState({
            nameTaken: true,
            nameAvailable: false,
            isLoading: false,
            isError: false,
          });
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);

        this.setState({
          nameTaken: false,
          nameAvailable: false,

          isLoading: false,
        });
      })
      .finally(() => client.disconnect());
  };

  purchaseName = (theName) => {
    const nameToRegister = theName; // Enter name to register

    const clientOpts = {
      network: this.props.whichNetwork,
      wallet: {
        mnemonic: this.props.mnemonic, // A Dash wallet mnemonic with testnet funds
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.props.skipSynchronizationBeforeHeight,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const registerName = async () => {
      const { platform } = client;

      const identity = await platform.identities.get(this.props.identity); // Your identity ID

      //const identity = this.props.identityRaw;

      const nameRegistration = await platform.names.register(
        `${nameToRegister}.dash`,
        { dashUniqueIdentityId: identity.getId() },
        identity
      );

      return nameRegistration;
    };

    registerName()
      .then((d) => {
        console.log("Name registered:\n", d.toJSON());
        this.props.handleName(d.toJSON().label);
        this.props.hideModal();
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState(
          {
            isError: true,
            isLoading: false,
          },
          () => this.props.triggerNameNotLoading()
        ); //ALSO CALL FUNCTION TO PREVENT END LOADING SPINNER.
        // this.props.triggerNameLoading(); //trigger for connected page spinner  // LIKE ^^^ THIS ONE, GOT FROM BELOW.
      })
      //Add an error state and end isLoading****
      .finally(() => client.disconnect());
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    let nameToTry = event.target.validationCustom02.value;

    this.setState({
      isLoading: true,
      searchName: event.target.value,
      isError: false,
    });

    if (this.state.nameAvailable) {
      if (this.formValidate(nameToTry)) {
        console.log(`A good one: ${nameToTry}`);
        ///this is where call function to Purchase the Name ****************************************************************
        this.props.triggerNameLoading(); //trigger for connected page spinner
        this.purchaseName(nameToTry);
      } else {
        console.log(`Not a good one: ${nameToTry}`);
      }
    } else {
      this.searchName(nameToTry);
    }
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

    return (
      <>
        <Modal
          contentClassName={modalBkg}
          backdropClassName={modalBackdrop}
          show={this.props.isModalShowing}
        >
          <Modal.Header>
            <Modal.Title>Purchase Your Dash Name!</Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <Form
              noValidate
              onSubmit={this.handleSubmitClick}
              onChange={this.onChange}
            >
              <Form.Group className="mb-3" controlId="validationCustom02">
                {this.state.isLoading ? (
                  <Form.Control
                    type="text"
                    placeholder={this.state.searchedName}
                    disabled
                  />
                ) : (
                  <Form.Control
                    type="text"
                    placeholder="Enter desired name here..."
                    required
                    // isInvalid={!this.state.validityCheck}
                    isValid={
                      this.state.validityCheck &&
                      !this.state.nameAvailable &&
                      !this.state.nameTaken
                    }
                  />
                )}

                <Form.Control.Feedback className="floatLeft" type="valid">
                  Name looks good!
                </Form.Control.Feedback>

                {this.state.isError ? (
                  <Alert variant="warning" dismissible>
                    Testnet Platform is having difficulties or the identity has
                    insufficient credits.
                  </Alert>
                ) : (
                  <></>
                )}

                {/* <p className="smallertext" style={{ color: "red" }}>
                    Testnet Platform is having difficulties or the identity has
                    insufficient credits.
                  </p> */}

                {this.state.nameAvailable ? (
                  <p
                    className="smallertext"
                    style={{ color: "green", marginTop: ".2rem" }}
                  >
                    <b>{this.state.searchedName} is available!</b>
                  </p>
                ) : (
                  <></>
                )}

                {this.state.nameTaken ? (
                  <p
                    className="smallertext"
                    style={{ color: "red", marginTop: ".2rem" }}
                  >
                    <b>{this.state.searchedName} is not available.</b>
                  </p>
                ) : (
                  <></>
                )}

                {this.state.isLoading ? (
                  <>
                    <p></p>
                    <div id="spinner">
                      <p></p>
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {this.state.validityCheck &&
                !this.state.isLoading &&
                !this.state.nameAvailable ? (
                  <>
                    <p></p>
                    <Button variant="primary" type="submit">
                      <b>Check Availability</b>
                    </Button>
                  </>
                ) : (
                  <></>
                )}

                {!this.state.validityCheck ||
                (this.state.isLoading && !this.state.nameAvailable) ? (
                  <>
                    <p></p>
                    <Button variant="primary" disabled>
                      <b>Check Availability</b>
                    </Button>
                  </>
                ) : (
                  <></>
                )}

                {this.state.validityCheck &&
                !this.state.isLoading &&
                this.state.nameAvailable ? (
                  <>
                    <div
                      className="d-grid gap-2"
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      <Button variant="primary" type="submit">
                        <b>Purchase Name</b>
                      </Button>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {this.state.isLoading && this.state.nameAvailable ? (
                  <>
                    <div
                      className="d-grid gap-2"
                      style={{
                        marginTop: "1rem",
                      }}
                    >
                      <Button variant="primary" disabled>
                        <b>Purchase Name</b>
                      </Button>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <p></p>

                <ul>
                  <li>
                    A name can consist of any combination of letters (UPPERCASE
                    or lowercase) and numbers with one hyphen (-) anywhere in
                    the middle.
                  </li>
                  <li>No spaces are allowed.</li>
                  <li>Length must be between 3 to 63 characters</li>
                  <li>
                    Examples
                    <ul>
                      <li>john</li>
                      <li>JohnDoe</li>
                      <li>John-Doe</li>
                      <li>JohnDoe001</li>
                      <li>THEJOHNDOE001</li>
                      <li>JOHN-DOE</li>
                    </ul>
                  </li>
                </ul>
                <p>
                  Interesting fact: If you own the name "JohnDoe", no one can
                  purchase any combination of UPPERCASE or lowercase characters
                  that match. Therefore, johndoe, JOHNDOE, johnDoe, etc.. would
                  all be unavailable.
                </p>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleCloseClick}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default RegisterNameModal;
