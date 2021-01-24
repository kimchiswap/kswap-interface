import { Interface } from '@ethersproject/abi'
import { ChainId } from '@kimchiswap/sdk'
import V_EXCHANGE_ABI from './v_exchange.json'
import V_FACTORY_ABI from './v_factory.json'

const V_FACTORY_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xDf05e63b8Cc480787179c700132450105Ca62AAF',
  [ChainId.ROPSTEN]: '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351',
  [ChainId.RINKEBY]: '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36',
  [ChainId.GÖRLI]: '0x6Ce570d02D73d4c384b46135E87f8C592A8c86dA',
  [ChainId.KOVAN]: '0xD3E51Ef092B2845f10401a0159B2B96e8B6c3D30'
}

const V_FACTORY_INTERFACE = new Interface(V_FACTORY_ABI)
const V_EXCHANGE_INTERFACE = new Interface(V_EXCHANGE_ABI)

export { V_FACTORY_ADDRESSES, V_FACTORY_INTERFACE, V_FACTORY_ABI, V_EXCHANGE_INTERFACE, V_EXCHANGE_ABI }
