import { AppState } from 'model'
import { useSelector } from 'react-redux'

type BoosterSymbolProps = {
  boosterAddress: string
}
const BoosterSymbol = ({ boosterAddress }: BoosterSymbolProps) => {
  const { bidMint, askMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )

  console.log(bidMint, askMint)

  return <>Booster symbol</>
}

export default BoosterSymbol
