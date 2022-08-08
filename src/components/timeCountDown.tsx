import { memo, useCallback, useEffect, useState } from 'react'
import moment from 'moment'

const TimeCountDown = memo(({ endTime }: { endTime: number }) => {
  const [countDown, setCountDown] = useState('0 days 00:00')

  const updateCountDown = useCallback(async () => {
    const startTime = Math.floor(new Date().getTime() / 1000)
    // TODO: startTime > endTime  (finish)
    // TODO: unlimited
    const duration = moment.duration(endTime - startTime, 'seconds')
    const days = duration.days()
    const hours = duration.hours()
    const minutes = duration.minutes()
    setCountDown(`${days} days ${hours}:${minutes}}`)
  }, [endTime])

  useEffect(() => {
    const interval = setInterval(() => updateCountDown(), 60 * 1000)
    return () => clearInterval(interval)
  }, [updateCountDown])

  return <div>{countDown}</div>
})
export default TimeCountDown
