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

import TopUpIdentityModal from "./Components/TopUpIdentityModal";
import FrontEndExplaination from "./Components/FrontEndExplaination";

import CreateNewWalletModal from "./Components/0-LoginPage/CreateNewWalletModal";
import RegisterIdentityModal from "./Components/0-LoginPage/RegisterIdentityModal";

import RegisterNameModal from "./Components/0-LoginPage/RegisterNameModal";
import WalletTXModal from "./Components/WalletTXModal";

import SendFundsModal from "./Components/0-LoginPage/SendFundsModal";
import LogoutModal from "./Components/0-LoginPage/LogoutModal";

import Dash from "dash";

const {
  Essentials: { Buffer },
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

      isLoadingRentals: true,
      isLoadingRequests: true,

      SelectedRental: "", // should be the rental document

      selectedRequest: "",

      selectedArriveDate: "",
      selectedDepartureDate: "",

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
      //Merchant Name??
      DataContractDPNS: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
      DataContractRENTALS: "6ortNLV5hTThxBh2AxiRktXq1SyQsZusTq9PPGQK7FRS",
      //DataContractTESTNETRENTALS: "6ortNLV5hTThxBh2AxiRktXq1SyQsZusTq9PPGQK7FRS",

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
    //
    //WHAT ABOUT THE KEYS WELL THE WALLETS ARE DIFFERENT SO SHOULD NOT INTERFER..
    //
    //ALSO WHAT ABOUT GETTING THE OWNER NAME ? -> yeah
    //  -> based on MerchantId ->

    //
    this.getRentals();
    //
  }

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
  //
  // BELOW STANDARD LOGIN
  getWalletAndIdentitywithMnem = (theMnemonic) => {
    //gOT FROM DGM
    const client = new Dash.Client({
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: theMnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    });

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
  //
  //
  // BELOW PLATFORM LOGIN - WALLET PART
  getWalletPlatformLogin = (theMnemonic) => {
    const client = new Dash.Client({
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: theMnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    });

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

    const client = new Dash.Client({
      network: this.state.whichNetwork,
    });

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
    const client = new Dash.Client({ network: this.state.whichNetwork });

    const retrieveNameByRecord = async () => {
      // Retrieve by a name's identity ID
      return client.platform.names.resolveByRecord(
        "dashUniqueIdentityId",
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

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    };

    const client = new Dash.Client(clientOpts);

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

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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

  getRentals = () => {
    //console.log("Calling getRentals");
    // if (!this.state.isLoadingRentals) {
    //   this.setState({ isLoadingRentals: true });
    // }

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        RENTALSContract: {
          contractId: this.state.DataContractRENTALS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);

        this.setState({
          Rentals: [],
          isLoadingRentals: false,
        });
      })
      .finally(() => client.disconnect());
  };

  createRental = (rentalObject) => {
    console.log("Called Create Rental");

    this.setState({
      isLoadingRentals: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        RENTALSContract: {
          contractId: this.state.DataContractRENTALS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        RADContract: {
          contractId: this.state.DataContractRAD,
        },
      },
    };

    const client = new Dash.Client(clientOpts);

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

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        RADContract: {
          contractId: this.state.DataContractRAD,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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
   *                                         ################
   *                                         ###          ####
   *                                         ################
   *                                         ###          ####
   *                                         ###           ####
   
   
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

  startMerchantRace = () => {
    if (!this.state.isLoadingRequests) {
      this.setState({ isLoadingRequests: true });
    }
    this.getConfirms();
    this.getRequests();
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

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        RENTALSContract: {
          contractId: this.state.DataContractRENTALS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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
          //this.getYourRsrvsConfirms(docArray);
          this.setState(
            {
              Merchant1: true,
              RentalRequests: docArray,
              //Merchant2: true,
            },
            () => this.merchantRace()
          );
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  getConfirms = () => {
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        RENTALSContract: {
          contractId: this.state.DataContractRENTALS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        RENTALSContract: {
          contractId: this.state.DataContractRENTALS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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
            docArray = [...docArray, returnedDoc];
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

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        RENTALSContract: {
          contractId: this.state.DataContractRENTALS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        RENTALSContract: {
          contractId: this.state.DataContractRENTALS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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

  //createReply
  createRentalReply = (replyMsgComment) => {
    //console.log("Called Your Drive Message Submit: ", replyMsgComment);

    this.setState({
      isLoadingYourDrives: true,
    });

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        RADContract: {
          contractId: this.state.DataContractRAD,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const submitMsgDoc = async () => {
      const { platform } = client;

      let identity = "";
      if (this.state.identityRaw !== "") {
        identity = this.state.identityRaw;
      } else {
        identity = await platform.identities.get(this.state.identity);
      }

      const replyProperties = {
        amt: 0,
        //toId
        reqId: this.state.selectedYourDrive.$id,
        msg: replyMsgComment,
      };
      //console.log('Reply to Create: ', replyProperties);

      // Create the note document
      const radDocument = await platform.documents.create(
        "RADContract.rideReply",
        identity,
        replyProperties
      );

      //############################################################
      //This below disconnects the document sending..***

      //return radDocument;

      //This is to disconnect the Document Creation***
      //############################################################

      const documentBatch = {
        create: [radDocument], // Document(s) to create
      };

      await platform.documents.broadcast(documentBatch, identity);
      return radDocument;
    };

    submitMsgDoc()
      .then((d) => {
        let returnedDoc = d.toJSON();
        console.log("Document:\n", returnedDoc);

        // returnedDoc.reqId = Identifier.from(
        //   returnedDoc.reqId,
        //   "base64"
        // ).toJSON();

        let rideReply = {
          $ownerId: returnedDoc.$ownerId,
          $id: returnedDoc.$id,
          $createdAt: returnedDoc.$createdAt,
          amt: 0,
          //toId
          reqId: returnedDoc.reqId,
          msg: replyMsgComment,
        };

        this.setState(
          {
            //YourDrives: [rideReply, ...this.state.YourDrives],
            YourDrivesRequestsReplies: [
              rideReply,
              ...this.state.YourDrivesRequestsReplies,
            ],
            isLoadingYourDrives: false,
          },
          () => this.loadIdentityCredits()
        );
      })
      .catch((e) => {
        console.error(
          "Something went wrong with Your Drive Reply Msg creation:\n",
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

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
      apps: {
        RENTALSContract: {
          contractId: this.state.DataContractRENTALS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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

    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        RENTALSContract: {
          contractId: this.state.DataContractRENTALS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        RENTALSContract: {
          contractId: this.state.DataContractRENTALS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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
    const clientOpts = {
      network: this.state.whichNetwork,
      apps: {
        RENTALSContract: {
          contractId: this.state.DataContractRENTALS,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

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
            docArray = [...docArray, returnedDoc];
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
  //
  //BELOW - should not need.
  // getYourRsrvsRepliesNames = (docArray, theDocArray) => {
  //   const clientOpts = {
  //     network: this.state.whichNetwork,
  //     apps: {
  //       DPNS: {
  //         contractId: this.state.DataContractDPNS,
  //       },
  //     },
  //   };
  //   const client = new Dash.Client(clientOpts);
  //   //START OF NAME RETRIEVAL

  //   let ownerarrayOfOwnerIds = docArray.map((doc) => {
  //     return doc.$ownerId;
  //   });

  //   let setOfOwnerIds = [...new Set(ownerarrayOfOwnerIds)];

  //   let arrayOfOwnerIds = [...setOfOwnerIds];

  //   //console.log("Calling getNamesforRideReplies");

  //   const getNameDocuments = async () => {
  //     return client.platform.documents.get("DPNS.domain", {
  //       where: [["records.dashUniqueIdentityId", "in", arrayOfOwnerIds]],
  //       orderBy: [["records.dashUniqueIdentityId", "asc"]],
  //     });
  //   };

  //   getNameDocuments()
  //     .then((d) => {
  //       if (d.length === 0) {
  //         //console.log("No DPNS domain documents retrieved.");
  //       }

  //       let nameDocArray = [];

  //       for (const n of d) {
  //         //console.log("NameDoc:\n", n.toJSON());
  //         nameDocArray = [n.toJSON(), ...nameDocArray];
  //       }
  //       //console.log(`DPNS Name Docs: ${nameDocArray}`);

  //       // this.setState({
  //       //   YourRides: theDocArray,
  //       //   YourRideReplies: docArray,
  //       //   YourRideReplyNames: nameDocArray,
  //       //   isLoadingYourRides: false,
  //       // });

  //       this.getYourRideRepliesDGMAddresses(
  //         theDocArray,
  //         docArray,
  //         nameDocArray
  //       );
  //     })
  //     .catch((e) => {
  //       console.error(
  //         "Something went wrong getting YourRideReplies Names:\n",
  //         e
  //       );
  //     })
  //     .finally(() => client.disconnect());
  //   //END OF NAME RETRIEVAL
  // };

  //SETTIMEOUT WAY BELOW
  //FUNCTION TO CHANGE STATE AND ALLOW BUTTON TO BE PRESSED

  allowYourRsrvsRefresh = () => {
    this.setState({
      isYourRsrvsRefreshReady: true,
    });
  };

  // //FUNCTION FOR BUTTON TO TRIGGER - CHANGES STATE AND GOES AND LOOKS UP AND SETS STATE DIRECTLY.
  // //update below

  refreshYourRsrvs = () => {
    this.setState({
      isLoadingRequests: true,
      isYourRsrvsRefreshReady: false, // pass to refresh button
    });

    this.getYourRsrvs(this.state.identity);

    //REFRESH -> TIMEOUT
    //if (!this.state.isYourRsrvsRefreshReady) {
    const yourRsrvsTimeout = setTimeout(this.allowYourRsrvsRefresh, 15000);
    // }
    //REFRESH -> TIMEOUT
  };

  //SETTIMEOUT WAY ^^^^

  /*
  *CUSTOMER FUNCTIONS^^^^
   *                             #############
   *                            ####         ##
   *                            ###
   *                            ###     
   *                            #####        ##
   *                             #############
  
   */

  loadIdentityCredits = () => {
    console.log("Called loadIdentityCredits");

    this.setState({
      identityInfo: "",
    });

    const client = new Dash.Client({ network: this.state.whichNetwork });

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
                        Rentals={this.state.Rentals}
                        RentalRequests={this.state.RentalRequests}
                        RentalConfirms={this.state.RentalConfirms}
                        handleSelectedRental={this.handleSelectedRental}
                        handleConfirmRequestModal={
                          this.handleConfirmRequestModal
                        }
                        //
                        // pullInitialTriggerMERCHANT={
                        //   this.pullInitialTriggerMERCHANT
                        // }
                        // InitialPullMerchant={this.state.InitialPullMerchant}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        uniqueName={this.state.uniqueName}
                        mode={this.state.mode}
                        showModal={this.showModal}
                        isLoadingWallet={this.state.isLoadingWallet}
                        accountBalance={this.state.accountBalance}
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
                        Rentals={this.state.Rentals}
                        RentalRequests={this.state.RentalRequests}
                        RentalConfirms={this.state.RentalConfirms}
                        handleSelectedRental={this.handleSelectedRental}
                        identity={this.state.identity}
                        identityInfo={this.state.identityInfo}
                        uniqueName={this.state.uniqueName}
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

        {/* THIS ^^^^ WAS THE MY STORE ONE */}
        {this.state.isModalShowing &&
        this.state.presentModal === "WalletTXModal" ? (
          <WalletTXModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            accountHistory={this.state.accountHistory}
            accountBalance={this.state.accountBalance}
            WALLET_addresses={this.state.WALLET_addresses}
            WALLET_addressesNames={this.state.WALLET_addressesNames}
            ByYouMsgs={this.state.WALLET_ByYouMsgs}
            ByYouNames={this.state.WALLET_ByYouNames}
            ToYouMsgs={this.state.WALLET_ToYouMsgs}
            ToYouNames={this.state.WALLET_ToYouNames}
            //My Store
            LoadingOrders={this.state.isLoadingOrdersYOURSTORE}
            DGPOrders={this.state.DGPOrders}
            DGPOrdersNames={this.state.DGPOrdersNames}
            //My Store^^
            isLoadingAddresses_WALLET={this.state.isLoadingAddresses_WALLET}
            isLoadingMsgs={this.state.isLoadingMsgs_WALLET}
            //MyStore and Shopping use TXId to connect name to Tx but does the address pull already accomplish this for shopping <= yes
            //Shopping
            /*
              isLoadingRecentOrders: true,
              recentOrders: [],
              recentOrdersStores: [],
              recentOrdersNames: [],
              recentOrdersDGMAddresses: [],
              recentOrdersItems: [],
              recentOrdersMessages: [],
             */
            //Shopping^^
            //sortedTuples={sortedTuples} // <= this is made in the WalletTXModal -> yes
            // So this should only be gotten too after wallet and msgs are loaded.. ->
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
      </>
    );
  }
}

export default App;
