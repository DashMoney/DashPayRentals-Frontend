export default function dapiClientNoWallet(theNetwork) {
  return {
    network: theNetwork,

    apps: {
      DPNSContract: {
        contractId: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
      },
      RENTALSContract: {
        contractId: "HjHocG4oyLHgpnRMJEGagaTyrx6HaboCiGdcBzY3RKPU",
      },
    },
  };
}

//dapiClientNoWallet(this.state.whichNetwork)
//dapiClientNoWallet(this.props.whichNetwork)
