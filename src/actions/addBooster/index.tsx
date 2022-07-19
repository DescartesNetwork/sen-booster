import { useState } from 'react'

import { Button, Card, Col, Row, Typography } from 'antd'
import GeneralInfo from './generalInfo'
import BoostNFT from './boostNFT'
import PayRate, { PayRateState } from './payRate'
import ActionCancel from './actionCancel'

import { useInitializeBooster } from 'hooks/actions/useInitializeBooster'

import './index.less'

const initialPayRate = {
  '7 days': 0,
  '30 days': 0,
  '60 days': 0,
  '90 days': 0,
  '120 days': 0,
  '365 days': 0,
}

const DEFAULT_GENERAL_INFO = {
  bidMint: '',
  askMint: '',
  budget: '',
  startTime: 0,
  endTime: 0,
}
export type GeneralData = {
  bidMint: string
  askMint: string
  budget: string
  startTime: number
  endTime: number
}

const AddBooster = () => {
  const [visible, setVisible] = useState(false)
  const [generalData, setGeneralInfo] =
    useState<GeneralData>(DEFAULT_GENERAL_INFO)
  const [payRate, setPayRate] = useState<PayRateState>(initialPayRate)
  const [nfts, setNfts] = useState<string[]>([])
  const { initializeBooster, loading } = useInitializeBooster({
    bidMint: generalData.bidMint,
    askMint: generalData.askMint,
    bidTotal: generalData.budget,
    payRate,
  })

  const onChangePayRate = (value: number, date: string) => {
    const nextPayRate = { ...payRate }
    nextPayRate[date] = Number(value)
    return setPayRate(nextPayRate)
  }

  const onChange = (value: string | number, name: string) => {
    return setGeneralInfo({ ...generalData, [name]: value })
  }
  const disabled =
    !generalData.askMint || !generalData.askMint || !generalData.budget

  return (
    <Row justify="center">
      <Col xs={24} md={16} lg={10}>
        <Card bordered={false}>
          <Row gutter={[32, 32]}>
            <Col span={24}>
              <Typography.Title level={4}>Add boosters</Typography.Title>
            </Col>
            <Col span={24}>
              <GeneralInfo generalData={generalData} onChange={onChange} />
            </Col>
            <Col span={24}>
              <PayRate payRate={payRate} setPayRate={onChangePayRate} />
            </Col>
            <Col span={24}>
              <BoostNFT
                nftList={nfts}
                onChange={(value: string[]) => setNfts(value)}
              />
            </Col>
            <Col span={24}>
              <Row gutter={[12, 12]}>
                <Col xs={24} md={12}>
                  <ActionCancel visible={visible} setVisible={setVisible} />
                </Col>
                <Col xs={24} md={12}>
                  <Button
                    size="large"
                    block
                    onClick={initializeBooster}
                    loading={loading}
                    disabled={disabled}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default AddBooster
