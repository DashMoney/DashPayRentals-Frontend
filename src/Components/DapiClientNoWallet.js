export default function dapiClientNoWallet(theNetwork) {
  return {
    network: theNetwork,

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

//dapiClientNoWallet(this.state.whichNetwork)
//dapiClientNoWallet(this.props.whichNetwork)
