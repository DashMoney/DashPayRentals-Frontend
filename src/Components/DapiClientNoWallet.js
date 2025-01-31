export default function dapiClientNoWallet(theNetwork) {
  return {
    network: theNetwork,
    dapiAddresses: [
      //"35.165.50.126:1443",
      "52.10.229.11:1443",
      "54.149.33.167:1443",
      "52.24.124.162:1443",
      "54.187.14.232:1443",
    ],
    apps: {
      DPNSContract: {
        contractId: "GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec",
      },
      RENTALSContract: {
        contractId: "Czf3vDBKQZu8zNNsqTqVjxp2FoZEuhVfELULjkGV3S2B", //"HjHocG4oyLHgpnRMJEGagaTyrx6HaboCiGdcBzY3RKPU",
      },
      ProxyContract: {
        contractId: "7Y342Md8nmw5qFBwBCmpnrbqV9ELhgUfRdNpiLjYkzLD",
      },
    },
  };
}

//dapiClientNoWallet(this.state.whichNetwork)
//dapiClientNoWallet(this.props.whichNetwork)
