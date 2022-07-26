import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import moment from 'moment'

import { Space, Typography } from 'antd'

import { AppState } from 'model'

type StatisticsProps = {
  boosterAddress: string
}

const Statistics = ({ boosterAddress }: StatisticsProps) => {
  const { endAt } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )
  // const {} = useEngageBoosterInfos(boosterAddress)
  const yourBoughtAmount = useMemo(() => {
    return 1
  }, [])

  const totalValuePaid = useMemo(() => {
    return 3
  }, [])

  return (
    <Space size={48}>
      <Space direction="vertical">
        <Typography.Text>Buy-back</Typography.Text>
        <Typography.Title level={4}>102.5%</Typography.Title>
      </Space>
      <Space direction="vertical">
        <Typography.Text>Your bought</Typography.Text>
        <Typography.Title level={5}>{yourBoughtAmount}</Typography.Title>
      </Space>
      <Space direction="vertical">
        <Typography.Text>Total value paid</Typography.Text>
        <Typography.Title level={5}>{totalValuePaid}</Typography.Title>
      </Space>
      <Space direction="vertical">
        <Typography.Text>End date</Typography.Text>
        <Typography.Title level={5}>
          {moment(endAt.toNumber() * 1000).format('MMM DD, YYYY HH:mm')}
        </Typography.Title>
      </Space>
    </Space>
  )
}

export default Statistics
