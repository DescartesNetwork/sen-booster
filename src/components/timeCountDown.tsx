import { memo, useCallback, useEffect, useState } from 'react'
import moment from 'moment'
import { Space, Typography } from 'antd'

const TimeCountDown = memo(({ endTime }: { endTime: number }) => {
  const startTime = Math.floor(Date.now() / 1000)
  const duration = moment.duration(endTime - startTime, 'seconds')

  const [countDown, setCountDown] = useState({
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
  })

  const updateCountDown = useCallback(async () => {
    if (!endTime) return
    const startTime = Math.floor(Date.now() / 1000)
    // TODO: startTime > endTime  (finish)
    // TODO: unlimited
    const duration = moment.duration(endTime - startTime, 'seconds')
    const days = duration.days()
    const hours = duration.hours()
    const minutes = duration.minutes()

    setCountDown({ days, hours, minutes })
  }, [endTime])

  useEffect(() => {
    const interval = setInterval(() => updateCountDown(), 60 * 1000)
    return () => clearInterval(interval)
  }, [updateCountDown])

  if (!endTime) return <Typography.Text>Unlimited</Typography.Text>
  return (
    <Space size={4}>
      <Typography.Text className="countdown">{countDown.days}d</Typography.Text>
      :
      <Typography.Text className="countdown">
        {countDown.hours}h
      </Typography.Text>
      :
      <Typography.Text className="countdown">
        {countDown.minutes}m
      </Typography.Text>
    </Space>
  )
})
export default TimeCountDown
