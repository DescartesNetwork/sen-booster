import IonIcon from '@sentre/antd-ionicon'
import { Card, Image } from 'antd'
import useNftMetaData from 'hooks/nft/useNFTMetaData'

const SIZE_COLLECTION_IMAGE = 88

type DisplayNFTProps = {
  mintAddress: string
  onDelete: (mintAddress: string) => void
}

const DisplayNFT = ({ mintAddress, onDelete }: DisplayNFTProps) => {
  const { nftInfo, loading } = useNftMetaData(mintAddress)
  return (
    <Card
      bordered={false}
      bodyStyle={{ padding: 10 }}
      loading={loading}
      className="card-nft-image-only"
    >
      <Image
        src={nftInfo?.image || ''}
        preview={false}
        style={{ borderRadius: 4 }}
        width={SIZE_COLLECTION_IMAGE}
        height={SIZE_COLLECTION_IMAGE}
        className="nft-image"
      />
      <IonIcon
        onClick={() => onDelete(mintAddress)}
        className="icon-delete-nft"
        name="trash-outline"
      />
    </Card>
  )
}
export default DisplayNFT
