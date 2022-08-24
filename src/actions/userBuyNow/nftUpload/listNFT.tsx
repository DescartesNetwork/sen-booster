import { List, Space, Typography } from 'antd'

import { useGetNFTSymbol } from 'hooks/nft/useGetNFTSymbol'

type CollectionProps = {
  collections: {
    name: string
    address: string
  }[]
}

const ListNFT = ({ collections }: CollectionProps) => {
  const getSymbolCollection = useGetNFTSymbol()

  const onCheckNFT = async (mintAddress: string) => {
    const symbol = await getSymbolCollection(mintAddress)
    if (!symbol) return
    return window.open(
      `https://hub.sentre.io/app/any_arts/${symbol}?autoInstall=true`,
      '_blank',
    )
  }
  return (
    <List
      itemLayout="horizontal"
      dataSource={collections}
      renderItem={({ name, address }) => (
        <List.Item>
          <Space
            style={{ cursor: 'pointer' }}
            size={12}
            onClick={() => onCheckNFT(address)}
          >
            <Typography.Text style={{ color: '#0fb5b8 ' }}>
              &#x2022;
            </Typography.Text>
            <Typography.Text style={{ color: '#0fb5b8 ' }}>
              {name}
            </Typography.Text>
          </Space>
        </List.Item>
      )}
    />
  )
}

export default ListNFT
