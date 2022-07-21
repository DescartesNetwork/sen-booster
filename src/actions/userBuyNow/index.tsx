import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'
import BN from 'bn.js'
import { PublicKey } from '@solana/web3.js'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload'

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
  Upload,
  UploadProps,
} from 'antd'
import EstimatedInfo from 'view/user/booster/boosterCard/estimatedInfo'
import { MintSelection, MintSymbol } from '@sen-use/components'
import IonIcon from '@sentre/antd-ionicon'

import { useMintAccount } from 'hooks/useMintAccount'
import { useBuy } from 'hooks/actions/useBuy'
import { notifyError, notifySuccess } from 'helper'
import { AppState } from 'model'

type BuyNowProps = {
  boosterAddress: string
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
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
  const { askMint, bidPrice } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const [useBoost, setUseBoost] = useState(false)
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [lockTime, setLockTime] = useState(7)
  const { buy } = useBuy()
  const mintAccount = useMintAccount(askMint.toBase58())

  const onChange = (e: RadioChangeEvent) => {
    setLockTime(e.target.value)
  }

  const onBuy = () => {
    buy({
      retailer: new PublicKey(boosterAddress),
      bidAmount: new BN(1),
      bidPrice: bidPrice,
      lockTime: new BN(7),
    })
  }

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      notifySuccess('You can only upload JPG/PNG file!', '')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      notifyError('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const uploadButton = (
    <div>
      {loading ? (
        <IonIcon name="refresh-outline" />
      ) : (
        <IonIcon name="add-outline" />
      )}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
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
                  <Row gutter={[6, 6]}>
                    {DATES.map((val, idx) => (
                      <Col xs={12} md={8} key={idx}>
                        <Radio.Button
                          value={val.value}
                          checked={val.value === lockTime}
                          style={{ width: '100%' }}
                        >
                          {val.name}
                        </Radio.Button>
                      </Col>
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
              <Row>
                <Col span={24}>
                  <Typography.Text>
                    Use NFTs to increase Buy-back rate
                  </Typography.Text>
                </Col>
                <Col span={24}>
                  <Row gutter={[16, 16]}>
                    {[1, 2, 3].map((val) => (
                      <Col span={5}>
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                        >
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt="avatar"
                              style={{ width: 64 }}
                            />
                          ) : (
                            uploadButton
                          )}
                        </Upload>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Col>
          )}
          <Col span={24}>
            {/* <EstimatedInfo receivedToken={receivedToken} ratioBuyBack={} /> */}
            {/* pending for payrate */}
            <EstimatedInfo boosterAddress={boosterAddress} />
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
