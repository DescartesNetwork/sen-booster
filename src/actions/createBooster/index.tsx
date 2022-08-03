import { useMemo, useState } from 'react'

import { Button, Card, Col, Row, Typography } from 'antd'
import GeneralInfo, { GeneralData } from './generalInfo'
import BoostNFT from './boostNFT'
import PayRate, { DATES, PayRateState } from './payRate'
import ActionCancel from './actionCancel'

import { useInitializeBooster } from 'hooks/actions/useInitializeBooster'
import { useAppRouter } from 'hooks/useAppRouter'

import './index.less'

const CreateBooster = () => {
  // Booster data
  const [payRate, setPayRate] = useState<PayRateState>({})
  const [collections, setCollections] = useState<string[]>([])
  const [generalData, setGeneralData] = useState<GeneralData>({
    bidMint: '',
    askMint: '',
    budget: '',
    startTime: 0,
    endTime: 0,
  })
  // Component state
  const [visible, setVisible] = useState(false)
  const { initializeBooster, loading } = useInitializeBooster()
  const { pushHistory } = useAppRouter()

  const onChangePayRate = (value: number, date: string) => {
    const nextPayRate = { ...payRate }
    nextPayRate[date] = Number(value)
    return setPayRate(nextPayRate)
  }

  const onCreateBooster = async () => {
    const nextPayRate = { ...payRate }
    for (const date of DATES) {
      if (!nextPayRate[date]) nextPayRate[date] = 0
    }
    await initializeBooster({
      ...generalData,
      payRate: nextPayRate,
      collections,
    })
    return pushHistory('/retailer')
  }

  const onGeneralDataChange = (
    value: string | number,
    name: keyof GeneralData,
  ) => {
    return setGeneralData({ ...generalData, [name]: value })
  }

  const disabled = useMemo(() => {
    const { askMint, bidMint, budget, endTime, startTime } = generalData
    const listRate = Object.keys(payRate)
    return (
      !askMint ||
      !bidMint ||
      !budget ||
      !endTime ||
      !startTime ||
      listRate.length < 1
    )
  }, [payRate, generalData])

  return (
    <Row justify="center">
      <Col xs={24} md={16} lg={10}>
        <Card>
          <Row gutter={[32, 32]}>
            <Col span={24}>
              <Typography.Title level={4}>Create booster</Typography.Title>
            </Col>
            <Col span={24}>
              <GeneralInfo
                generateData={generalData}
                onChange={onGeneralDataChange}
              />
            </Col>
            <Col span={24}>
              <PayRate payRate={payRate} setPayRate={onChangePayRate} />
            </Col>
            <Col span={24}>
              <BoostNFT collections={collections} onChange={setCollections} />
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
                    onClick={onCreateBooster}
                    loading={loading}
                    disabled={disabled}
                    type="primary"
                  >
                    Create
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

export default CreateBooster
