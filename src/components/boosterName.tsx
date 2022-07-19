import { Row, Typography } from 'antd'
import { AppState } from 'model'
import { useSelector } from 'react-redux'

type BoosterNameProps = {
  boosterAddress: string
}

const BoosterName = ({ boosterAddress }: BoosterNameProps) => {
  const { bidMint, askMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )
  console.log(bidMint, askMint)
  return (
    <Row>
      <Typography.Title level={3}>USDC.SNTRLP-SNTR</Typography.Title>
    </Row>
  )
}

export default BoosterName
