import { useRef, useState } from 'react'

import { Button, Card, Col, Row, Typography } from 'antd'
import GeneralInfo, { GeneralRef } from './generalInfo'
import BoostNFT from './boostNFT'
import PayRate, { PayRateState } from './payRate'
import ActionCancel from './actionCancel'

import { useInitializeBooster } from 'hooks/actions/useInitializeBooster'

import './index.less'

const AddBooster = () => {
  const [visible, setVisible] = useState(false)
  const generalRef = useRef<GeneralRef>({} as GeneralRef)
  const [payRate, setPayRate] = useState<PayRateState>({})
  const [nfts, setNfts] = useState<string[]>([])
  const { initializeBooster, loading } = useInitializeBooster()

  const onChangePayRate = (value: number, date: string) => {
    const nextPayRate = { ...payRate }
    nextPayRate[date] = Number(value)
    return setPayRate(nextPayRate)
  }

  const onCreateBooster = () => {
    const generalData = generalRef.current.collect()
    initializeBooster({ ...generalData, payRate })
  }

  return (
    <Row justify="center">
      <Col xs={24} md={16} lg={10}>
        <Card bordered={false}>
          <Row gutter={[32, 32]}>
            <Col span={24}>
              <Typography.Title level={4}>Add boosters</Typography.Title>
            </Col>
            <Col span={24}>
              <GeneralInfo ref={generalRef} />
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
                    onClick={onCreateBooster}
                    loading={loading}
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