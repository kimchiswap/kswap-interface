# KSWAP Interface


An open source interface for KSWAP -- a protocol for decentralized exchange of Ethereum tokens.

- Website: [kimchiswap.io](https://kimchiswap.io/)
- Interface: [app.kimchiswap.io](https://app.kimchiswap.io)
- Docs: [home.kimchiswap.io/docs/](https://home.kimchiswap.io/docs/)
- Reddit: [/r/kSWAP](https://www.reddit.com/r/KSWAP/)
- Email: [admin@kimchiswap.io](mailto:admin@kimchiswap.io)

## Accessing the KSWAP Interface

To access the KSWAP Interface, use an IPFS gateway link from the
[latest release](https://github.com/Kimchiswap/kswap-interface/releases/latest), 
or visit [app.kimchiswap.io](https://app.kimchiswap.io).

## Listing a token

Please see the
[@kswap/default-token-list](https://github.com/kimchiswap/default-token-list) 
repository.

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` 

Note that the interface only works on testnets where both 
[KSWAP V1](https://home.kimchiswap.io/docs/v1/smart-contracts/factory/) and 
[multicall](https://github.com/makerdao/multicall) are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `master` branch.** 
CI checks will run against all PRs.

## Accessing KSWAP Interface 

The KSWAP Interface supports swapping against, and migrating or removing liquidity from KSWAP . However,
if you would like to use KSWAP, the KSWAP interface for mainnet and testnets is accessible via IPFS gateways 
linked from the [v1.0.0 release](https://github.com/kimchiswap/kswap-interface/releases/tag/v1.0.0).
