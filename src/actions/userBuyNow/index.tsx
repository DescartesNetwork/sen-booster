import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'model'
import { util } from '@sentre/senhub'

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
  Upload,
} from 'antd'
import EstimatedInfo from 'view/user/booster/boosterCard/estimatedInfo'
import { MintSelection, MintSymbol } from '@sen-use/components'
import { useMintAccount } from 'hooks/useMintAccount'

type BuyNowProps = {
  boosterAddr: string
}

const DATES = [
  '7 days',
  '30 days',
  '60 days',
  '90 days',
  '120 days',
  '365 days',
]

const BuyNow = ({ boosterAddr }: BuyNowProps) => {
  const { askMint } = useSelector(
    (state: AppState) => state.booster[boosterAddr],
  )
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [useBoost, setUseBoost] = useState(false)
  const [amount, setAmount] = useState(0)
  const mintAccount = useMintAccount(askMint.toBase58())
  const [lockTime, setLockTime] = useState('7 days')

  console.log(lockTime)

  // const receivedToken = useMemo(() => {
  //   const numBidPrice = Number(
  //     utils.undecimalize(BigInt(bidPrice.toString()), 9),
  //   )
  //   return (1 / numBidPrice) * amount
  // }, [amount, bidPrice])
  const onChange = (e: RadioChangeEvent) => {
    setLockTime(e.target.value)
  }

  const onBuy = () => {}

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
                      {util.numeric(mintAccount.balance).format('0,0.[00]a')}{' '}
                      <MintSymbol mintAddress={mintAccount.mint} />
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <InputNumber
                  placeholder="0"
                  prefix={
                    <Fragment>
                      <MintSelection disabled value={mintAccount.mint} />
                      <Divider type="vertical" />
                    </Fragment>
                  }
                  addonAfter={
                    <Button
                      type="text"
                      style={{ marginRight: -7 }}
                      onClick={() => setAmount(Number(mintAccount.balance))}
                    >
                      MAX
                    </Button>
                  }
                  value={amount}
                  onChange={(value) => setAmount(value)}
                  max={Number(mintAccount.balance)}
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
                <Radio.Group defaultValue="a" size="middle" onChange={onChange}>
                  {DATES.map((val, idx) => (
                    <Radio.Button value={val} checked={val === lockTime}>
                      {val}
                    </Radio.Button>
                  ))}
                  {/* <Col span={8}>
                      <Button
                        disabled={idx > 3}
                        onClick={() => setLockTime(val)}
                        style={{ width: '100%' }}
                      >
                        {val}
                      </Button>
                    </Col> */}
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
              <Row>
                <Col>
                  <Typography.Text>
                    Use NFTs to increase Buy-back rate
                  </Typography.Text>
                </Col>
                <Col>
                  {[1, 2, 3].map((val) => (
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      // beforeUpload={beforeUpload}
                      // onChange={handleChange}
                    />
                  ))}
                </Col>
              </Row>
            </Col>
          )}
          <Col span={24}>
            {/* <EstimatedInfo receivedToken={receivedToken} ratioBuyBack={} /> */}
            {/* pending for payrate */}
            <EstimatedInfo />
          </Col>
          <Col span={24}>
            <Button style={{ width: '100%' }} onClick={onBuy}>
              Buy
            </Button>
          </Col>
        </Row>
      </Modal>
    </Row>
  )
}

export default BuyNow
