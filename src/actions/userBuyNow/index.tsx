import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useMint, util } from '@sentre/senhub'
import BN from 'bn.js'
import { PublicKey } from '@solana/web3.js'
import { IPFS } from '@sen-use/web3'
import { fetchCGK } from '@sentre/senhub/dist/shared/util'

import {
  Button,
  Col,
  Divider,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Switch,
  Typography,
} from 'antd'
import EstimatedInfo from 'view/user/booster/boosterCard/estimatedInfo'
import { MintSelection, MintSymbol } from '@sen-use/components'
import NftUpload from './nftUpload'

import { useBuy } from 'hooks/actions/useBuy'
import { AppState } from 'model'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import { TOKEN } from 'constant'
import { notifyError } from 'helper'

type BuyNowProps = {
  boosterAddress: string
}

const DATES = [
  { name: '7 days', value: 7 },
  { name: '30 days', value: 30 },
  { name: '60 days', value: 60 },
  { name: '90 days', value: 90 },
  { name: '120 days', value: 120 },
  { name: '365 days', value: 365 },
]

const BuyNow = ({ boosterAddress }: BuyNowProps) => {
  const { askMint, metadata, bidMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [useBoost, setUseBoost] = useState(false)
  const [amount, setAmount] = useState(0)
  const [lockTime, setLockTime] = useState(7)
  const [payRates, setPayRates] = useState<Record<string, number>>({})
  const [estimatedReceive, setEstimatedReceive] = useState(0)
  const [nftAddresses, setNFTAddresses] = useState<string[]>([])
  const { buy } = useBuy()
  const { tokenProvider } = useMint()
  const mintInfo = useAccountBalanceByMintAddress(askMint.toBase58())

  const buyBack = useMemo(() => {
    if (Object.keys(payRates).length === 0) return 100
    return payRates[`${lockTime} days`]
  }, [lockTime, payRates])

  const getBuyBack = useCallback(async () => {
    try {
      setLoading(true)
      const ipfs = new IPFS(TOKEN)
      console.log('before get ipfs', ipfs)
      const payRate: any = await ipfs.get(metadata)
      console.log('payRate: ', payRate)
      if (payRate) setPayRates(payRate)
    } catch (error: any) {
      return notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [metadata])

  const estimateReceive = useCallback(async () => {
    try {
      setLoading(true)
      const bidMintInfo = await tokenProvider.findByAddress(bidMint.toBase58())
      const bidTicket = bidMintInfo?.extensions?.coingeckoId
      const { price: bidPrice } = await fetchCGK(bidTicket)
      const askMintInfo = await tokenProvider.findByAddress(askMint.toBase58())
      const askTicket = askMintInfo?.extensions?.coingeckoId
      const { price: askPrice } = await fetchCGK(askTicket)
      let receiveAmount = 0
      if (bidPrice || askPrice)
        receiveAmount = (amount * askPrice * buyBack) / (bidPrice * 100)
      setEstimatedReceive(receiveAmount)
    } catch (error: any) {
      return notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [amount, askMint, bidMint, buyBack, tokenProvider])

  const onSelectNFT = (nftAddress: string) => {
    const currentNFTList = [...nftAddresses]
    currentNFTList.push(nftAddress)
    setNFTAddresses(currentNFTList)
  }

  useEffect(() => {
    getBuyBack()
  }, [getBuyBack])

  useEffect(() => {
    estimateReceive()
  }, [estimateReceive])

  const onChange = (e: RadioChangeEvent) => {
    setLockTime(e.target.value)
  }

  const onBuy = () => {
    buy({
      retailer: new PublicKey(boosterAddress),
      bidAmount: new BN(amount),
      askAmount: new BN(estimatedReceive),
      lockTimeRange: new BN(lockTime),
    })
  }

  return (
    <Row>
      <Col flex="auto">
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Buy Now
        </Button>
      </Col>
      <Modal
        title={<Typography.Title level={4}>Buy token</Typography.Title>}
        visible={isModalVisible}
        onOk={() => {}}
        closable
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Row justify="space-between" gutter={[16, 16]}>
          <Col span={24}>
            <Typography.Text>
              Token Buy-back offering:{' '}
              <Typography.Text style={{ color: '#7a7b85' }}>
                Selling your LP tokens with juicy profit. No fee, no slippage.
                The token will be unlocked after the selected period.
              </Typography.Text>
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Row>
                  <Col flex="auto">
                    <Typography.Text>You Pay</Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      Available:{' '}
                      {util.numeric(mintInfo.balance).format('0,0.[00]a')}{' '}
                      <MintSymbol mintAddress={askMint.toBase58()} />
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <InputNumber
                  placeholder="0"
                  prefix={
                    <Fragment>
                      <MintSelection disabled value={askMint.toBase58()} />
                      <Divider type="vertical" />
                    </Fragment>
                  }
                  addonAfter={
                    <Button
                      type="text"
                      style={{ marginRight: -7 }}
                      onClick={() => setAmount(Number(mintInfo.balance))}
                    >
                      MAX
                    </Button>
                  }
                  value={amount}
                  onChange={(value) => setAmount(value)}
                  max={Number(mintInfo.balance)}
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Typography.Text>Lock time</Typography.Text>
              </Col>
              <Col span={24}>
                <Radio.Group defaultValue={7} size="middle" onChange={onChange}>
                  <Row gutter={[6, 6]}>
                    {DATES.map((val, idx) => (
                      <Col xs={12} md={8} key={idx}>
                        <Radio.Button
                          defaultChecked={val.value === lockTime}
                          value={val.value}
                          style={{ width: '100%' }}
                        >
                          {val.name}
                        </Radio.Button>
                      </Col>
                    ))}
                  </Row>
                </Radio.Group>
              </Col>
              <Col span={24}>
                <Row justify="end">
                  <Col>
                    <Typography.Text>Boost</Typography.Text>
                    <Switch
                      size="small"
                      checked={useBoost}
                      onChange={() => setUseBoost(!useBoost)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          {useBoost && (
            <Col>
              <NftUpload onSelectNFT={onSelectNFT} />
            </Col>
          )}
          <Col span={24}>
            <EstimatedInfo
              estimatedReceive={estimatedReceive}
              boosterAddress={boosterAddress}
              buyBack={buyBack}
            />
          </Col>
          <Col span={24}>
            <Button block onClick={onBuy}>
              Buy
            </Button>
          </Col>
        </Row>
      </Modal>
    </Row>
  )
}

export default BuyNow
