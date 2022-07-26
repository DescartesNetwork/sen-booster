import { Fragment, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useMint, util } from '@sentre/senhub'
import BN from 'bn.js'
import { PublicKey } from '@solana/web3.js'
import { utilsBN } from '@sen-use/web3'

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

import { useBuy } from 'hooks/actions/useBuy'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import { useVoucherPrintersByBooster } from 'hooks/boosters/useVoucherPrintersByBooster'
import { useMetaBooster } from 'hooks/boosters/useMetaBooster'
import { useEstimatedReceive } from 'hooks/boosters/useEstimatedReceive'

import { AppState } from 'model'
import { LOCK_TIME_OPTIONS } from 'constant'

type BuyNowProps = {
  boosterAddress: string
}

const ONE_DAY = 24 * 60 * 60

const BuyNow = ({ boosterAddress }: BuyNowProps) => {
  const { askMint, bidMint } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )
  const [isVisible, setIsVisible] = useState(false)
  const [useBoost, setUseBoost] = useState(false)
  const [amount, setAmount] = useState(0)
  const [lockTime, setLockTime] = useState(LOCK_TIME_OPTIONS[0])
  const [nftAddresses, setNFTAddresses] = useState<string[]>([])
  const { buy, loading: buyLoading } = useBuy()
  const mintInfo = useAccountBalanceByMintAddress(askMint.toBase58())
  const { voucherPrintersByBooster, remainingVouchers } =
    useVoucherPrintersByBooster(boosterAddress)
  const { payRate } = useMetaBooster(boosterAddress)
  const { getDecimals } = useMint()

  const buyBack = useMemo(() => {
    if (Object.keys(payRate).length === 0 || !payRate[lockTime.name]) return 100
    return payRate[lockTime.name]
  }, [lockTime, payRate])

  const estimatedReceive = useEstimatedReceive({
    boosterAddress,
    amount,
    buyBack,
  })

  const onSelectNFT = (nftAddress: string, idx: number) => {
    const currentNFTList = [...nftAddresses]
    currentNFTList[idx] = nftAddress
    setNFTAddresses(currentNFTList)
  }

  const onChange = (e: RadioChangeEvent) => {
    setLockTime(e.target.value)
  }

  const onBuy = async () => {
    const bidDecimal = await getDecimals(bidMint.toBase58())
    const askDecimal = await getDecimals(askMint.toBase58())
    await buy({
      retailer: new PublicKey(boosterAddress),
      bidAmount: utilsBN.decimalize(amount, bidDecimal),
      lockTime: new BN(lockTime.value * ONE_DAY),
      askAmount: utilsBN.decimalize(estimatedReceive, askDecimal),
      appliedNFTs: nftAddresses,
    })
    setIsVisible(false)
  }

  return (
    <Row>
      <Col flex="auto">
        <Button size="large" type="primary" onClick={() => setIsVisible(true)}>
          Buy Now
        </Button>
      </Col>
      <Modal
        title={<Typography.Title level={4}>Buy token</Typography.Title>}
        visible={isVisible}
        closable
        onCancel={() => setIsVisible(false)}
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
                  defaultValue={LOCK_TIME_OPTIONS[0]}
                  size="middle"
                  onChange={onChange}
                >
                  <Row gutter={[6, 6]}>
                    {LOCK_TIME_OPTIONS.map((val, idx) => (
                      <Col xs={12} md={8} key={idx}>
                        <Radio.Button
                          defaultChecked={val.value === lockTime.value}
                          value={val.value}
                          style={{ width: '100%' }}
                          disabled={!payRate[val.name]}
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
                        disabled={
                          !voucherPrintersByBooster.length || !remainingVouchers
                        }
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
