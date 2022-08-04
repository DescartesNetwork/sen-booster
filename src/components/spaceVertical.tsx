import { ReactNode } from 'react'

import { MintAvatar, MintSymbol } from '@sen-use/components'

import { Space, SpaceProps, Typography } from 'antd'

type SpaceVerticalProps = {
  label: string
  value?: ReactNode
  mintAddress?: string
  size?: number
  align?: SpaceProps['align']
}

const SpaceVertical = ({
  label,
  value,
  mintAddress = '',
  size = 8,
  align = 'start',
}: SpaceVerticalProps) => {
  if (mintAddress)
    return <DisplayMint align={align} label={label} mintAddress={mintAddress} />
  return (
    <Space align={align} size={size} direction="vertical">
      <Typography.Text className="caption" type="secondary">
        {label}
      </Typography.Text>
      {value}
    </Space>
  )
}

const DisplayMint = ({
  label,
  mintAddress = '',
  align,
}: SpaceVerticalProps) => (
  <Space size={12} direction="vertical" align={align}>
    <Typography.Text>{label}</Typography.Text>
    <Space>
      <MintAvatar mintAddress={mintAddress} />
      <Typography.Title level={5}>
        <MintSymbol mintAddress={mintAddress} />
      </Typography.Title>
    </Space>
  </Space>
)

export default SpaceVertical
