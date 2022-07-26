import { Fragment, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'
import BN from 'bn.js'
import { PublicKey } from '@solana/web3.js'

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
import { LOCK_TIME_OPTIONS } from 'constant'

import { useBuy } from 'hooks/actions/useBuy'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import { useVoucherPrintersByBooster } from 'hooks/boosters/useVoucherPrintersByBooster'
import { useMetaBooster } from 'hooks/boosters/useMetaBooster'
import { useEstimatedReceive } from 'hooks/boosters/useEstimatedReceive'

type BuyNowProps = {
  boosterAddress: string
}

const BuyNow = ({ boosterAddress }: BuyNowProps) => {
  const { askMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [useBoost, setUseBoost] = useState(false)
  const [amount, setAmount] = useState(0)
  const [lockTime, setLockTime] = useState(LOCK_TIME_OPTIONS[0])
  const [nftAddresses, setNFTAddresses] = useState<string[]>([])
  const { buy, loading: buyLoading } = useBuy()
  const mintInfo = useAccountBalanceByMintAddress(askMint.toBase58())
  const voucherPrinters = useVoucherPrintersByBooster(boosterAddress)
  const { payRate } = useMetaBooster(boosterAddress)

  const buyBack = useMemo(() => {
    if (Object.keys(payRate).length === 0) return 100
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

  const onBuy = () => {
    buy({
      retailer: new PublicKey(boosterAddress),
      bidAmount: new BN(amount),
      lockTimeRange: new BN(lockTime.value),
      askAmount: new BN(estimatedReceive),
    })
  }

  return (
    <Row>
      <Col flex="auto">
        <Button
          size="large"
          type="primary"
          onClick={() => setIsModalVisible(true)}
        >
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
