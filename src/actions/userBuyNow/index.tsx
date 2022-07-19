import React, { Fragment, useMemo, useState } from 'react'

import {
  Button,
  Col,
  Divider,
  InputNumber,
  Modal,
  Row,
  Switch,
  Typography,
  Upload,
} from 'antd'
import EstimatedInfo from 'view/user/booster/boosterCard/estimatedInfo'
import { util } from '@sentre/senhub/dist'
import { MintSelection, MintSymbol } from 'shared/antd/mint'
import { useMintAccount } from 'hooks/useMintAccount'
import { useSelector } from 'react-redux'
import { AppState } from 'model'

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

  return (
    <Row>
      <Col flex="auto">
        <Button onClick={() => setIsModalVisible(true)}>Buy Now</Button>
      </Col>
      <Modal
        title="Buy Token"
        visible={isModalVisible}
        onOk={() => {}}
        closable
        onCancel={() => setIsModalVisible(false)}
      >
        <Col>Text</Col>

        <Col flex="auto">
          <Typography.Text>You Pay</Typography.Text>
        </Col>
        <Col>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Available: {util.numeric(mintAccount.balance).format('0,0.[00]a')}{' '}
            <MintSymbol mintAddress={mintAccount.mint} />
          </Typography.Text>
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
          />
        </Col>
        <Col>
          <Typography.Text>Lock time</Typography.Text>
          {DATES.map((val, idx) => (
            <Button disabled={idx > 3} onClick={() => setLockTime(val)}>
              {val}
            </Button>
          ))}
        </Col>
        <Col>
          <Typography.Text>Boost</Typography.Text>
          <Switch
            size="small"
            checked={useBoost}
            onChange={() => setUseBoost(!useBoost)}
          />
        </Col>
        {useBoost && (
          <Col>
            <Typography.Text>
              Use NFTs to increase Buy-back rate
            </Typography.Text>
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
        )}
        <Col>
          {/* <EstimatedInfo receivedToken={receivedToken} ratioBuyBack={} /> */}
          {/* pending for payrate */}
          <EstimatedInfo />
        </Col>
        <Col span={24}>
          <Button>Buy</Button>
        </Col>
      </Modal>
    </Row>
  )
}

export default BuyNow
