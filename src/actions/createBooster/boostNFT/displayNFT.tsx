import IonIcon from '@sentre/antd-ionicon'
import { Card } from 'antd'
import { AvatarNFT } from '@sen-use/components'

const SIZE_COLLECTION_IMAGE = 88

type DisplayNFTProps = {
  mintAddress: string
  onDelete: (mintAddress: string) => void
}

const DisplayNFT = ({ mintAddress, onDelete }: DisplayNFTProps) => {
  return (
    <Card
      bordered={false}
      bodyStyle={{ padding: 10 }}
      className="card-nft-image-only"
    >
      <div className="nft-image">
        <AvatarNFT
          mintAddress={mintAddress}
          size={SIZE_COLLECTION_IMAGE}
          style={{ borderRadius: 4 }}
        />
      </div>
      <IonIcon
        onClick={() => onDelete(mintAddress)}
        className="icon-delete-nft"
        name="trash-outline"
      />
    </Card>
  )
}
export default DisplayNFT
