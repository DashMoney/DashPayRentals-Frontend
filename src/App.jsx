import React from "react";
import LocalForage from "localforage";

import Image from "react-bootstrap/Image";

import DashBkgd from "./Images/dash_digital-cash_logo_2018_rgb_for_screens.png";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TopNav from "./Components/TopNav/TopNav";

import "./App.css";
import LoginForm from "./Components/0-LoginPage/LoginForm";
import AccountLogin from "./Components/0-LoginPage/AccountLogin";

import YourRentalsPage from "./Components/2-Merchant/YourRentalsPage";
import RequestsPage from "./Components/2-Merchant/RequestsPage";

import RentalsPage from "./Components/1-Customer/RentalsPage";
import SelectedRentalPage from "./Components/1-Customer/SelectedRentalPage";
import YourRsrvsPage from "./Components/1-Customer/YourRsrvsPage";

import CreateRental from "./Components/2-Merchant/CreateRental";
import YourSelectedRental from "./Components/2-Merchant/YourSelectedRental";

import ConfirmRequestModal from "./Components/2-Merchant/MerchantModals/ConfirmRequestModal";
import BlockConfirmModal from "./Components/2-Merchant/MerchantModals/BlockConfirmModal";
import MakeRequestModal from "./Components/1-Customer/CustomerModals/MakeRequestModal";

import MerchantReplyModal from "./Components/2-Merchant/MerchantModals/MerchantReplyModal";
import CustomerReplyModal from "./Components/1-Customer/CustomerModals/CustomerReplyModal";

import TopUpIdentityModal from "./Components/TopUpIdentityModal";
import FrontEndExplaination from "./Components/FrontEndExplaination";

import CreateNewWalletModal from "./Components/0-LoginPage/CreateNewWalletModal";
import RegisterIdentityModal from "./Components/0-LoginPage/RegisterIdentityModal";

import RegisterNameModal from "./Components/0-LoginPage/RegisterNameModal";
//import WalletTXModal from "./Components/WalletTXModal";

import SendFundsModal from "./Components/0-LoginPage/SendFundsModal";
import LogoutModal from "./Components/0-LoginPage/LogoutModal";

import dapiClient from "./Components/DapiClient";
import dapiClientNoWallet from "./Components/DapiClientNoWallet";

import Dash from "dash";

const {
  PlatformProtocol: { Identifier },
} = Dash;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,

      mode: import.meta.env.VITE_BKGD,
      //mode: "dark", //from .env -> import.meta.env.VITE_BKGD

      //ACCOUNT 'LOGIN' PAGE STATE
      isLoadingIdentity: true,
      isLoadingIdInfo: true,
      //isLoadingCreditTransfer: false,
      isLoadingName: true,
      isLoadingMerchantName: true,

      isLoadingWallet: true, //For wallet for topup

      // isIdentityControlShowing: false,

      identityError: false,
      idInfoError: false,
      nameError: false,
      //ACCOUNT 'LOGIN' PAGE STATE^^^^^^

      selectedDapp: "Rentals", //"Requests",

      presentModal: "",
      isModalShowing: false,
      whichNetwork: import.meta.env.VITE_NETWORK,

      mnemonic: "",

      identity: "",
      identityInfo: "",
      identityRaw: "",
      uniqueName: "",

      accountBalance: "",
      accountHistory: "",
      accountAddress: "",
      walletId: "",

      platformLogin: false,

      DashMoneyLFKeys: [],
      //
      skipSynchronizationBeforeHeight: 1029000,

      //skipSynchronizationBeforeHeightTESTNET: 1029000,

      isLoadingRentals: true,
      isLoadingRequests: true,

      SelectedRental: "", // should be the rental document

      selectedRequest: "",

      selectedArriveDate: "",
      selectedDepartureDate: "",

      selectedConfirm: "",
      selectedReplyNameDoc: "", //Just for merchant reply

      isMerchantRequestsRefreshReady: true,
      isYourRsrvsRefreshReady: true,

      Merchant1: false,
      Merchant2: false,

      InitialPullCustomer: true,
      InitialPullMerchant: true,

      Rentals: [
        // {
        //   $id: "ajlsku4infalu",
        //   $ownerId: "47hareuifh",
        //   // title, description, address, imgArray, linkArray, howFarAhead, min, max, amenities, rate, extraInstr, active
        //   title: "Beach House",
        //   description: "This place is pretty cool! Sleeps up to 6 people.",
        //   address: "100 Beach Drive \n Destin,Florida",
        //   imgArray: [
        //     "https://i.imgur.com/SCWLldx.png",
        //     "https://i.imgur.com/0JeY7E5.png",
        //     "https://i.imgur.com/oQDp6Yp.png",
        //   ],
        //   linkArray: "",
        //   //maxOccupents: 3, //sleeps: 4
        //   howFarAhead: 180, //days in advance
        //   min: 1,
        //   max: 30,
        //   //
        //   //Minimum number of days,?!
        //   // Maximum number of days ?!
        //   // numBR: 2,
        //   // numBD: 3,
        //   amenities: "Full kitchen, Self Checkin, and Wifi",
        //   //{kitchen: true, self checkin, TV, hot tub, free parking, washer and Dryer, dishwasher, wifi  }
        //   rate: 150000000,
        //   extraInstr:
        //     "Please ensure you pay in full at least 3 days prior to arrival.",
        //   active: true,
        //   $updatedAt: Date.now() - 500000,
        // },
        //
        //
        // {
        //   $id: "ajlsku4inf56787678alu",
        //   $ownerId: "47hare67867867768uifh",
        //   title: "Lake House",
        //   description:
        //     "Enjoy a beautiful weekend or week on the lake! Fishing, boating and fun! Sleeps up to 10 people.",
        //   address: "654 Fishing Lane \nFreeTown, Dashland",
        //   imgArray: [
        //     "https://i.imgur.com/h6Zk6oa.jpeg",
        //     "https://i.imgur.com/T234T33.jpeg",
        //     "https://i.imgur.com/DNYSfhT.jpeg",
        //   ],
        //   linkArray: "",
        //   //maxOccupents: 3, //sleeps: 4
        //   howFarAhead: 365, //days in advance
        //   min: 2,
        //   max: 7,
        //   amenities: "Full kitchen, Hot Tub, and Wifi",
        //   //{kitchen: true, self checkin, TV, hot tub, free parking, washer and Dryer, dishwasher, wifi  }
        //   rate: 300000000,
        //   extraInstr:
        //     "Send me a friend request on DashPay to facilitate payments. Thanks!",
        //   active: true,
        //   $updatedAt: Date.now() - 500000,
        // },
      ],

      //PULL THE REST OF THIS WITH THE SELECTED <- ***
      //AND PULLS BASED ON CUSTOMER OR MERCHANT <-
      RentalRequests: [
        // {
        //   $id: "k4w6hwsg54gw54",
        //   $ownerId: "a4g5bs45h54",
        //   arriveDate: Date.now() + 3000000,
        //   //   type: 'integer',
        //   //   minimum: 0,
        //   //   maximum: 99999999999999,
        //   departDate: Date.now() + 20000000,
        //   rentalId: "ajlsku4infalu",
        //   amt: 900000000,
        //   txId: "",
        //   $createdAt: Date.now() - 500000,
        //   $updatedAt: Date.now() - 500000,
        // },
      ], //This can be queried on signin

      RentalRequestsNames: [], //This is only used by Merchant

      RentalConfirms: [
        // {
        //   $id: "6w6lwwwwwwwwwwg",
        //   $ownerId: "47hare67867867768uifh",
        //   arriveDate: Date.now() + 3000000,
        //   departDate: Date.now() + 20000000,
        //   rentalId: "ajlsku4infalu",
        //   reqId: "k4w6hwsg54gw54",
        //   amt: 900000000,
        //   $createdAt: Date.now() - 400000,
        //   $updatedAt: Date.now() - 400000,
        // },
        //   {
        //     $id: "6w6lwwwwwwwwwwg",
        //     $ownerId: "47hare67867867768uifh",
        //     arriveDate: new Date(2024, 8, 15).getTime(),
        //     //   type: 'integer',
        //     //   minimum: 0,
        //     //   maximum: 99999999999999,
        //     departDate: new Date(2024, 8, 19).getTime(),
        //     rentalId: "ajlsku4infalu",
        //     reqId: "k4w6hwsg54gw54",
        //     amt: 900000000,
        //     $createdAt: Date.now() - 400000,
        //     $updatedAt: Date.now() - 400000,
        //   },
      ], //This can be searched on page load like groups

      RentalReplies: [],

      MerchantId: import.meta.env.VITE_MERCHANT_IDENTITY,

      MerchantNameDoc: {
        $ownerId: import.meta.env.VITE_MERCHANT_IDENTITY,
        label: "No name avail", //import.meta.env.VITE_FRONTEND_NAME
      },

      DisplayRequests: "Requests",

      //REVIEWS (BELOW)

      //isLoadingReviewsSearch: false,
      isLoadingYourReviews: true,

      SearchReviews1: false,
      SearchReviews2: false,

      YourReviews1: false,
      YourReviews2: false,

      YourReviews: [],
      YourReviewNames: [],

      YourReplies: [],
      //^^ Doesn't need names because they are only your replies.. -> yes

      // SearchedNameDoc: {
      //   $ownerId: "JAdeE9whiXXdxzSrz7Rd1i8aHC3XFh5AvuV7cpxcYYmN",
      //   label: "BurgerJoint",
      // },

      SearchedReviews: [
        // {
        //   $ownerId: "4h5j6j",
        //   $id: "7ku98rj",
        //   review: "Good service, would eat here again!",
        //   rating: 5,
        //   toId: "fjghtyru",
        //   $createdAt: Date.now() - 1000000,
        // },
      ],

      SearchedReviewNames: [
        // {
        //   $ownerId: "4h5j6j",
        //   label: "Alice",
        // },
      ],

      SearchedReplies: [
        // {
        //   $ownerId: "JAdeE9whiXXdxzSrz7Rd1i8aHC3XFh5AvuV7cpxcYYmN",
        //   $id: "klsui4312",
        //   reply: "Thanks Alice",
        //   reviewId: "7ku98rj",
        //   $createdAt: Date.now() - 300000,
        // },
      ],

      reviewToEdit: [], //use a function to find and pass to modal ->
      reviewToEditIndex: "",

      replyReview: [], //This is for the create reply reviewId
      replyToEdit: [],
      replyingToName: "",

      //REVIEWS STATE^^^^^^

      // DataContractDPNS: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
      // DataContractRENTALS: '5mxuMjDW9FBFysnyoX31jAo1QpvvBFRhrJcHNTeYM1Zx',
      //DataContractREVIEWS: "",

      expandedTopNav: false,
    };
  }

  closeTopNav = () => {
    this.setState({
      expandedTopNav: false,
    });
  };

  toggleTopNav = () => {
    if (this.state.expandedTopNav) {
      this.setState({
        expandedTopNav: false,
      });
    } else {
      this.setState({
        expandedTopNav: true,
      });
    }
  };

  hideModal = () => {
    this.setState({
      isModalShowing: false,
    });
  };

  showModal = (modalName) => {
    this.setState({
      presentModal: modalName,
      isModalShowing: true,
    });
  };

  handleMode = () => {
    if (this.state.mode === "primary")
      this.setState(
        {
          mode: "dark",
        },
        () => this.setFrontendLFmode()
      );
    else {
      this.setState(
        {
          mode: "primary",
        },
        () => this.setFrontendLFmode()
      );
    }
  };

  setFrontendLFmode = () => {
    let DashFrontend = LocalForage.createInstance({
      name: "dash-frontend",
    });
    DashFrontend.setItem("mode", this.state.mode)
      .then((d) => {
        console.log("Return from LF setitem:", d);
      })
      .catch((err) => {
        console.error("Something went wrong setting to localForage:\n", err);
      });
  };

  handleLogout = () => {
    window.location.reload();
  };

  componentDidMount() {
    LocalForage.config({
      name: "dash-frontend",
    });
    let DashFrontend = LocalForage.createInstance({
      name: "dash-frontend",
    });
    DashFrontend.getItem("mode")
      .then((modeVal) => {
        if (modeVal !== null) {
          this.setState({
            mode: modeVal,
          });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
    //
    //2) GET WALLETID KEYS FOR OBTAINING IDENTITY
    //
    LocalForage.config({
      name: "dashmoney-platform-login",
    });
    let DashMoneyLF = LocalForage.createInstance({
      name: "dashmoney-platform-login",
    });

    DashMoneyLF.keys()
      .then((keys) => {
        this.setState({
          DashMoneyLFKeys: keys,
        });
        console.log(keys);
      })
      .catch(function (err) {
        console.log(err);
      });
    //****************************** */

    //NEED TO SET TESTNET OR MAINNET FOR THE DATA CONTRACTS HERE AND THEN CALL THE getRentals()
    //skipSynchronizationBeforeHeight <- ****
    //
    //WHAT ABOUT THE KEYS WELL THE WALLETS ARE DIFFERENT SO SHOULD NOT INTERFER..
    //
    //ALSO WHAT ABOUT GETTING THE OWNER NAME ? -> yes
    //  -> based on MerchantId ->

    //
    this.verifyNetworkAndSkipSync();
    //
  }

  verifyNetworkAndSkipSync = () => {
    // RUN CompDidMount

    //ALREADY SET IN COMPONENT PROPS
    // whichNetwork: import.meta.env.VITE_NETWORK,

    if (this.state.whichNetwork !== "mainnet") {
      this.setState(
        {
          whichNetwork: "testnet",
          // skipSynchronizationBeforeHeight:
          //   this.state.skipSynchronizationBeforeHeightTESTNET,
        },
        () => this.getRentals()
      );
    } else {
      this.getRentals();
    }
  };

  //ACCOUNT LOGIN FUNCTIONS => SIMPLE LOGIN FIRST
  triggerNameLoading = () => {
    this.setState({
      isLoadingName: true,
    });
  };

  triggerNameNotLoading = () => {
    this.setState({
      isLoadingName: false,
    });
  };

  //TRIGGER THE LOGIN PROCESS ->Simplest no LF setup <- CHANGING ->
  handleAccountLogin = (theMnemonic) => {
    if (this.state.DashMoneyLFKeys.length === 0) {
      this.setState(
        {
          isLoggedIn: true,
          mnemonic: theMnemonic,
        },
        () => this.getWalletAndIdentitywithMnem(theMnemonic)
      );
    } else {
      this.setState(
        {
          isLoggedIn: true,
          mnemonic: theMnemonic,
        },
        () => this.checkPlatformOnlyLogin(theMnemonic)
      );
    }
  };

  checkPlatformOnlyLogin = (theMnemonic) => {
    console.log("Called Check Platform Login");

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: theMnemonic,
        offlineMode: true,
      },
    };

    const client = new Dash.Client(clientOpts);

    const getWalletId = async () => {
      const account = await client.getWalletAccount();

      //console.log("walletIdToTry:", walletIdToTry);

      return account.walletId;
    };

    getWalletId()
      .then((walletIdToTry) => {
        let isKeyAvail = this.state.DashMoneyLFKeys.includes(walletIdToTry);
        // console.log(`DashMoneyLF Test -> ${isKeyAvail}`);

        if (isKeyAvail) {
          console.log("This here is a login skip!!");
          //************* */
          let DashMoneyLF = LocalForage.createInstance({
            name: "dashmoney-platform-login",
          });

          DashMoneyLF.getItem(walletIdToTry)
            .then((val) => {
              //  console.log("Value Retrieved", val);
              if (
                val !== null ||
                typeof val.identity !== "string" ||
                val.identity === "" ||
                val.name === "" ||
                typeof val.name !== "string"
              ) {
                // console.log(val.identity);
                this.setState(
                  {
                    platformLogin: true,
                    identity: val.identity,
                    uniqueName: val.name,
                    walletId: walletIdToTry,
                    isLoadingName: false,
                    isLoadingIdentity: false,
                  },
                  () => this.handlePlatformLoginSeq(val.identity, theMnemonic)
                );
              } else {
                console.log("platform login FROM LF failed");
                //JUST DO NORMAL FULL LOGIN
                //IF LF FAILS FOR SOME REASON JUST DOES NORMAL LOGIN
                this.setState(
                  {
                    platformLogin: false,
                    identity: "",
                    uniqueName: "",
                    walletId: walletIdToTry,
                  },
                  () => this.getWalletAndIdentitywithMnem(theMnemonic)
                );
              }
            })
            .catch((err) => {
              console.error(
                "Something went wrong getting from DashMoneyLF:\n",
                err
              );
            });
        } else {
          console.log("platform login FROM LF failed");
          //JUST DO NORMAL FULL LOGIN
          //FOR LOGIN WITH NEW MNEN BUT NOT IN LF
          this.setState(
            {
              platformLogin: false,
              walletId: walletIdToTry,
            },
            () => this.getWalletAndIdentitywithMnem(theMnemonic)
          );
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  handlePlatformLoginSeq = (theIdentity, theMnemonic) => {
    //
    this.getIdentityInfo(theIdentity);
    this.getWalletPlatformLogin(theMnemonic);
    //this.getAliasfromIdentity(theIdentity);
    //
  };

  handleAccountRetry = () => {
    this.setState(
      {
        isLoadingIdentity: true,
        isLoadingWallet: true,
      },
      () => this.getWalletAndIdentitywithMnem(this.state.mnemonic)
    );
  };

  // BELOW STANDARD LOGIN
  getWalletAndIdentitywithMnem = (theMnemonic) => {
    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        theMnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const retrieveIdentityIds = async () => {
      const account = await client.getWalletAccount();

      //console.log(account.getTotalBalance());
      // console.log(account.getUnusedAddress().address);
      //console.log(account.getTransactionHistory());

      this.setState({
        accountBalance: account.getTotalBalance(),
        accountAddress: account.getUnusedAddress().address,
        accountHistory: account.getTransactionHistory(),
        walletId: account.walletId,
      });

      return account.identities.getIdentityIds();
    };

    retrieveIdentityIds()
      .then((d) => {
        //  console.log("Mnemonic identities:\n", d);
        if (d.length === 0) {
          this.setState({
            isLoadingIdentity: false,
            isLoadingWallet: false,

            //These are not called so end loading
            isLoadingIdInfo: false,
            isLoadingName: false,

            identity: "no identity",
            //uniqueName: '', //Kicks out of platform login if identity is disabled but LF still retains.
          });
        } else {
          this.setState(
            {
              identity: d[0],
              isLoadingIdentity: false,
              isLoadingWallet: false,
              //maintain Loading bc continuing to other functions
            },
            () => this.conductFullLogin(d[0])
          );
        }
      })
      .catch((e) => {
        console.error(
          "Something went wrong getWalletAndIdentitywithMnem:\n",
          e
        );
        this.setState({
          identityError: true,
          isLoadingIdentity: false,
        });
      })
      .finally(() => client.disconnect());
  };
  conductFullLogin = (theIdentity) => {
    //THIS SHOULD CALL IDINFO, NAMES, AND ALIASES
    this.getIdentityInfo(theIdentity);
    this.getNamefromIdentity(theIdentity);
    // this.getAliasfromIdentity(theIdentity);
  }; //Many LF, mostRecent and other functions have not been incorporated yet

  // BELOW PLATFORM LOGIN - WALLET PART
  getWalletPlatformLogin = (theMnemonic) => {
    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        theMnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const retrieveIdentityIds = async () => {
      const account = await client.getWalletAccount();

      //console.log(account.getTotalBalance());
      // console.log(account.getUnusedAddress().address);
      //console.log(account.getTransactionHistory());

      this.setState({
        accountBalance: account.getTotalBalance(),
        accountAddress: account.getUnusedAddress().address,
        accountHistory: account.getTransactionHistory(),
        //walletId: account.walletId,
      });

      return account.identities.getIdentityIds();
    };

    retrieveIdentityIds()
      .then((d) => {
        //  console.log("Mnemonic identities:\n", d);
        //if (d.length === 0) {
        // NEED TO HANDLE IF RETURN IS EMPTY BUT I HAVE A KEY IN LF.
        // SHOULD I JUST NOT RETURN IDENTITY? OR
        // NEED ENTIRE NEW FUNCTION TO HANDLE CHANGING OF LF
        //   this.setState({
        //     isLoadingIdentity: false,
        //     isLoadingWallet: false,

        //     //These are not called so end loading
        //     isLoadingIdInfo: false,
        //     isLoadingName: false,

        //     identity: "no identity",
        //     uniqueName: "", //Kicks out of platform login if identity is disabled but LF still retains.
        //   });
        // }
        if (this.state.identity === d[0]) {
          //SHOULD IT NOT EVEN WORRY ABOUT THE IDENTITY?
          this.setState(
            {
              identity: d[0],
              isLoadingIdentity: false,
              isLoadingWallet: false,
            },
            () => this.LOGINCOMPLETEQueryTrigger(d[0])
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong getWalletPlatformLogin:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getIdentityInfo = (theIdentity) => {
    console.log("Called get identity info");

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const retrieveIdentity = async () => {
      return client.platform.identities.get(theIdentity); // Your identity ID
    };

    retrieveIdentity()
      .then((d) => {
        if (d !== null) {
          console.log("Identity retrieved:\n", d.toJSON());
          let idInfo = d.toJSON();
          this.setState({
            isLoadingIdInfo: false,
            identityInfo: idInfo,
            identityRaw: d,
          });
        } else {
          console.log("No Identity Info retrieved");
          //If I have an identity then there will be something but if there isn't an identity than this is not called? ->
        }
      })
      .catch((e) => {
        console.error(
          "Something went wrong in retrieving the identityinfo:\n",
          e
        );
        this.setState({
          isLoadingIdInfo: false,
          idInfoError: true, //NEED TO HANDLE SO CAN DISPLAY ->
        });
      })
      .finally(() => client.disconnect());
  };

  handleName = (nameToAdd) => {
    //From Name Purchase
    this.setState(
      {
        uniqueName: nameToAdd,
        isLoadingName: false,
      },
      () => this.LOGINCOMPLETEQueryTrigger(this.state.identity)
    );
    //
    //
    //ADDS IDENTITY/NAME TO LF AFTER PURCHASE OF NAME
    //  //******************** */
    let DashMoneyLF = LocalForage.createInstance({
      name: "dashmoney-platform-login",
    });
    let lfObject = {
      identity: this.state.identity,
      name: nameToAdd,
    };

    DashMoneyLF.setItem(this.state.walletId, lfObject)
      .then((d) => {
        //return DashMoneyLF.getItem(walletId);
        console.log("Return from LF setitem:", d);
      })
      .catch((err) => {
        console.error("Something went wrong setting to DashMoneyLF:\n", err);
      });
    // //******************** */
  };

  getNamefromIdentity = (theIdentity) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const retrieveNameByRecord = async () => {
      // Retrieve by a name's identity ID
      return client.platform.names.resolveByRecord(
        "identity",
        theIdentity // Your identity ID
      );
    };

    retrieveNameByRecord()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no Names.");
          this.setState({
            //Should catch the new name and aliases and stop spinner
            isLoadingName: false,
            uniqueName: "no name",
          });
        } else {
          let nameRetrieved = d[0].toJSON();
          //
          //  //******************** */
          //ADDS IDENTITY/NAME TO LF AFTER NORMAL LOGIN IF WALLETID IS NOT IN LF
          if (!this.state.platformLogin) {
            let DashMoneyLF = LocalForage.createInstance({
              name: "dashmoney-platform-login",
            });
            let lfObject = {
              identity: theIdentity,
              name: nameRetrieved.label,
            };

            DashMoneyLF.setItem(this.state.walletId, lfObject)
              .then((d) => {
                //return DashMoneyLF.getItem(walletId);
                //   console.log("Return from LF setitem:", d);
              })
              .catch((err) => {
                console.error(
                  "Something went wrong setting to DashMoneyLF:\n",
                  err
                );
              });
          }
          //******************** */
          console.log("Name retrieved:\n", nameRetrieved);
          this.setState(
            {
              uniqueName: nameRetrieved.label,
              isLoadingName: false,
            },
            () => this.LOGINCOMPLETEQueryTrigger(theIdentity)
          );
        }
      })
      .catch((e) => {
        this.setState({
          isLoadingName: false,
          nameError: true,
        });
        console.error("Something went wrong getting names:\n", e);
        // this.getAliasfromIdentity(theIdentity);
      })
      .finally(() => client.disconnect());
  };
  //
  //FROM HANDLENAME() AND  getNamefromIdentity() AND getWalletPlatformLogin()
  // SO  NEW ACCOUNT  AND  NEW LOGIN             AND LOCALFORAGE
  //
  LOGINCOMPLETEQueryTrigger = (theIdentity) => {
    if (theIdentity === this.state.MerchantId) {
      this.startMerchantRace();
    } else {
      this.getYourRsrvs(theIdentity);
    }

    //if(this.state.platformLogin){}
  };

  // ####  ####  WRITE ACTIONS BELOW  #### ####

  registerIdentity = () => {
    //REIMPLEMENT LFOBJ CREATE WHEN GET TO THAT POINT <-

    this.setState({
      isLoadingIdentity: true,
      isLoadingIdInfo: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const createIdentity = async () => {
      return client.platform.identities.register();
    };

    createIdentity()
      .then((d) => {
        console.log("Registered Identity:\n", d.toJSON());
        let idInfo = d.toJSON();
        this.setState({
          identity: idInfo.id,
          identityInfo: idInfo,
          identityRaw: d,
          uniqueName: "no name", //This sets up the next step
          isLoadingIdentity: false,
          isLoadingIdInfo: false,
          accountBalance: this.state.accountBalance - 1000000,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingIdentity: false,
          isLoadingIdInfo: false,
          identityError: true,
        });
      })
      .finally(() => client.disconnect());
  };

  doTopUpIdentity = (numOfCredits) => {
    this.setState({
      isLoadingIdInfo: true,
      identityInfo: "",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const topupIdentity = async () => {
      const identityId = this.state.identity; // Your identity ID
      const topUpAmount = numOfCredits; // Number of duffs ie 1000

      await client.platform.identities.topUp(identityId, topUpAmount);
      return client.platform.identities.get(identityId);
    };

    topupIdentity()
      .then((d) => {
        console.log("Identity credit balance: ", d.balance);
        //Just manually add the topup amount
        this.setState({
          identityInfo: d.toJSON(),
          identityRaw: d,
          isLoadingIdInfo: false,
          accountBalance: this.state.accountBalance - 1000000,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingIdInfo: false,
          //Add error state to handle identityInfo being set to '' or else will be stuck in loading state.. ->
        });
      })
      .finally(() => client.disconnect());
  };
  //Name and Alias purchase is done in the modal.

  //ACCOUNT LOGIN FUNCTIONS^^^

  /*
   *   ################
   *   ###          ####
   *   ################
   *   ###          ####
   *   ###           ####
   */
  //BELOW - this is Initial Rentals!

  handleSelectedDapp = (theDapp) => {
    this.setState({
      selectedDapp: theDapp,
      expandedTopNav: false,
    });
  };

  handleSelectedRental = (theRental) => {
    this.setState({
      selectedDapp: "Selected Rental",
      SelectedRental: theRental,
      expandedTopNav: false,
    });
  };

  handleRequestModal = (theStartDate, theEndDate) => {
    this.setState(
      {
        selectedArriveDate: theStartDate,
        selectedDepartureDate: theEndDate,
      },
      () => this.showModal("MakeRequestModal")
    );
  };

  //getCompDidMountRace = () => {}
  //DONT COMBINE Rentals and MerchantName, KEEP EACH SEPARATE SO CAN LOAD FASTER AND NOT DEPENDANT.

  getRentals = () => {
    //console.log("Calling getRentals");
    // if (!this.state.isLoadingRentals) {
    //   this.setState({ isLoadingRentals: true });
    // }

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get("RENTALSContract.rental", {
        where: [
          ["$ownerId", "==", this.state.MerchantId],
          ["$updatedAt", "<=", Date.now()],
        ],
        orderBy: [["$updatedAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no Rentals");

          this.setState({
            Rentals: [],
            isLoadingRentals: false,
          });
        } else {
          let docArray = [];
          //console.log("Getting Rentals");

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Rental:\n", returnedDoc);
            // returnedDoc.replyId = Identifier.from(
            //   returnedDoc.replyId,
            //   "base64"
            // ).toJSON();
            returnedDoc.imgArray = JSON.parse(returnedDoc.imgArray);
            //console.log("newRental:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          this.setState({
            Rentals: docArray,
            isLoadingRentals: false,
          });

          this.getMerchantName();
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);

        this.setState({
          Rentals: [],
          isLoadingRentals: false,
        });
        this.getMerchantName();
      })
      .finally(() => client.disconnect());
  };

  //BELOW - For adding the name of merchant to the Rental
  getMerchantName = () => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const retrieveNameByRecord = async () => {
      return client.platform.names.resolveByRecord(
        "identity",
        this.state.MerchantId
      );
    };

    retrieveNameByRecord()
      .then((d) => {
        if (d.length === 0) {
          console.log("There is no Name.");
          this.setState({
            isLoadingMerchantName: false,
          });
        } else {
          let nameRetrieved = d[0].toJSON();
          //console.log("Merchant Name retrieved:\n", nameRetrieved);
          this.setState({
            isLoadingMerchantName: false,
            MerchantNameDoc: nameRetrieved,
          });
        }
      })
      .catch((e) => {
        this.setState({
          isLoadingMerchantName: false,
        });
        console.error("Something went wrong getting merchant name:\n", e);
      })
      .finally(() => client.disconnect());
  };

  createRental = (rentalObject) => {
    console.log("Called Create Rental");

    this.setState({
      isLoadingRentals: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitRideDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }
      let rentalProperties;

      rentalProperties = rentalObject;

      //console.log('Rental to Create: ', rentalProperties);

      // Create the document
      const rentalDocument = await platform.documents.create(
        "RENTALSContract.rental",
        identity,
        rentalProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return rentalDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [rentalDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return rentalDocument;
    };

    submitRideDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        //console.log("Document:\n", returnedDoc);

        // returnedDoc.replyId = Identifier.from(
        //   returnedDoc.replyId,
        //   "base64"
        // ).toJSON();
        returnedDoc.imgArray = JSON.parse(returnedDoc.imgArray);

        let rental = returnedDoc;
        console.log("Document:\n", returnedDoc);

        // let ride = {
        //   $ownerId: returnedDoc.$ownerId,
        //   $id: returnedDoc.$id,
        //   //$createdAt: returnedDoc.$createdAt,
        //   $updatedAt: returnedDoc.$updatedAt,
        // };

        this.setState({
          Rentals: [rental, ...this.state.Rentals],
          isLoadingRentals: false,
        });
      })
      .catch((e) => {
        console.error("Something went wrong with rental creation:\n", e);
        // this.setState({
        //   rentalError: true,
        //   isLoadingRentals: false,
        // });
      })
      .finally(() => client.disconnect());
  };

  //CONVERT TO RENTAL ->
  editRental = (rideObject) => {
    //  console.log("Called Edit Ride");
    this.setState({
      isLoadingRentals: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitPostDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "RADContract.rideReq",
        {
          where: [
            [
              "$id",
              "==",
              this.state.YourRides[this.state.selectedYourRideIndex].$id,
            ],
          ],
        }
      );

      if (
        this.state.YourRides[this.state.selectedYourRideIndex].area !==
        rideObject.area
      ) {
        document.set("area", rideObject.area);
      }
      if (
        this.state.YourRides[this.state.selectedYourRideIndex].city !==
        rideObject.city
      ) {
        document.set("city", rideObject.city);
      }
      if (
        this.state.YourRides[this.state.selectedYourRideIndex].region !==
        rideObject.region
      ) {
        document.set("region", rideObject.region);
      }

      if (
        this.state.YourRides[this.state.selectedYourRideIndex].pickupAddr !==
        rideObject.pickupAddr
      ) {
        document.set("pickupAddr", rideObject.pickupAddr);
      }
      if (
        this.state.YourRides[this.state.selectedYourRideIndex].dropoffAddr !==
        rideObject.dropoffAddr
      ) {
        document.set("dropoffAddr", rideObject.dropoffAddr);
      }

      if (
        this.state.YourRides[this.state.selectedYourRideIndex].reqTime !==
        rideObject.reqTime
      ) {
        document.set("reqTime", rideObject.reqTime);
      }
      if (
        this.state.YourRides[this.state.selectedYourRideIndex].numOfRiders !==
        rideObject.numOfRiders
      ) {
        document.set("numOfRiders", rideObject.numOfRiders);
      }

      if (
        this.state.YourRides[this.state.selectedYourRideIndex].extraInstr !==
        rideObject.extraInstr
      ) {
        document.set("extraInstr", rideObject.extraInstr);
      }

      if (
        this.state.YourRides[this.state.selectedYourRideIndex].pmtType !==
        rideObject.pmtType
      ) {
        document.set("pmtType", rideObject.pmtType);
      }

      if (
        this.state.YourRides[this.state.selectedYourRideIndex].timeEst !==
        rideObject.timeEst
      ) {
        document.set("timeEst", rideObject.timeEst);
      }

      if (
        this.state.YourRides[this.state.selectedYourRideIndex].distEst !==
        rideObject.distEst
      ) {
        document.set("distEst", rideObject.distEst);
      }

      if (
        this.state.YourRides[this.state.selectedYourRideIndex].amt !==
        rideObject.amt
      ) {
        document.set("amt", rideObject.amt);
      }
      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submitPostDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Edited Ride Doc:\n", returnedDoc);

        returnedDoc.replyId = Identifier.from(
          returnedDoc.replyId,
          "base64"
        ).toJSON();

        let editedRides = this.state.YourRides;

        editedRides.splice(this.state.selectedYourRideIndex, 1, returnedDoc);

        this.setState(
          {
            YourRides: editedRides,
            isLoadingYourRides: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with YourRide Edit:\n", e);
        this.setState({
          isLoadingYourRides: false,
        });
      })
      .finally(() => client.disconnect());
  };

  //CONVERT TO RENTAL ->
  deleteYourRide = () => {
    console.log("Called Delete Ride");

    this.setState({
      isLoadingYourRides: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const deleteRideDocument = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const documentId = this.state.selectedYourRide.$id;

      // Retrieve the existing document

      //JUST PUT IN THE DOCUMENT THAT i ALREADY HAVE... => Done
      // Wrong ^^^ Can not use because changed to JSON

      const [document] = await client.platform.documents.get(
        "RADContract.rideReq",
        { where: [["$id", "==", documentId]] }
      );

      // Sign and submit the document delete transition
      await platform.documents.broadcast({ delete: [document] }, identity);
      return document;
    };

    deleteRideDocument()
      .then((d) => {
        console.log("Document deleted:\n", d.toJSON());

        let editedRides = this.state.YourRides;

        editedRides.splice(this.state.selectedYourRideIndex, 1);

        this.setState({
          YourRides: editedRides,
          isLoadingYourRides: false,
        });
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  /*
  * RENTALS FUNCTIONS^^^^
   
   *     ###     ###
   *    ## ##    ####
   *   ###  ##  ##  ##
   *  ###    ####    ##
   * ###      ###     ##
   *
   */
  //This needs a race query! Requests, Confirms and replies

  // pullInitialTriggerMERCHANT = () => {
  //   this.startMerchantRace();
  //   //THIS IS FOR WHEN YOU LOGIN AND GET Merchant Queries
  //   this.setState({
  //     InitialPullMerchant: false,
  //   });
  // };

  //SETTIMEOUT WAY BELOW
  allowMerchantRequestsRefresh = () => {
    this.setState({
      isMerchantRequestsRefreshReady: true,
    });
  };
  //FUNCTION FOR BUTTON TO TRIGGER - CHANGES STATE AND GOES AND LOOKS UP AND SETS STATE DIRECTLY.
  refreshMerchantRequests = () => {
    this.setState({
      isLoadingRequests: true,
      isMerchantRequestsRefreshReady: false,
    });

    this.startMerchantRace();
    //REFRESH -> TIMEOUT
    //if (!this.state.isMerchantRequestsRefreshReady) {
    const MerchantRequestsTimeout = setTimeout(
      this.allowMerchantRequestsRefresh,
      15000
    );
    // }
    //REFRESH -> TIMEOUT
  };

  //SETTIMEOUT WAY ^^^^

  handleMerchantRequestFilter = (theSelected) => {
    this.setState({
      DisplayRequests: theSelected,
    });
  };

  startMerchantRace = () => {
    if (!this.state.isLoadingRequests) {
      this.setState({ isLoadingRequests: true });
    }
    if (this.state.Rentals.length !== 0) {
      this.getConfirms();
      this.getRequests();
    } else {
      this.setState({
        Merchant1: false,
        Merchant2: false,

        isLoadingRequests: false,
      });
    }
  };

  merchantRace = () => {
    if (this.state.Merchant1 && this.state.Merchant2) {
      this.setState({
        Merchant1: false,
        Merchant2: false,

        isLoadingRequests: false,
      });
    }
  };

  getRequests = () => {
    //console.log("Calling getRequests");

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    let arrayOfRentalIds = this.state.Rentals.map((doc) => {
      return doc.$id;
    });

    const getDocuments = async () => {
      return client.platform.documents.get("RENTALSContract.request", {
        where: [
          // ["$ownerId", "==", theIdentity],
          ["rentalId", "in", arrayOfRentalIds],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [
          ["rentalId", "asc"],
          ["$createdAt", "desc"],
        ],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no YourRsrvs");

          this.setState(
            {
              Merchant1: true,
              RentalRequests: [],
            },
            () => this.merchantRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting YourRsrvs");

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Requests:\n", returnedDoc);
            returnedDoc.rentalId = Identifier.from(
              returnedDoc.rentalId,
              "base64"
            ).toJSON();
            //  console.log("newRequest:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getRequestsNames(docArray);
          // this.setState(
          //   {
          //     Merchant1: true,
          //     RentalRequests: docArray,

          //   },
          //   () => this.merchantRace()
          // );
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getRequestsNames = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    //console.log("Calling getNamesforDrives");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNSContract.domain", {
        where: [["records.identity", "in", arrayOfOwnerIds]],
        orderBy: [["records.identity", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        // if (d.length === 0) {
        //console.log("No DPNS domain documents retrieved.");
        // }
        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());
          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);
        this.setState(
          {
            Merchant1: true,
            RentalRequests: docArray,
            RentalRequestsNames: nameDocArray,
          },
          () => this.merchantRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting Requests Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getConfirms = () => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    let arrayOfRentalIds = this.state.Rentals.map((doc) => {
      return doc.$id;
    });

    const getDocuments = async () => {
      //console.log("Called Get Req Replies");

      return client.platform.documents.get("RENTALSContract.confirm", {
        where: [
          ["$ownerId", "==", this.state.MerchantId],
          ["rentalId", "in", arrayOfRentalIds],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [
          ["rentalId", "asc"],
          ["$createdAt", "desc"],
        ],
      });
    };

    getDocuments()
      .then((d) => {
        //console.log("Getting YourRsrvsConfirms");
        if (d.length === 0) {
          //console.log("There are no YourRsrvsConfirms");

          this.setState(
            {
              RentalConfirms: [],
              RentalReplies: [],
              Merchant2: true,
            },
            () => this.merchantRace()
          );
        } else {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Confirm:\n", returnedDoc);
            returnedDoc.reqId = Identifier.from(
              returnedDoc.reqId,
              "base64"
            ).toJSON();
            returnedDoc.rentalId = Identifier.from(
              returnedDoc.rentalId,
              "base64"
            ).toJSON();
            // console.log("newConfirm:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }

          this.getConfirmReplies(docArray);
        }
      })
      .catch((e) => {
        console.error("Something went wrong Confirms:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getConfirmReplies = (theConfirms) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    // This Below is to get unique set of Confirm doc ids
    let arrayOfConfirmIds = theConfirms.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of Confirm Req ids", arrayOfConfirmIds);

    let setOfConfirmIds = [...new Set(arrayOfConfirmIds)];

    arrayOfConfirmIds = [...setOfConfirmIds];

    //console.log("Array of Confirm ids", arrayOfConfirmIds);

    const getDocuments = async () => {
      //console.log("Called Get Merchant Replies");

      return client.platform.documents.get("RENTALSContract.reply", {
        where: [
          ["confirmId", "in", arrayOfConfirmIds],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [
          ["confirmId", "asc"],
          ["$createdAt", "desc"],
        ],
      });
    };

    getDocuments()
      .then((d) => {
        //console.log("Getting Confirm replies");
        if (d.length === 0) {
          //console.log("There are no ConfirmReplies");

          this.setState(
            {
              RentalConfirms: theConfirms,
              RentalReplies: [],
              Merchant2: true,
            },
            () => this.merchantRace()
          );
        } else {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Reply:\n", returnedDoc);
            returnedDoc.confirmId = Identifier.from(
              returnedDoc.confirmId,
              "base64"
            ).toJSON();
            //console.log("newReply:\n", returnedDoc);
            docArray = [returnedDoc, ...docArray];
          }

          this.setState(
            {
              RentalConfirms: theConfirms,
              RentalReplies: docArray,
              Merchant2: true,
            },
            () => this.merchantRace()
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong Merchant Replies:\n", e);
      })
      .finally(() => client.disconnect());
  };

  handleConfirmRequestModal = (theRequest) => {
    //HAVE TO DETERMINE THE RENTAL of request ->
    let requestRental = this.state.Rentals.find((rental) => {
      return rental.$id === theRequest.rentalId;
    });

    this.setState(
      {
        selectedRequest: theRequest,
        SelectedRental: requestRental,
      },
      () => this.showModal("ConfirmRequestModal")
    );
  };

  handleBlockConfirmModal = (theStartDate, theEndDate) => {
    this.setState(
      {
        selectedArriveDate: theStartDate, //This should be in ms
        selectedDepartureDate: theEndDate, //This should be in ms
      },
      () => this.showModal("BlockConfirmModal")
    );
  };

  createConfirmRequest = () => {
    // console.log("Called Create Confirm Request");

    this.setState({
      isLoadingRequests: true,
      isLoadingRentals: true,
      selectedDapp: "Rentals",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitReviewDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const confirmProperties = {
        arriveDate: this.state.selectedRequest.arriveDate,
        departDate: this.state.selectedRequest.departDate,
        rentalId: this.state.SelectedRental.$id,
        reqId: this.state.selectedRequest.$id,
        //toId
        amt: this.state.selectedRequest.amt,
        // pmtObj
      };
      //console.log(' Create: ', confirmProperties);

      // Create the note document
      const rentalDocument = await platform.documents.create(
        "RENTALSContract.confirm",
        identity,
        confirmProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return rentalDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [rentalDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return rentalDocument;
    };

    submitReviewDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.rentalId = Identifier.from(
          returnedDoc.rentalId,
          "base64"
        ).toJSON();

        returnedDoc.reqId = Identifier.from(
          returnedDoc.reqId,
          "base64"
        ).toJSON();

        console.log("Request Confirm:\n", returnedDoc);

        this.setState(
          {
            RentalConfirms: [returnedDoc, ...this.state.RentalConfirms],

            isLoadingRequests: false,
            isLoadingRentals: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with Block Confirm creation:\n", e);
      })
      .finally(() => client.disconnect());
  };

  createBlockConfirm = () => {
    // console.log("Called Create Block Confirm");

    this.setState({
      isLoadingRequests: true,
      isLoadingRentals: true,
      selectedDapp: "Rentals",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitReviewDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const confirmProperties = {
        arriveDate: this.state.selectedArriveDate, //This should be in ms
        departDate: this.state.selectedDepartureDate, //This should be in ms
        rentalId: this.state.SelectedRental.$id,
        reqId: this.state.SelectedRental.$id, //Because blocking confirm
        //toId
        amt: 0,
        // pmtObj
      };
      //console.log(' Create: ', confirmProperties);

      // Create the note document
      const rentalDocument = await platform.documents.create(
        "RENTALSContract.confirm",
        identity,
        confirmProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return rentalDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [rentalDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return rentalDocument;
    };

    submitReviewDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.rentalId = Identifier.from(
          returnedDoc.rentalId,
          "base64"
        ).toJSON();

        returnedDoc.reqId = Identifier.from(
          returnedDoc.reqId,
          "base64"
        ).toJSON();

        console.log("Document:\n", returnedDoc);

        this.setState(
          {
            RentalConfirms: [returnedDoc, ...this.state.RentalConfirms],
            isLoadingRequests: false,
            isLoadingRentals: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with Block Confirm creation:\n", e);
      })
      .finally(() => client.disconnect());
  };

  handleMerchantReplyModalShow = (theConfirm, nameDoc) => {
    this.setState(
      {
        selectedConfirm: theConfirm,
        selectedReplyNameDoc: nameDoc,
      },
      () => this.showModal("MerchantReplyModal")
    );
  };

  //confirmId createdAt - query
  // confirmId && msg - attributes

  createMerchantReply = (replyMsgComment) => {
    //console.log("Called Merchant Message Submit: ", replyMsgComment);

    this.setState({
      isLoadingRequests: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitMsgDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const replyProperties = {
        confirmId: this.state.selectedConfirm.$id,
        msg: replyMsgComment,
      };
      //console.log('Reply to Create: ', replyProperties);

      // Create the note document
      const rentalDocument = await platform.documents.create(
        "RENTALSContract.reply",
        identity,
        replyProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return rentalDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [rentalDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return rentalDocument;
    };

    submitMsgDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        returnedDoc.confirmId = Identifier.from(
          returnedDoc.confirmId,
          "base64"
        ).toJSON();

        this.setState(
          {
            RentalReplies: [...this.state.RentalReplies, returnedDoc],
            isLoadingRequests: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong with Merchant Reply Msg creation:\n",
          e
        );
      })
      .finally(() => client.disconnect());
  };

  /*
   * MERCHANT FUNCTIONS^^^^
   *                                 ###     ###
   *                                ## ##    ####
   *                               ###  ##  ##  ##
   *                              ###    ####    ##
   *                             ###      ###     ##
   *
   *
   *
   *      #############
   *     ####         ##
   *     ###
   *     ###
   *     #####        ##
   *      #############
   */
  //CUSTOMER FUNCTIONS

  handleMakeRequestModal = (theStartDate, theEndDate) => {
    this.setState(
      {
        selectedArriveDate: theStartDate, //This should be in ms
        selectedDepartureDate: theEndDate, //This should be in ms
      },
      () => this.showModal("MakeRequestModal")
    );
  };

  //createRequest
  createRequest = () => {
    console.log("Called Create Request");
    this.hideModal();

    this.setState({
      isLoadingRequests: true,
      isLoadingRentals: true,
      selectedDapp: "Rentals",
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitReviewDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const requestProperties = {
        arriveDate: this.state.selectedArriveDate, //This should be in ms
        departDate: this.state.selectedDepartureDate, //This should be in ms
        rentalId: this.state.SelectedRental.$id,
        amt: Number(
          (
            this.state.SelectedRental.rate *
            (
              (this.state.selectedDepartureDate -
                this.state.selectedArriveDate) /
              86400000
            ).toFixed(0)
          ).toFixed(0)
        ),

        //toId
        //txId
        //txObj
        //msg
      };
      //console.log(' Create: ', requestProperties);

      // Create the note document
      const rentalDocument = await platform.documents.create(
        "RENTALSContract.request",
        identity,
        requestProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return rentalDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [rentalDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return rentalDocument;
    };

    submitReviewDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();

        returnedDoc.rentalId = Identifier.from(
          returnedDoc.rentalId,
          "base64"
        ).toJSON();

        console.log("Document:\n", returnedDoc);

        this.setState(
          {
            RentalRequests: [returnedDoc, ...this.state.RentalRequests],
            isLoadingRequests: false,
            isLoadingRentals: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with Request creation:\n", e);
      })
      .finally(() => client.disconnect());
  };

  // pullInitialTriggerCUSTOMER = () => {
  //   this.getYourRsrvs(this.state.identity);
  //   //THIS IS FOR WHEN YOU LOGIN AND GET YOUR DRIVES
  //   this.setState({
  //     InitialPullCustomer: false,
  //   });
  // };

  // pullOnPageLoadTriggerDRIVERS = () => {
  //   //THIS IS FOR WHEN YOU SELECT THE DAPP, IT LOADS MOST RECENT RIDES POSTED
  //   if (this.state.OnPageLoadDRIVERS) {
  //     this.getInitialDrives();
  //     this.setState({
  //       OnPageLoadDRIVERS: false,
  //     });
  //   }
  // };

  getYourRsrvs = (theIdentity) => {
    //console.log("Calling getYourRsrvs");
    if (!this.state.isLoadingRequests) {
      this.setState({ isLoadingRequests: true });
    }

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    let arrayOfRentalIds = this.state.Rentals.map((doc) => {
      return doc.$id;
    });

    const getDocuments = async () => {
      return client.platform.documents.get("RENTALSContract.request", {
        where: [
          ["$ownerId", "==", theIdentity],
          ["rentalId", "in", arrayOfRentalIds],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [
          ["rentalId", "asc"],
          ["$createdAt", "desc"],
        ],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no merchant Requests");
          this.setState({
            RentalRequests: [],
            RentalConfirms: [],
            RentalReplies: [],
            isLoadingRequests: false,
          });
        } else {
          let docArray = [];
          //console.log("Getting merchant Requests");

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Requests:\n", returnedDoc);
            returnedDoc.rentalId = Identifier.from(
              returnedDoc.rentalId,
              "base64"
            ).toJSON();
            // console.log("newRequest:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getYourRsrvsConfirms(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getYourRsrvsConfirms = (theDocArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    // This Below is to get unique set of Req doc ids
    let arrayOfReqIds = theDocArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of Req Req ids", arrayOfReqIds);

    let setOfReqIds = [...new Set(arrayOfReqIds)];

    arrayOfReqIds = [...setOfReqIds];

    //console.log("Array of Req ids", arrayOfReqIds);

    const getDocuments = async () => {
      //console.log("Called Get Req Replies");

      return client.platform.documents.get("RENTALSContract.confirm", {
        where: [["reqId", "in", arrayOfReqIds]], // check reqId ->
        orderBy: [["reqId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        //console.log("Getting YourRsrvsConfirms");
        if (d.length === 0) {
          //console.log("There are no YourRsrvsConfirms");

          this.setState({
            RentalRequests: theDocArray,
            RentalConfirms: [],
            RentalReplies: [],
            isLoadingRequests: false,
          });
        } else {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Confirm:\n", returnedDoc);
            returnedDoc.reqId = Identifier.from(
              returnedDoc.reqId,
              "base64"
            ).toJSON();
            returnedDoc.rentalId = Identifier.from(
              returnedDoc.rentalId,
              "base64"
            ).toJSON();
            console.log("newConfirm:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getYourRsrvsReplies(docArray, theDocArray);
        }
      })
      .catch((e) => {
        console.error("Something went wrong YourRsrvsConfirms:\n", e);
      })
      .finally(() => client.disconnect());
  };

  getYourRsrvsReplies = (theConfirms, theRequests) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    // This Below is to get unique set of Confirm doc ids
    let arrayOfConfirmIds = theConfirms.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of Confirm Req ids", arrayOfConfirmIds);

    let setOfConfirmIds = [...new Set(arrayOfConfirmIds)];

    arrayOfConfirmIds = [...setOfConfirmIds];

    //console.log("Array of Confirm ids", arrayOfConfirmIds);

    const getDocuments = async () => {
      //console.log("Called Get Confirm Replies");

      return client.platform.documents.get("RENTALSContract.reply", {
        where: [
          ["confirmId", "in", arrayOfConfirmIds],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [
          ["confirmId", "asc"],
          ["$createdAt", "desc"],
        ],
      });
    };

    getDocuments()
      .then((d) => {
        //console.log("Getting YourRsrvsReplies");
        if (d.length === 0) {
          //console.log("There are no YourRsrvsReplies");
          this.setState({
            RentalRequests: theRequests,
            RentalConfirms: theConfirms,
            RentalReplies: [],
            isLoadingRequests: false,
          });
        } else {
          let docArray = [];

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Reply:\n", returnedDoc);
            returnedDoc.confirmId = Identifier.from(
              returnedDoc.confirmId,
              "base64"
            ).toJSON();
            //console.log("newReply:\n", returnedDoc);
            //docArray = [...docArray, returnedDoc];
            docArray = [returnedDoc, ...docArray];
          }

          this.setState({
            RentalRequests: theRequests,
            RentalConfirms: theConfirms,
            RentalReplies: docArray,
            isLoadingRequests: false,
          });
        }
      })
      .catch((e) => {
        console.error("Something went wrong Customer Replies:\n", e);
      })
      .finally(() => client.disconnect());
  };

  //SETTIMEOUT WAY BELOW

  allowYourRsrvsRefresh = () => {
    this.setState({
      isYourRsrvsRefreshReady: true,
    });
  };
  //FUNCTION FOR BUTTON TO TRIGGER - CHANGES STATE AND GOES AND LOOKS UP AND SETS STATE DIRECTLY.
  refreshYourRsrvs = () => {
    this.setState({
      isLoadingRequests: true,
      isYourRsrvsRefreshReady: false, // pass to refresh button
    });

    this.getYourRsrvs(this.state.identity);
    //

    //REFRESH -> TIMEOUT
    //if (!this.state.isYourRsrvsRefreshReady) {
    const yourRsrvsTimeout = setTimeout(this.allowYourRsrvsRefresh, 15000);
    // }
    //REFRESH -> TIMEOUT
  };

  handleCustomerReplyModalShow = (theConfirm) => {
    this.setState(
      {
        selectedConfirm: theConfirm,
      },
      () => this.showModal("CustomerReplyModal")
    );
  };

  //confirmId createdAt - query
  // confirmId && msg - attributes

  createCustomerReply = (replyMsgComment) => {
    //console.log("Called Customer Message Submit: ", replyMsgComment);

    this.setState({
      isLoadingRequests: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitMsgDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const replyProperties = {
        confirmId: this.state.selectedConfirm.$id,
        msg: replyMsgComment,
      };
      //console.log('Reply to Create: ', replyProperties);

      // Create the note document
      const rentalDocument = await platform.documents.create(
        "RENTALSContract.reply",
        identity,
        replyProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return rentalDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [rentalDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return rentalDocument;
    };

    submitMsgDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        returnedDoc.confirmId = Identifier.from(
          returnedDoc.confirmId,
          "base64"
        ).toJSON();

        this.setState(
          {
            RentalReplies: [...this.state.RentalReplies, returnedDoc],
            isLoadingRequests: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong with Customer Reply Msg creation:\n",
          e
        );
      })
      .finally(() => client.disconnect());
  };

  /*
   *CUSTOMER FUNCTIONS^^^^
   *                                 #############
   *                                ####         ##
   *                                ###
   *                                ###
   *                                #####        ##
   *                                 #############
   *
   *
   *      ################
   *      ###          ####
   *      ################
   *      ###          ####
   *      ###           ####
   *
   */
  //REVIEWS FUNCTIONS
  handleEditReview = (review, index) => {
    this.setState(
      {
        reviewToEdit: review,
        reviewToEditIndex: index,
      },
      () => this.showModal("EditReviewModal")
    );
  };

  //PUT THE QUERY SEARCHES HERE
  //WHEN TO PULL? ->
  startSearch_REVIEW = (theRentals) => {
    //Called from  ->
    this.getSearchReviews(theRentals);
  };

  searchReviewsRace = () => {
    if (this.state.SearchReviews1 && this.state.SearchReviews2) {
      this.setState({
        SearchReviews1: false,
        SearchReviews2: false,
        //DONT HAVE TO ADD STATE TO PUSH TO DISPLAY BECAUSE THE REVIEWS AND NAMES PUSHED TOGETHER AND THEN THREADS APPEAR <- SO DO I WANT TO QUERY NAME FIRST THEN?
        isLoadingReviewsSearch: false,
      });
    }
  };

  getSearchReviews = (theIdentity) => {
    //console.log("Calling getSearchReviews");

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get("DGRContract.dgrreview", {
        where: [
          ["toId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no SearchReviews");

          this.setState(
            {
              SearchReviews1: true,
              SearchReviews2: true,
              SearchedReviews: [],
            },
            () => this.searchReviewsRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting Search Reviews");

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Review:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newReview:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getSearchReviewNames(docArray);
          this.getSearchReplies(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getSearchReviewNames = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    // Start of Setting Unique reviews
    let arrayOfReviews = arrayOfOwnerIds.map((id) => {
      return docArray.find((doc) => id === doc.$ownerId);
    });
    // End of Setting Unique reviews

    // arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
    //   Buffer.from(Identifier.from(item))
    // );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNSContract.domain", {
        where: [["records.identity", "in", arrayOfOwnerIds]],
        orderBy: [["records.identity", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            SearchedReviewNames: nameDocArray,
            SearchedReviews: arrayOfReviews, //This is a unique set of reviews only single review per reviewer
            SearchReviews1: true,
          },
          () => this.searchReviewsRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting Search Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getSearchReplies = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    // This Below is to get unique set of ByYou review doc ids
    let arrayOfReviewIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of ByYouThreads ids", arrayOfReviewIds);

    let setOfReviewIds = [...new Set(arrayOfReviewIds)];

    arrayOfReviewIds = [...setOfReviewIds];

    //console.log("Array of order ids", arrayOfReviewIds);

    const getDocuments = async () => {
      //console.log("Called Get Search Replies");

      return client.platform.documents.get("DGRContract.dgrreply", {
        where: [["reviewId", "in", arrayOfReviewIds]], // check reviewId ->
        orderBy: [["reviewId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.reviewId = Identifier.from(
            returnedDoc.reviewId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        this.setState(
          {
            SearchReviews2: true,
            SearchedReplies: docArray,
          },
          () => this.searchReviewsRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong Search Replies:\n", e);
      })
      .finally(() => client.disconnect());
  };

  pullInitialTriggerREVIEWS = () => {
    this.getYourReviews(this.state.identity);
    this.setState({
      InitialPullReviews: false,
    });
  };

  yourReviewsRace = () => {
    if (this.state.YourReviews1 && this.state.YourReviews2) {
      this.setState({
        YourReviews1: false,
        YourReviews2: false,

        isLoadingYourReviews: false,
      });
    }
  };

  getYourReviews = (theIdentity) => {
    //console.log("Calling getYourReviews");

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const getDocuments = async () => {
      return client.platform.documents.get("DGRContract.dgrreview", {
        where: [
          ["toId", "==", theIdentity],
          ["$createdAt", "<=", Date.now()],
        ],
        orderBy: [["$createdAt", "desc"]],
      });
    };

    getDocuments()
      .then((d) => {
        if (d.length === 0) {
          //console.log("There are no YourReviews");

          this.setState(
            {
              YourReviews1: true,
              YourReviews2: true,
            },
            () => this.yourReviewsRace()
          );
        } else {
          let docArray = [];
          //console.log("Getting YourReviews Reviews");

          for (const n of d) {
            let returnedDoc = n.toJSON();
            //console.log("Review:\n", returnedDoc);
            returnedDoc.toId = Identifier.from(
              returnedDoc.toId,
              "base64"
            ).toJSON();
            //console.log("newReview:\n", returnedDoc);
            docArray = [...docArray, returnedDoc];
          }
          this.getYourReviewNames(docArray);
          this.getYourReplies(docArray);
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getYourReviewNames = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));
    //START OF NAME RETRIEVAL

    let ownerarrayOfOwnerIds = docArray.map((doc) => {
      return doc.$ownerId;
    });

    let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

    let arrayOfOwnerIds = [...setOfOwnerIds];

    // arrayOfOwnerIds = arrayOfOwnerIds.map((item) =>
    //   Buffer.from(Identifier.from(item))
    // );

    //console.log("Calling getNamesforDSOmsgs");

    const getNameDocuments = async () => {
      return client.platform.documents.get("DPNSContract.domain", {
        where: [["records.identity", "in", arrayOfOwnerIds]],
        orderBy: [["records.identity", "asc"]],
      });
    };

    getNameDocuments()
      .then((d) => {
        //WHAT IF THERE ARE NO NAMES? -> THEN THIS WON'T BE CALLED
        if (d.length === 0) {
          //console.log("No DPNS domain documents retrieved.");
        }

        let nameDocArray = [];

        for (const n of d) {
          //console.log("NameDoc:\n", n.toJSON());

          nameDocArray = [n.toJSON(), ...nameDocArray];
        }
        //console.log(`DPNS Name Docs: ${nameDocArray}`);

        this.setState(
          {
            YourReviewNames: nameDocArray,
            YourReviews: docArray,
            YourReviews1: true,
          },
          () => this.yourReviewsRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong getting YourReview Names:\n", e);
      })
      .finally(() => client.disconnect());
    //END OF NAME RETRIEVAL
  };

  getYourReplies = (docArray) => {
    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    // This Below is to get unique set of ByYou review doc ids
    let arrayOfReviewIds = docArray.map((doc) => {
      return doc.$id;
    });

    //console.log("Array of ByYouThreads ids", arrayOfReviewIds);

    let setOfReviewIds = [...new Set(arrayOfReviewIds)];

    arrayOfReviewIds = [...setOfReviewIds];

    //console.log("Array of order ids", arrayOfReviewIds);

    const getDocuments = async () => {
      //console.log("Called Get Search Replies");

      return client.platform.documents.get("DGRContract.dgrreply", {
        where: [["reviewId", "in", arrayOfReviewIds]], // check reviewId ->
        orderBy: [["reviewId", "asc"]],
      });
    };

    getDocuments()
      .then((d) => {
        let docArray = [];

        for (const n of d) {
          let returnedDoc = n.toJSON();
          //console.log("Thr:\n", returnedDoc);
          returnedDoc.reviewId = Identifier.from(
            returnedDoc.reviewId,
            "base64"
          ).toJSON();
          //console.log("newThr:\n", returnedDoc);
          docArray = [...docArray, returnedDoc];
        }

        this.setState(
          {
            YourReviews2: true,
            YourReplies: docArray,
          },
          () => this.yourReviewsRace()
        );
      })
      .catch((e) => {
        console.error("Something went wrong Search Replies:\n", e);
      })
      .finally(() => client.disconnect());
  };

  handleYourReply = (reviewDoc, revieweeLabel) => {
    //First search and see if there is already a reply for the review
    let replyDoc = this.state.YourReplies.find((doc) => {
      return doc.reviewId === reviewDoc.$id;
    });

    if (replyDoc !== undefined) {
      this.setState(
        {
          replyReview: reviewDoc,
          replyToEdit: replyDoc,
          replyingToName: revieweeLabel,
        },
        () => this.showModal("EditReplyModal")
      );
    } else {
      this.setState(
        {
          replyReview: reviewDoc,
          replyToEdit: [],
          replyingToName: revieweeLabel,
        },
        () => this.showModal("CreateReplyModal")
      );
    }
  };

  createReview = (reviewObject) => {
    console.log("Called Create Review");

    this.setState({
      isLoadingReviewsSearch: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitReviewDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const reviewProperties = {
        toId: this.state.SearchedNameDoc.$ownerId,
        review: reviewObject.review,
        rating: reviewObject.rating,
      };
      //console.log('Review to Create: ', reviewProperties);

      // Create the note document
      const dgrDocument = await platform.documents.create(
        "DGRContract.dgrreview",
        identity,
        reviewProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      // return dgrDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [dgrDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return dgrDocument;
    };

    submitReviewDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        let review = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,

          review: reviewObject.review,
          rating: reviewObject.rating,

          $createdAt: returnedDoc.$createdAt,
        };

        this.setState(
          {
            SearchedReviews: [review, ...this.state.SearchedReviews],
            isLoadingReviewsSearch: false,
          },
          () => this.sendFrontendFee()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with review creation:\n", e);
      })
      .finally(() => client.disconnect());

    //THIS BELOW IS THE NAME DOC ADD, SO PROCESSES DURING DOC SUBMISSION ***
    let nameDoc = {
      $ownerId: this.state.identity,
      label: this.state.uniqueName,
    };

    this.setState({
      SearchedReviewNames: [nameDoc, ...this.state.SearchedReviewNames],
    });
    //END OF NAME DOC ADD***
  };

  editReview = (reviewObject) => {
    console.log("Called Edit Review");

    this.setState({
      isLoadingReviewsSearch: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitReviewDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "DGRContract.dgrreview",
        {
          where: [["$id", "==", this.state.reviewToEdit.$id]],
        }
      );

      if (this.state.reviewToEdit.review !== reviewObject.review) {
        document.set("review", reviewObject.review);
      }

      if (this.state.reviewToEdit.rating !== reviewObject.rating) {
        document.set("review", reviewObject.rating);
      }

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submitReviewDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Edited Review Doc:\n", returnedDoc);

        let review = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,

          review: reviewObject.review,
          rating: reviewObject.rating,

          $createdAt: returnedDoc.$createdAt,
          $updatedAt: returnedDoc.$updatedAt,
        };

        let editedReviews = this.state.SearchedReviews;

        editedReviews.splice(this.state.reviewToEditIndex, 1, review);

        this.setState(
          {
            SearchedReviews: editedReviews,
            isLoadingReviewsSearch: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with review edit:\n", e);
      })
      .finally(() => client.disconnect());
  };

  createReply = (replyObject) => {
    console.log("Called Create Reply");

    this.setState({
      isLoadingYourReviews: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitReviewDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const replyProperties = {
        reviewId: this.state.replyReview.$id,
        reply: replyObject.reply,
      };
      //console.log('Reply to Create: ', replyProperties);

      // Create the note document
      const dgrDocument = await platform.documents.create(
        "DGRContract.dgrreply",
        identity,
        replyProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      // return dgrDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [dgrDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return dgrDocument;
    };

    submitReviewDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        let reply = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          $createdAt: returnedDoc.$createdAt,

          reviewId: this.state.replyReview.$id,
          reply: replyObject.reply,
        };

        this.setState(
          {
            YourReplies: [reply, ...this.state.YourReplies],
            isLoadingYourReviews: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with reply creation:\n", e);
      })
      .finally(() => client.disconnect());
  };

  editReply = (replyObject) => {
    console.log("Called Edit Reply");

    this.setState({
      isLoadingYourReviews: true,
    });

    const client = new Dash.Client(
      dapiClient(
        this.state.whichNetwork,
        this.state.mnemonic,
        this.state.skipSynchronizationBeforeHeight
      )
    );

    const submitReplyDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const [document] = await client.platform.documents.get(
        "DGRContract.dgrreply",
        {
          where: [["$id", "==", this.state.replyToEdit.$id]],
        }
      );

      if (this.state.replyToEdit.reply !== replyObject.reply) {
        document.set("reply", replyObject.reply);
      }

      await platform.documents.broadcast({ replace: [document] }, identity);
      return document;

      //############################################################
      //This below disconnects the document editing..***

      //return document;

      //This is to disconnect the Document editing***
      //############################################################
    };

    submitReplyDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Edited Reply Doc:\n", returnedDoc);

        let editedReply = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          $updatedAt: returnedDoc.$updatedAt,
          $createdAt: returnedDoc.$createdAt,

          reviewId: this.state.replyReview.$id,
          reply: replyObject.reply,
        };

        let indexOfReply = this.state.YourReplies.findIndex((reply) => {
          return reply.$id === editedReply.$id;
        });

        let editedReplies = this.state.YourReplies;

        editedReplies.splice(indexOfReply, 1, editedReply);

        this.setState(
          {
            YourReplies: editedReplies,
            isLoadingYourReviews: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error("Something went wrong with reply creation:\n", e);
      })
      .finally(() => client.disconnect());
  };

  /*
  *REVIEWS FUNCTIONS^^^^
  
   * 
   *      ################
   *      ###          ####
   *      ################
   *      ###          ####
   *      ###           ####
   *
   */

  loadIdentityCredits = () => {
    console.log("Called loadIdentityCredits");

    this.setState({
      identityInfo: "",
    });

    const client = new Dash.Client(dapiClientNoWallet(this.state.whichNetwork));

    const retrieveIdentity = async () => {
      return client.platform.identities.get(this.state.identity); // Your identity ID
    };

    retrieveIdentity()
      .then((d) => {
        //console.log("Identity retrieved:\n", d.toJSON());

        this.setState({
          identityInfo: d.toJSON(),
          identityRaw: d,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  };

  render() {
    this.state.mode === "primary"
      ? (document.body.style.backgroundColor = "rgb(280,280,280)")
      : (document.body.style.backgroundColor = "rgb(20,20,20)");

    this.state.mode === "primary"
      ? (document.body.style.color = "black")
      : (document.body.style.color = "white");

    let isLoginComplete =
      //CHANGE TO IDENTITY -> NO, stay with names
      //this.state.identityInfo !== "" && this.state.identity !== "no identity";
      this.state.uniqueName !== "" && this.state.uniqueName !== "no name";

    let loggedInAs = "customer"; // 'merchant'

    if (
      import.meta.env.VITE_MERCHANT_IDENTITY === this.state.identity &&
      isLoginComplete
    ) {
      // if (true) {
      loggedInAs = "merchant";
    }

    return (
      <>
        <TopNav
          handleMode={this.handleMode}
          mode={this.state.mode}
          loggedInAs={loggedInAs}
          showModal={this.showModal}
          whichNetwork={this.state.whichNetwork}
          isLoggedIn={this.state.isLoggedIn}
          toggleTopNav={this.toggleTopNav}
          expandedTopNav={this.state.expandedTopNav}
          selectedDapp={this.state.selectedDapp}
          handleSelectedDapp={this.handleSelectedDapp}
          uniqueName={this.state.uniqueName}
          identity={this.state.identity}
          identityInfo={this.state.identityInfo}
        />
        <Image fluid="true" id="dash-bkgd" src={DashBkgd} alt="Dash Logo" />
        <Container className="g-0">
          <Row className="justify-content-md-center">
            <Col md={9} lg={8} xl={7} xxl={6}>
              {/* {this.state.selectedDapp === "Login" && showWhyMoney ? (
                <>
                  <WhyMoney handleSelectedDapp={this.handleSelectedDapp} />
                </>
              ) : (
                <></>
              )} */}
              {this.state.selectedDapp === "Login" ? ( // && !showWhyMoney
                <>
                  {!this.state.isLoggedIn ? (
                    <>
                      <LoginForm
                        handleAccountLogin={this.handleAccountLogin}
                        DashMoneyLFKeys={this.state.DashMoneyLFKeys}
                        showModal={this.showModal}
                        mode={this.state.mode}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {this.state.isLoggedIn ? ( //&&!this.state.isIdentityControlShowing
                    <>
                      <AccountLogin
                        isLoginComplete={isLoginComplete}
                        mnemonic={this.state.mnemonic}
                        handleAccountRetry={this.handleAccountRetry}
                        showModal={this.showModal}
                        toggleTopNav={this.toggleTopNav}
                        handleSelectedDapp={this.handleSelectedDapp}
                        isLoadingIdentity={this.state.isLoadingIdentity}
                        isLoadingIdInfo={this.state.isLoadingIdInfo}
                        isLoadingName={this.state.isLoadingName}
                        isLoadingWallet={this.state.isLoadingWallet}
                        identity={this.state.identity}
                        identityRaw={this.state.identityRaw}
                        identityInfo={this.state.identityInfo}
                        uniqueName={this.state.uniqueName}
                        accountBalance={this.state.accountBalance}
                        mode={this.state.mode}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
              {loggedInAs === "merchant" ? (
                <>
                  {this.state.selectedDapp === "Rentals" ? (
                    <>
                      <YourRentalsPage
                        isLoadingRentals={this.state.isLoadingRentals}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        uniqueName={this.state.uniqueName}
                        mode={this.state.mode}
                        handleSelectedDapp={this.handleSelectedDapp}
                        handleSelectedRental={this.handleSelectedRental}
                        Rentals={this.state.Rentals}
                        showModal={this.showModal}
                        isLoadingWallet={this.state.isLoadingWallet}
                        accountBalance={this.state.accountBalance}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {this.state.selectedDapp === "Requests" ? (
                    <>
                      <RequestsPage
                        isLoginComplete={isLoginComplete}
                        isLoadingRentals={this.state.isLoadingRentals}
                        isLoadingRequests={this.state.isLoadingRequests}
                        isMerchantRequestsRefreshReady={
                          this.state.isMerchantRequestsRefreshReady
                        }
                        refreshMerchantRequests={this.refreshMerchantRequests}
                        Rentals={this.state.Rentals}
                        RentalRequests={this.state.RentalRequests}
                        RentalConfirms={this.state.RentalConfirms}
                        RentalRequestsNames={this.state.RentalRequestsNames}
                        RentalReplies={this.state.RentalReplies}
                        handleSelectedRental={this.handleSelectedRental}
                        handleConfirmRequestModal={
                          this.handleConfirmRequestModal
                        }
                        handleMerchantReplyModalShow={
                          this.handleMerchantReplyModalShow
                        }
                        handleMerchantRequestFilter={
                          this.handleMerchantRequestFilter
                        }
                        //
                        // pullInitialTriggerMERCHANT={
                        //   this.pullInitialTriggerMERCHANT
                        // }
                        // InitialPullMerchant={this.state.InitialPullMerchant}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        uniqueName={this.state.uniqueName}
                        MerchantNameDoc={this.state.MerchantNameDoc}
                        DisplayRequests={this.state.DisplayRequests}
                        //
                        mode={this.state.mode}
                        showModal={this.showModal}
                        isLoadingWallet={this.state.isLoadingWallet}
                        accountBalance={this.state.accountBalance}
                        //
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  {this.state.selectedDapp === "Create Rental" ? (
                    <>
                      <CreateRental
                        isLoadingRentals={this.state.isLoadingRentals}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        uniqueName={this.state.uniqueName}
                        mode={this.state.mode}
                        accountBalance={this.state.accountBalance}
                        isLoadingWallet={this.state.isLoadingWallet}
                        createRental={this.createRental}
                        handleSelectedDapp={this.handleSelectedDapp}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {this.state.selectedDapp === "Selected Rental" ? (
                    <>
                      {/* DONT HANDLE THE LOGIN SEPARATED PARTS HERE DO THAT IN THE COMPONENT AND PASS THE **ISLOGINCOMPLETE** THROUGH PROPS */}
                      <YourSelectedRental
                        isLoginComplete={isLoginComplete}
                        // could use ^^^ for allowing to schedule request
                        isLoadingRentals={this.state.isLoadingRentals}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        uniqueName={this.state.uniqueName}
                        mode={this.state.mode}
                        //
                        rental={this.state.SelectedRental}
                        RentalRequests={this.state.RentalRequests}
                        //
                        MerchantId={this.state.MerchantId}
                        DataContractRENTALS={this.state.DataContractRENTALS}
                        whichNetwork={this.state.whichNetwork}
                        //
                        handleBlockConfirmModal={this.handleBlockConfirmModal}
                        //
                        handleSelectedDapp={this.handleSelectedDapp}
                        //  this ^^^ send to rsrvs if have any
                        showModal={this.showModal}
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  {/* {this.state.selectedDapp === "Edit Rental" ? (
                    <>
                      <EditRental
                        isLoadingRentals={this.state.isLoadingRentals}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        uniqueName={this.state.uniqueName}
                        mode={this.state.mode}
                        accountBalance={this.state.accountBalance}
                        isLoadingWallet={this.state.isLoadingWallet}
                        editRental={this.editRental}
                        handleSelectedDapp={this.handleSelectedDapp}
                      />
                    </>
                  ) : (
                    <></>
                  )} */}
                </>
              ) : (
                <></>
              )}

              {loggedInAs === "customer" ? (
                <>
                  {this.state.selectedDapp === "Rentals" ? (
                    <>
                      {/* DONT HANDLE THE LOGIN SEPARATED PARTS HERE DO THAT IN THE COMPONENT AND PASS THE **ISLOGINCOMPLETE** THROUGH PROPS */}
                      <RentalsPage
                        isLoginComplete={isLoginComplete}
                        isLoadingRentals={this.state.isLoadingRentals}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        //handleSelectedDapp={this.handleSelectedDapp}

                        handleSelectedRental={this.handleSelectedRental}
                        uniqueName={this.state.uniqueName}
                        mode={this.state.mode}
                        Rentals={this.state.Rentals}
                        showModal={this.showModal}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {this.state.selectedDapp === "Selected Rental" ? (
                    <>
                      {/* DONT HANDLE THE LOGIN SEPARATED PARTS HERE DO THAT IN THE COMPONENT AND PASS THE **ISLOGINCOMPLETE** THROUGH PROPS */}
                      <SelectedRentalPage
                        isLoginComplete={isLoginComplete}
                        // could use ^^^ for allowing to schedule request
                        isLoadingRentals={this.state.isLoadingRentals}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        uniqueName={this.state.uniqueName}
                        mode={this.state.mode}
                        //
                        rental={this.state.SelectedRental}
                        RentalRequests={this.state.RentalRequests}
                        //
                        MerchantId={this.state.MerchantId}
                        MerchantNameDoc={this.state.MerchantNameDoc}
                        DataContractRENTALS={this.state.DataContractRENTALS}
                        whichNetwork={this.state.whichNetwork}
                        //
                        handleMakeRequestModal={this.handleMakeRequestModal}
                        //
                        handleSelectedDapp={this.handleSelectedDapp}
                        //  this ^^^ send to rsrvs if have any
                        showModal={this.showModal}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {this.state.selectedDapp === "Requests" ? (
                    <>
                      <YourRsrvsPage
                        isLoginComplete={isLoginComplete}
                        // pullInitialTriggerCUSTOMER={
                        //   this.pullInitialTriggerCUSTOMER
                        // }
                        // InitialPullCustomer={this.state.InitialPullCustomer}
                        isLoadingRentals={this.state.isLoadingRentals}
                        isLoadingRequests={this.state.isLoadingRequests}
                        isYourRsrvsRefreshReady={
                          this.state.isYourRsrvsRefreshReady
                        }
                        refreshYourRsrvs={this.refreshYourRsrvs}
                        Rentals={this.state.Rentals}
                        RentalRequests={this.state.RentalRequests}
                        RentalConfirms={this.state.RentalConfirms}
                        RentalReplies={this.state.RentalReplies}
                        //
                        handleSelectedRental={this.handleSelectedRental}
                        handleCustomerReplyModalShow={
                          this.handleCustomerReplyModalShow
                        }
                        //
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        MerchantNameDoc={this.state.MerchantNameDoc}
                        uniqueName={this.state.uniqueName}
                        //
                        mode={this.state.mode}
                        showModal={this.showModal}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Container>
        {/* #####    BELOW ARE THE MODALS    #####    */}
        {this.state.isModalShowing &&
        this.state.presentModal === "LogoutModal" ? (
          <LogoutModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            handleLogout={this.handleLogout}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "CreateNewWalletModal" ? (
          <CreateNewWalletModal
            isModalShowing={this.state.isModalShowing}
            whichNetwork={this.state.whichNetwork}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "SendFundsModal" ? (
          <SendFundsModal
            isModalShowing={this.state.isModalShowing}
            accountAddress={this.state.accountAddress}
            whichNetwork={this.state.whichNetwork}
            hideModal={this.hideModal}
            mode={this.state.mode}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "FrontEndExplaination" ? (
          <FrontEndExplaination
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            showModal={this.state.showModal}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterIdentityModal" ? (
          <RegisterIdentityModal
            isModalShowing={this.state.isModalShowing}
            registerIdentity={this.registerIdentity}
            hideModal={this.hideModal}
            mode={this.state.mode}
            skipSynchronizationBeforeHeight={
              this.state.skipSynchronizationBeforeHeight
            }
            whichNetwork={this.state.whichNetwork}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
        {this.state.isModalShowing &&
        this.state.presentModal === "TopUpIdentityModal" ? (
          <TopUpIdentityModal
            accountBalance={this.state.accountBalance}
            isLoadingWallet={this.state.isLoadingWallet}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            doTopUpIdentity={this.doTopUpIdentity}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterNameModal" ? (
          <RegisterNameModal
            triggerNameLoading={this.triggerNameLoading}
            triggerNameNotLoading={this.triggerNameNotLoading}
            handleName={this.handleName}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            identity={this.state.identity}
            identityRaw={this.state.identityRaw}
            mnemonic={this.state.mnemonic}
            whichNetwork={this.state.whichNetwork}
            skipSynchronizationBeforeHeight={
              this.state.skipSynchronizationBeforeHeight
            }
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "MakeRequestModal" ? (
          <MakeRequestModal
            DataContractRENTALS={this.state.DataContractRENTALS}
            whichNetwork={this.state.whichNetwork}
            MerchantId={this.state.MerchantId}
            MerchantNameDoc={this.state.MerchantNameDoc}
            SelectedRental={this.state.SelectedRental}
            StartDate={this.state.selectedArriveDate}
            EndDate={this.state.selectedDepartureDate}
            createRequest={this.createRequest}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "ConfirmRequestModal" ? (
          <ConfirmRequestModal
            DataContractRENTALS={this.state.DataContractRENTALS}
            whichNetwork={this.state.whichNetwork}
            MerchantId={this.state.MerchantId}
            SelectedRental={this.state.SelectedRental}
            request={this.state.selectedRequest}
            createConfirmRequest={this.createConfirmRequest}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "BlockConfirmModal" ? (
          <BlockConfirmModal
            DataContractRENTALS={this.state.DataContractRENTALS}
            whichNetwork={this.state.whichNetwork}
            MerchantId={this.state.MerchantId}
            SelectedRental={this.state.SelectedRental}
            StartDate={this.state.selectedArriveDate}
            EndDate={this.state.selectedDepartureDate}
            createBlockConfirm={this.createBlockConfirm}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "CustomerReplyModal" ? (
          <CustomerReplyModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            MerchantNameDoc={this.state.MerchantNameDoc}
            //selectedRequest
            selectedConfirm={this.state.selectedConfirm}
            createCustomerReply={this.createCustomerReply}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "MerchantReplyModal" ? (
          <MerchantReplyModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            selectedConfirm={this.state.selectedConfirm}
            selectedReplyNameDoc={this.state.selectedReplyNameDoc}
            createMerchantReply={this.createMerchantReply}
            closeTopNav={this.closeTopNav}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default App;
