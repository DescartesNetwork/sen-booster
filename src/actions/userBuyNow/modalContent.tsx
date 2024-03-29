import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetMintDecimals, util } from '@sentre/senhub'
import { utilsBN } from '@sen-use/web3'
import { BN } from '@project-serum/anchor'

import InputNumberCard from 'components/inputNumberCard'
import { MintSymbol } from '@sen-use/app'
import IonIcon from '@sentre/antd-ionicon'
import {
  Button,
  Checkbox,
  Col,
  Radio,
  Row,
  Space,
  Spin,
  Switch,
  Tooltip,
  Typography,
} from 'antd'
import EstimatedInfo from 'view/user/booster/boosterCard/estimatedInfo'
import NftUpload from './nftUpload'

import { useMetaBooster } from 'hooks/boosters/useMetaBooster'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import { useVoucherPrintersByBooster } from 'hooks/boosters/useVoucherPrintersByBooster'
import { useBuy } from 'hooks/actions/useBuy'
import { useEstimatedReceive } from 'hooks/boosters/useEstimatedReceive'
import { LOCK_TIME_DAY } from 'constant'
import { AppState } from 'model'

const ONE_DAY = 24 * 60 * 60
const ONE_NFT_DISCOUNT = 2.5

type ModalContentProps = {
  boosterAddress: string
  onClose: () => void
}

const ModalContent = ({ boosterAddress, onClose }: ModalContentProps) => {
  const { askMint } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )
  const [isAgree, setIsAgree] = useState(false)
  const [useBoost, setUseBoost] = useState(false)
  const [amount, setAmount] = useState(0)
  const [lockDay, setLockDay] = useState('')
  const [nftAddresses, setNFTAddresses] = useState<string[]>([])

  const mintInfo = useAccountBalanceByMintAddress(askMint.toBase58())

  const voucherPrintersByBooster = useVoucherPrintersByBooster(boosterAddress)
  const {
    metaBooster: { payRate },
    loading: metaLoading,
  } = useMetaBooster(boosterAddress)
  const getDecimals = useGetMintDecimals()
  const { buy, loading } = useBuy()
  const nftDiscount = nftAddresses.length * ONE_NFT_DISCOUNT
  const estimatedReceive = useEstimatedReceive({
    boosterAddress,
    amount,
    discount: payRate[lockDay] + nftDiscount,
  })

  const removeNFT = (nftAddress: string) => {
    const filteredNFT = [...nftAddresses].filter(
      (address) => address !== nftAddress,
    )
    return setNFTAddresses(filteredNFT)
  }

  const onBuy = async () => {
    const askDecimal = await getDecimals({ mintAddress: askMint.toBase58() })
    const lockDayValue = LOCK_TIME_DAY[lockDay]
    await buy({
      retailer: boosterAddress,
      askAmount: utilsBN.decimalize(amount, askDecimal || 0),
      lockTime: new BN(lockDayValue * ONE_DAY),
      bidAmount: estimatedReceive,
      appliedNFTs: nftAddresses,
      discount: payRate[lockDay] + nftDiscount,
    })
    onClose()
  }

  const selectDefaultLockDay = useCallback(() => {
    const lockDays = Object.keys(payRate)
    let defaultLockDay = ''
    for (const day of lockDays) {
      if (!payRate[day]) continue
      defaultLockDay = day
      break
    }
    return setLockDay(defaultLockDay)
  }, [payRate])

  const onSwitch = (isBoost: boolean) => {
    if (!isBoost) setNFTAddresses([])

    return setUseBoost(isBoost)
  }

  useEffect(() => {
    selectDefaultLockDay()
  }, [selectDefaultLockDay])

  return (
    <Row justify="space-between" gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Text>
          Token Buy-back offering:{' '}
          <Typography.Text type="secondary">
            Selling your LP tokens with juicy profit. No fee, no slippage. The
            token will be unlocked after the selected period.
          </Typography.Text>
        </Typography.Text>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Row>
              <Col flex="auto">
                <Typography.Text>You Sell</Typography.Text>
              </Col>
              <Col>
                <Typography.Text type="secondary" className="caption">
                  Available:{' '}
                  {util.numeric(mintInfo.balance).format('0,0.[00]a')}{' '}
                  <MintSymbol mintAddress={askMint} />
                </Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <InputNumberCard
              value={amount}
              onValue={(val) => setAmount(val || 0)}
              prefix={<MintSymbol mintAddress={askMint} />}
              max={Number(mintInfo.balance)}
              suffix={
                <Col>
                  <Button
                    type="text"
                    size="small"
                    style={{ background: 'none' }}
                    onClick={() => setAmount(Number(mintInfo.balance))}
                  >
                    MAX
                  </Button>
                </Col>
              }
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Space align="center" size={8}>
              <Typography.Text>Lock time</Typography.Text>
              <Tooltip
                placement="right"
                title={
                  <Typography.Text style={{ color: '#E9E9EB' }}>
                    For each lock time, there will be a corresponding Buy-back
                    rate, you will receive tokens after the selected lock time.
                  </Typography.Text>
                }
              >
                <IonIcon name="information-circle-outline" />
              </Tooltip>
            </Space>
          </Col>
          <Col span={24}>
            <Spin spinning={metaLoading} size="small">
              <Radio.Group
                size="middle"
                onChange={(e) => setLockDay(e.target.value)}
                style={{ width: '100%' }}
                value={lockDay}
              >
                <Row gutter={[12, 12]} justify="center">
                  {Object.keys(payRate).map((days) => {
                    const isNone = days === 'No lock time'
                    return (
                      <Col xs={12} md={8} key={days}>
                        <Radio.Button
                          disabled={!payRate[days]}
                          style={{
                            width: '100%',
                            textAlign: 'center',
                          }}
                          value={days}
                        >
                          {isNone ? 'None' : days}
                        </Radio.Button>
                      </Col>
                    )
                  })}
                </Row>
              </Radio.Group>
            </Spin>
          </Col>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Space size={8}>
              <Typography.Text>Boost</Typography.Text>
              <Switch
                disabled={!voucherPrintersByBooster.length}
                size="small"
                checked={useBoost}
                onChange={onSwitch}
              />
            </Space>
          </Col>
        </Row>
      </Col>
      {useBoost && (
        <Col span={24}>
          <NftUpload
            onSelectNFT={setNFTAddresses}
            boosterAddress={boosterAddress}
            selectedNFTs={nftAddresses}
            removeNFT={removeNFT}
          />
        </Col>
      )}
      <Col span={24}>
        <EstimatedInfo
          estimatedReceive={estimatedReceive}
          boosterAddress={boosterAddress}
          discount={payRate[lockDay]}
          nftDiscount={nftDiscount}
        />
      </Col>
      <Col span={24}>
        <Checkbox
          checked={isAgree}
          onChange={(e) => setIsAgree(e.target.checked)}
        >
          I have read and agree with this transaction
        </Checkbox>
      </Col>
      <Col span={24}>
        <Button
          size="large"
          type="primary"
          onClick={onBuy}
          loading={loading}
          disabled={!isAgree || !amount || !estimatedReceive}
          block
        >
          {!amount ? 'Enter an amount' : 'Buy'}
        </Button>
      </Col>
    </Row>
  )
}

export default ModalContent
