import { ChainId, TokenAmount } from '@kimchiswap/sdk'
import React, { useMemo } from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import tokenLogo from '../../assets/images/token-logo.png'
import { KSWAP } from '../../constants'
import { useTotalSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
import { useMerkleDistributorContract } from '../../hooks/useContract'
import useCurrentBlockTimestamp from '../../hooks/useCurrentBlockTimestamp'
import { useTotalKswapEarned } from '../../state/stake/hooks'
import { useAggregateKswapBalance, useTokenBalance } from '../../state/wallet/hooks'
import { ExternalLink, StyledInternalLink, TYPE, KswapTokenAnimated } from '../../theme'
import { computeKswapCirculation } from '../../utils/computeKswapCirculation'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../vote/styled'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  // background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #021d43 100%);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%,#5FB347 0%,#F97341 100%);
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function KswapBalanceContent({ setShowKswapBalanceModal }: { setShowKswapBalanceModal: any }) {
  const { account, chainId } = useActiveWeb3React()
  const kswap = chainId ? KSWAP[chainId] : undefined

  const total = useAggregateKswapBalance()
  const kswapBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, kswap)
  const kswapToClaim: TokenAmount | undefined = useTotalKswapEarned()

  const totalSupply: TokenAmount | undefined = useTotalSupply(kswap)
  const kswapPrice = useUSDCPrice(kswap)
  const blockTimestamp = useCurrentBlockTimestamp()
  const unclaimedKswap = useTokenBalance(useMerkleDistributorContract()?.address, kswap)
  const circulation: TokenAmount | undefined = useMemo(
    () =>
      blockTimestamp && kswap && chainId === ChainId.MAINNET
        ? computeKswapCirculation(kswap, blockTimestamp, unclaimedKswap)
        : totalSupply,
    [blockTimestamp, chainId, totalSupply, unclaimedKswap, kswap]
  )

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">Your KSWAP Breakdown</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowKswapBalanceModal(false)} />
          </RowBetween>
        </CardSection>
        <Break />
        {account && (
          <>
            <CardSection gap="sm">
              <AutoColumn gap="md" justify="center">
                <KswapTokenAnimated width="48px" src={tokenLogo} />{' '}
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  {total?.toFixed(2, { groupSeparator: ',' })}
                </TYPE.white>
              </AutoColumn>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">Balance:</TYPE.white>
                  <TYPE.white color="white">{kswapBalance?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
                </RowBetween>
                <RowBetween>
                  <TYPE.white color="white">Unclaimed:</TYPE.white>
                  <TYPE.white color="white">
                    {kswapToClaim?.toFixed(4, { groupSeparator: ',' })}{' '}
                    {kswapToClaim && kswapToClaim.greaterThan('0') && (
                      <StyledInternalLink onClick={() => setShowKswapBalanceModal(false)} to="/kswap">
                        (claim)
                      </StyledInternalLink>
                    )}
                  </TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
            <Break />
          </>
        )}
        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white color="white">KSWAP price:</TYPE.white>
              <TYPE.white color="white">${kswapPrice?.toFixed(2) ?? '-'}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">KSWAP in circulation:</TYPE.white>
              <TYPE.white color="white">{circulation?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">Total Supply</TYPE.white>
              <TYPE.white color="white">{totalSupply?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            {kswap && kswap.chainId === ChainId.MAINNET ? (
              <ExternalLink href={`https://info.kimchiswap.io/token/${kswap.address}`}>View KSWAP Analytics</ExternalLink>
            ) : null}
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
