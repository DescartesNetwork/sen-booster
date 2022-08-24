import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Col, Row, Space, Tooltip, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { util } from '@sentre/senhub'
import { shortenAddress } from '@sentre/senhub/dist/shared/util'

import { useNftMetaData } from '@sen-use/components'

type NFTInfoProps = {
  mintAddress: string
}

const NFTInfo = ({ mintAddress }: NFTInfoProps) => {
  const [copied, setCopied] = useState(false)
  const { nftInfo } = useNftMetaData(mintAddress)

  const onCopy = async () => {
    setCopied(true)
    await util.asyncWait(1500)
    setCopied(false)
  }
  return (
    <Row align="middle">
      <Col flex="auto">
        <Typography.Text>{nftInfo?.name}</Typography.Text>
      </Col>
      <Col>
        <Space style={{ cursor: 'pointer' }}>
          <Typography.Text
            onClick={() => window.open(util.explorer(mintAddress), '_blank')}
            type="secondary"
            underline
          >
            {shortenAddress(mintAddress)}
          </Typography.Text>
          <Tooltip title="Copied" visible={copied}>
            <CopyToClipboard text={mintAddress}>
              <IonIcon onClick={onCopy} name="copy-outline" />
            </CopyToClipboard>
          </Tooltip>
        </Space>
      </Col>
    </Row>
  )
}

export default NFTInfo
