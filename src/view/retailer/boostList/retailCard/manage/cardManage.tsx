import { useState } from 'react'
import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'
import CopyToClipboard from 'react-copy-to-clipboard'
import { utilsBN } from '@sen-use/web3'
import moment from 'moment'

import { Button, Card, Col, Row, Space, Tooltip, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import { numeric, shortenAddress } from '@sentre/senhub/dist/shared/util'
import { MintSymbol } from '@sen-use/components'
import SpaceVertical from '../spaceVertical'
import PayRateDisplay from './payRateDisplay'

import { AppState } from 'model'
import { FORMAT_DATE } from 'constant'
import useMintDecimals from 'shared/hooks/useMintDecimals'

type CardManageProps = {
  boosterAddress: string
}

const CardManage = ({ boosterAddress }: CardManageProps) => {
  const [copied, setCopied] = useState('')
  const { bidMint, askMint, bidTotal, startTime, endTime } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )

  const bidDecimal = useMintDecimals(bidMint.toBase58()) || 0

  const onCopy = async (mintAddress: string) => {
    setCopied(mintAddress)
    await util.asyncWait(1500)
    setCopied('')
  }

  return (
    <Card className="card-manage-body" bordered={false}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Typography.Title level={5}>General information</Typography.Title>
        </Col>
        <Col span={24}>
          <Row justify="space-between" wrap={false}>
            <Col span={9}>
              <SpaceVertical
                label="Buy-back LP address"
                value={
                  <Space>
                    <Typography.Text>
                      {shortenAddress(askMint.toBase58())}
                    </Typography.Text>
                    <Tooltip
                      title="Copied"
                      visible={copied === askMint.toBase58()}
                    >
                      <CopyToClipboard text={askMint.toBase58()}>
                        <Button
                          type="text"
                          onClick={() => onCopy(askMint.toBase58())}
                          icon={<IonIcon name="copy-outline" />}
                        />
                      </CopyToClipboard>
                    </Tooltip>
                  </Space>
                }
              />
            </Col>
            <Col span={9}>
              <SpaceVertical
                label="Pay mint address"
                value={
                  <Space>
                    <Typography.Text>
                      {shortenAddress(bidMint.toBase58())}
                    </Typography.Text>
                    <Tooltip
                      title="Copied"
                      visible={copied === bidMint.toBase58()}
                    >
                      <CopyToClipboard text={bidMint.toBase58()}>
                        <Button
                          type="text"
                          onClick={() => onCopy(bidMint.toBase58())}
                          icon={<IonIcon name="copy-outline" />}
                        />
                      </CopyToClipboard>
                    </Tooltip>
                  </Space>
                }
              />
            </Col>
            <Col span={6}>
              <SpaceVertical
                label="Boost"
                value={<Typography.Text>Yes</Typography.Text>}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24} />
        <Col span={24}>
          <Row justify="space-between" wrap={false}>
            <Col span={9}>
              <SpaceVertical
                label="Start date"
                value={
                  <Typography.Text>
                    {moment(startTime.toNumber() * 1000).format(FORMAT_DATE)}
                  </Typography.Text>
                }
              />
            </Col>
            <Col span={9}>
              <SpaceVertical
                label="End date"
                value={
                  <Typography.Text>
                    {moment(endTime.toNumber() * 1000).format(FORMAT_DATE)}
                  </Typography.Text>
                }
              />
            </Col>
            <Col span={6}>
              <SpaceVertical
                label="Budget"
                value={
                  <Typography.Text>
                    {numeric(utilsBN.undecimalize(bidTotal, bidDecimal)).format(
                      '0.0,[000]',
                    )}{' '}
                    <MintSymbol mintAddress={askMint} />
                  </Typography.Text>
                }
              />
            </Col>
          </Row>
        </Col>
        <Col span={24} />
        <Col span={24}>
          <PayRateDisplay boosterAddress={boosterAddress} />
        </Col>
      </Row>
    </Card>
  )
}

export default CardManage
