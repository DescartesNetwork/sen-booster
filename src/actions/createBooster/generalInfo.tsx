import moment from 'moment'

import { Col, DatePicker, Input, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { MintSelection } from '@sen-use/components'
import Content from './content'

import { DATE_FORMAT } from 'constant'
import { forwardRef, useImperativeHandle, useState } from 'react'

type GeneralData = {
  bidMint: string
  askMint: string
  budget: string
  startTime: number
  endTime: number
}
export type GeneralRef = {
  collect: () => GeneralData
}

const GeneralInfo = forwardRef((_, ref) => {
  const [bidMint, setBidMint] = useState('')
  const [askMint, setAskMint] = useState('')
  const [budget, setBudget] = useState('')
  const [startTime, setStartTime] = useState<number>(0)
  const [endTime, setEndTime] = useState<number>(0)

  useImperativeHandle<any, GeneralRef>(ref, () => ({
    collect: () => {
      return {
        bidMint,
        askMint,
        budget,
        startTime,
        endTime,
      }
    },
  }))

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Title level={5}>General information</Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Content
              label="Buy-back"
              value={
                <MintSelection
                  value={askMint}
                  onChange={setAskMint}
                  placeholder="Select LP"
                />
              }
            />
          </Col>
          <Col span={24}>
            <Content
              label="Pay"
              value={
                <MintSelection
                  value={bidMint}
                  onChange={setBidMint}
                  placeholder="Select a token"
                />
              }
            />
          </Col>
          <Col span={24}>
            <Content
              label="Budget"
              value={
                <Input
                  onChange={(e) => setBudget(e.target.value)}
                  value={budget}
                  placeholder="Input the budget amount of pay token"
                />
              }
            />
          </Col>
          <Col span={12}>
            <Content
              label="Start time"
              value={
                <DatePicker
                  placeholder="Select time"
                  suffixIcon={<IonIcon name="time-outline" />}
                  className="date-option"
                  onChange={(date) => setStartTime(date?.valueOf() || 0)}
                  clearIcon={null}
                  value={startTime ? moment(startTime) : null}
                  showTime={{ showSecond: false }}
                  placement="bottomRight"
                  format={DATE_FORMAT}
                />
              }
            />
          </Col>
          <Col span={12}>
            <Content
              label="End time"
              value={
                <DatePicker
                  placeholder="Select time"
                  suffixIcon={<IonIcon name="time-outline" />}
                  className="date-option"
                  onChange={(date) => setEndTime(date?.valueOf() || 0)}
                  clearIcon={null}
                  value={endTime ? moment(endTime) : null}
                  showTime={{ showSecond: false }}
                  placement="bottomRight"
                  format={DATE_FORMAT}
                />
              }
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
})

export default GeneralInfo
