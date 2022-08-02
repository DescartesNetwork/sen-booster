import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { useMint, util } from '@sentre/senhub'
import BN from 'bn.js'
import { utilsBN } from '@sen-use/web3'

import {
  Button,
  Col,
  InputNumber,
  Modal,
  Radio,
  Row,
  Space,
  Switch,
  Tooltip,
  Typography,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import EstimatedInfo from 'view/user/booster/boosterCard/estimatedInfo'
import { MintSymbol } from '@sen-use/components'
import NftUpload from './nftUpload'

import { useBuy } from 'hooks/actions/useBuy'
import { useVoucherPrintersByBooster } from 'hooks/boosters/useVoucherPrintersByBooster'
import { useMetaBooster } from 'hooks/boosters/useMetaBooster'
import { useEstimatedReceive } from 'hooks/boosters/useEstimatedReceive'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import { AppState } from 'model'
import { LOCK_TIME_DAY } from 'constant'

import './index.less'

type BuyNowProps = {
  boosterAddress: string
}

const ONE_DAY = 24 * 60 * 60
const ONE_NFT_DISCOUNT = 2.5

const BuyNow = ({ boosterAddress }: BuyNowProps) => {
  const { askMint } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )
  const [isVisible, setIsVisible] = useState(false)
  const [useBoost, setUseBoost] = useState(false)
  const [amount, setAmount] = useState(0)
  const [lockDay, setLockDay] = useState('7 days')
  const [nftAddresses, setNFTAddresses] = useState<string[]>([])
  const mintInfo = useAccountBalanceByMintAddress(askMint.toBase58())
  const voucherPrintersByBooster = useVoucherPrintersByBooster(boosterAddress)
  const { payRate } = useMetaBooster(boosterAddress)
  const { getDecimals } = useMint()
  const { buy, loading } = useBuy()
  const nftDiscount = nftAddresses.length * ONE_NFT_DISCOUNT
  const estimatedReceive = useEstimatedReceive({
    boosterAddress,
    amount,
    discount: payRate[lockDay] + nftDiscount,
  })

  const onSelectNFT = (nftAddress: string) => {
    const currentNFTList = [...nftAddresses]
    currentNFTList.push(nftAddress)
    return setNFTAddresses(currentNFTList)
  }

  const removeNFT = (nftAddress: string) => {
    const filteredNFT = [...nftAddresses].filter(
      (address) => address !== nftAddress,
    )
    return setNFTAddresses(filteredNFT)
  }

  const onBuy = async () => {
    const askDecimal = await getDecimals(askMint.toBase58())
    const lockDayValue = LOCK_TIME_DAY[lockDay]
    await buy({
      retailer: boosterAddress,
      askAmount: utilsBN.decimalize(amount, askDecimal),
      lockTime: new BN(lockDayValue * ONE_DAY),
      bidAmount: estimatedReceive,
      appliedNFTs: nftAddresses,
    })
    setIsVisible(false)
  }

  return (
    <Fragment>
      <Button size="large" type="primary" onClick={() => setIsVisible(true)}>
        Buy Now
      </Button>
      <Modal
        visible={isVisible}
        closeIcon={<IonIcon name="close-outline" />}
        onCancel={() => setIsVisible(false)}
        footer={null}
        className="card-manage"
        title={<Typography.Title level={4}>Buy token</Typography.Title>}
      >
        <Row justify="space-between" gutter={[16, 16]}>
          <Col span={24}>
            <Typography.Text>
              Token Buy-back offering:{' '}
              <Typography.Text type="secondary">
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
                    <Typography.Text type="secondary" className="caption">
                      Available:{' '}
                      {util.numeric(mintInfo.balance).format('0,0.[00]a')}{' '}
                      <MintSymbol mintAddress={askMint} />
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <InputNumber
                  className="user-input"
                  placeholder="0"
                  prefix={<MintSymbol mintAddress={askMint} />}
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
                  onChange={setAmount}
                  max={Number(mintInfo.balance)}
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Space>
                  <Typography.Text>Lock time</Typography.Text>
                  <Tooltip title="For each lock time, there will be a corresponding Buy-back rate, you will receive tokens after the selected lock time.">
                    <IonIcon name="information-circle-outline" />
                  </Tooltip>
                </Space>
              </Col>
              <Col span={24}>
                <Radio.Group
                  size="middle"
                  onChange={(e) => setLockDay(e.target.value)}
                  style={{ width: '100%' }}
                  value={lockDay}
                >
                  <Row gutter={[6, 6]}>
                    {Object.keys(payRate).map((days) => (
                      <Col xs={12} md={8} key={days}>
                        <Radio.Button style={{ width: '100%' }} value={days}>
                          {days}
                        </Radio.Button>
                      </Col>
                    ))}
                  </Row>
                </Radio.Group>
              </Col>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Space size={8}>
                  <Typography.Text>Boost</Typography.Text>
                  <Switch
                    disabled={!voucherPrintersByBooster.length}
                    size="small"
                    checked={useBoost}
                    onChange={setUseBoost}
                  />
                </Space>
              </Col>
            </Row>
          </Col>
          {useBoost && (
            <Col span={24}>
              <NftUpload
                onSelectNFT={onSelectNFT}
                boosterAddress={boosterAddress}
                selectedNFTs={nftAddresses}
                removeNFT={removeNFT}
              />
            </Col>
          )}
          <Col span={24}>
            <EstimatedInfo
              estimatedReceive={estimatedReceive}
              boosterAddress={boosterAddress}
              discount={payRate[lockDay]}
              nftDiscount={nftDiscount}
            />
          </Col>
          <Col span={24}>
            <Button
              size="large"
              type="primary"
              block
              onClick={onBuy}
              loading={loading}
            >
              Buy
            </Button>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default BuyNow
