import AddNewBoost from 'actions/addNewBoost'
import { Col, Input, Row, Switch, Typography } from 'antd'
import { useState } from 'react'
import { MintSelection } from 'shared/antd/mint'
import NftInputList from './nftInputList'

const DATES = [
  '7 days',
  '30 days',
  '60 days',
  '90 days',
  '120 days',
  '365 days',
]
type PayRateState = Record<typeof DATES[number], number>

const initialPayRate = {
  '7 days': 0,
  '30 days': 0,
  '60 days': 0,
  '90 days': 0,
  '120 days': 0,
  '365 days': 0,
}

const AddBooster = () => {
  const [useNFT, setUseNFT] = useState(false)
  const [buyBackToken, setBuyBackToken] = useState('')
  const [payToken, setPayToken] = useState('')
  const [budget, setBudget] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [payRate, setPayRate] = useState<PayRateState>(initialPayRate)
  const [nfts, setNfts] = useState<string[]>([])

  const onChangePayRate = (value: string, index: string) => {
    const clonePayRate = { ...payRate }
    clonePayRate[index] = Number(value)
    return setPayRate(clonePayRate)
  }

  const onSwitch = (checked: boolean) => {
    if (!checked) setUseNFT(false)
    setUseNFT(true)
  }

  return (
    <Row>
      <Col>
        <Typography.Title>Add boosters</Typography.Title>
      </Col>
      <Col>
        <Row>
          <Col span={24}>
            <Typography.Title>General information</Typography.Title>
          </Col>
          <Col span={24}>
            <Typography.Text>Buy-back</Typography.Text>
            <MintSelection
              value={buyBackToken}
              onChange={(value) => setBuyBackToken(value)}
            />
          </Col>
          <Col span={24}>
            <Typography.Text>Pay</Typography.Text>
            <MintSelection
              value={payToken}
              onChange={(value) => setPayToken(value)}
            />
          </Col>
          <Col span={24}>
            <Typography.Text>Budget</Typography.Text>
            <Input
              onChange={(value) => setBudget(value.target.value)}
              value={budget}
            />
          </Col>
          <Col span={12}>
            <Typography.Text>Start time</Typography.Text>
            <Input
              onChange={(value) => setStartTime(value.target.value)}
              value={startTime}
            />
          </Col>
          <Col span={12}>
            <Typography.Text>End time</Typography.Text>
            <Input
              onChange={(value) => setEndTime(value.target.value)}
              value={endTime}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Typography.Title>Pay rate</Typography.Title>
            <Row>
              {DATES.map((date) => (
                <Col span={12}>
                  <Typography>{date}</Typography>
                  <Input
                    value={payRate[date]}
                    onChange={(val) => onChangePayRate(val.target.value, date)}
                  ></Input>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col>
            <Typography.Title>Boost by NFT</Typography.Title>
            <Switch onChange={onSwitch} />
          </Col>
          {!!useNFT && (
            <Col>
              <NftInputList
                nftList={nfts}
                onChange={(value: string[]) => setNfts(value)}
              />
            </Col>
          )}
        </Row>
      </Col>
      <Col>
        <AddNewBoost />
      </Col>
    </Row>
  )
}

export default AddBooster
