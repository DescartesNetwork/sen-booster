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
  Space,
  Switch,
  Typography,
} from 'antd'
import EstimatedInfo from 'view/user/booster/boosterCard/estimatedInfo'
import { MintSelection, MintSymbol } from '@sen-use/components'
import NftUpload from './nftUpload'

import { AppState } from 'model'
import { DATES, TOKEN } from 'constant'
import { notifyError } from 'helper'

import { useBuy } from 'hooks/actions/useBuy'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import { useVoucherPrintersByBooster } from 'hooks/boosters/useVoucherPrintersByBooster'

type BuyNowProps = {
  boosterAddress: string
}

const BuyNow = ({ boosterAddress }: BuyNowProps) => {
  const { askMint, metadata, bidMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [useBoost, setUseBoost] = useState(false)
  const [amount, setAmount] = useState(0)
  const [lockTime, setLockTime] = useState(DATES[0].value)
  const [payRates, setPayRates] = useState<Record<string, number>>({})
  const [estimatedReceive, setEstimatedReceive] = useState(0)
  const [nftAddresses, setNFTAddresses] = useState<string[]>([])
  const { buy, loading: buyLoading } = useBuy()
  const { tokenProvider } = useMint()
  const mintInfo = useAccountBalanceByMintAddress(askMint.toBase58())
  const voucherPrinters = useVoucherPrintersByBooster(boosterAddress)

  const buyBack = useMemo(() => {
    if (Object.keys(payRates).length === 0) return 100
    return payRates[`${lockTime} days`]
  }, [lockTime, payRates])

  const getPayRates = useCallback(async () => {
    try {
      const ipfs = new IPFS(TOKEN)
      const metaInfo: any = await ipfs.get(metadata)
      if (metaInfo.info) setPayRates(metaInfo.info)
    } catch (error: any) {
      return notifyError(error)
    }
  }, [metadata])

  const estimateReceive = useCallback(async () => {
    try {
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
    }
  }, [amount, askMint, bidMint, buyBack, tokenProvider])

  const onSelectNFT = (nftAddress: string, idx: number) => {
    const currentNFTList = [...nftAddresses]
    currentNFTList[idx] = nftAddress
    setNFTAddresses(currentNFTList)
  }

  useEffect(() => {
    getPayRates()
  }, [getPayRates])

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
      lockTimeRange: new BN(lockTime),
      askAmount: new BN(estimatedReceive),
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
                      <MintSymbol mintAddress={askMint} />
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
                <Radio.Group
                  defaultValue={DATES[0].value}
                  size="middle"
                  onChange={onChange}
                >
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
                    <Space size={8}>
                      <Typography.Text>Boost</Typography.Text>
                      <Switch
                        disabled={!voucherPrinters.length}
                        size="small"
                        checked={useBoost}
                        onChange={() => setUseBoost(!useBoost)}
                      />
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          {useBoost && (
            <Col>
              <NftUpload
                onSelectNFT={onSelectNFT}
                boosterAddress={boosterAddress}
                selectedNFTs={nftAddresses}
              />
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
            <Button block onClick={onBuy} loading={buyLoading}>
              Buy
            </Button>
          </Col>
        </Row>
      </Modal>
    </Row>
  )
}

export default BuyNow
