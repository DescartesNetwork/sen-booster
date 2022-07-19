import moment from 'moment'

import { Col, DatePicker, Input, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Content from './content'

import { GeneralData } from './index'
import { MintSelection } from 'shared/antd/mint'
import { FORMAT_DATE } from 'constant'

type GeneralInfoProps = {
  generalData: GeneralData
  onChange: (value: string | number, name: string) => void
}

const GeneralInfo = ({ generalData, onChange }: GeneralInfoProps) => {
  const { budget, bidMint, endTime, askMint, startTime } = generalData
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
                  value={bidMint}
                  onChange={(val) => onChange(val, 'bidMint')}
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
                  value={askMint}
                  onChange={(val) => onChange(val, 'askMint')}
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
                  onChange={(e) => onChange(e.target.value, e.target.name)}
                  name="budget"
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
                  onChange={(date) =>
                    onChange(date?.valueOf() || 0, 'startTime')
                  }
                  clearIcon={null}
                  value={startTime ? moment(startTime) : null}
                  showTime={{ showSecond: false }}
                  placement="bottomRight"
                  format={FORMAT_DATE}
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
                  onChange={(date) => onChange(date?.valueOf() || 0, 'endTime')}
                  clearIcon={null}
                  value={endTime ? moment(endTime) : null}
                  showTime={{ showSecond: false }}
                  placement="bottomRight"
                  format={FORMAT_DATE}
                />
              }
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default GeneralInfo
