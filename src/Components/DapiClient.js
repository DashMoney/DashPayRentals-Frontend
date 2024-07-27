import LocalForage from "localforage";

export default function dapiClient(
  theNetwork,
  theMnemonic,
  theSkipSynchronizationBeforeHeight
) {
  return {
    network: theNetwork,
    wallet: {
      mnemonic: theMnemonic,
      adapter: LocalForage.createInstance,
      unsafeOptions: {
        skipSynchronizationBeforeHeight: theSkipSynchronizationBeforeHeight,
      },
    },
    apps: {
      DPNSContract: {
        contractId: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
      },
      RENTALSContract: {
        contractId: "5mxuMjDW9FBFysnyoX31jAo1QpvvBFRhrJcHNTeYM1Zx",
      },
    },
  };
}

/*
dapiClient(
  this.state.whichNetwork,
  this.state.mnemonic,
  this.state.skipSynchronizationBeforeHeight
)
  dapiClient(
  this.props.whichNetwork,
  this.props.mnemonic,
  this.props.skipSynchronizationBeforeHeight
)
  */

//DataContractDPNSTESTNET: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
//DataContractRENTALSTESTNET: "6ortNLV5hTThxBh2AxiRktXq1SyQsZusTq9PPGQK7FRS",
//DataContractREVIEWSTESTNET: "",
