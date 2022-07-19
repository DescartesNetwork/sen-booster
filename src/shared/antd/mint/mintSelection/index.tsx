import { CSSProperties, Fragment, useCallback, useState } from 'react'

import { Button, Col, Modal, Row, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { MintAvatar, MintSymbol } from 'shared/antd/mint'
import SearchMints from './searchMints'

export type MintSelectionProps = {
  value?: string
  onChange?: (value: string) => void
  style?: CSSProperties
  disabled?: boolean
  placeholder?: string
}

const MintSelection = ({
  value = '',
  onChange = () => {},
  style = {},
  disabled = false,
  placeholder = '',
}: MintSelectionProps) => {
  const [visible, setVisible] = useState(false)

  const onSelect = useCallback(
    (mintAddress: string) => {
      onChange(mintAddress)
      setVisible(false)
    },
    [onChange],
  )

  return (
    <Fragment>
      <Button
        type="text"
        onClick={() => setVisible(true)}
        style={{ padding: 4, ...style }}
        disabled={disabled}
        className="mint-selection"
      >
        <Row>
          <Col flex="auto">
            <Space>
              <MintAvatar mintAddress={value} />
              {!value && placeholder ? (
                placeholder
              ) : (
                <MintSymbol mintAddress={value} />
              )}
            </Space>
          </Col>
          <Col>
            <IonIcon name="chevron-down-outline" />
          </Col>
        </Row>
      </Button>
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        closable={false}
        centered
        className="mint-select-modal"
        destroyOnClose
      >
        <SearchMints onChange={onSelect} />
      </Modal>
    </Fragment>
  )
}

export default MintSelection
