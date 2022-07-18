import { Button, Col, Input, Row } from 'antd'
import React from 'react'

type NftInputListProps = {
  nftList: string[]
  onChange: (nftList: string[]) => void
}

const NftInputList = ({ nftList, onChange }: NftInputListProps) => {
  const onInput = (val: string, idx: number) => {
    const cloneNFTs = [...nftList]
    cloneNFTs[idx] = val
    onChange(cloneNFTs)
  }
  const onAddMore = () => {
    const cloneNFTs = [...nftList]
    cloneNFTs.push('')
    onChange(cloneNFTs)
  }

  return (
    <Row>
      {nftList.map((val, idx) => (
        <Col flex="auto">
          <Input
            value={val}
            onChange={(val) => onInput(val.target.value, idx)}
          />
          <Button>del</Button>
        </Col>
      ))}
      <Button onClick={onAddMore}> + Add more</Button>
    </Row>
  )
}

export default NftInputList
