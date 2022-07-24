import { account } from '@senswap/sen-js'
import { DataLoader, util } from '@sentre/senhub'
import configs from 'configs'

const {
  sol: { metaplexNFT },
} = configs

export const notifySuccess = (content: string, txId: string) => {
  return window.notify({
    type: 'success',
    description: `${content} successfully. Click to view details.`,
    onClick: () => window.open(util.explorer(txId), '_blank'),
  })
}

export const notifyError = (er: any) => {
  return window.notify({
    type: 'error',
    description: er.message,
  })
}

export const getMetaData = async (mintAddress: string) => {
  if (!account.isAddress(mintAddress)) {
    return undefined
  }
  try {
    const metadata = await DataLoader.load('getNftMetadata' + mintAddress, () =>
      metaplexNFT.getNftMetadata(mintAddress),
    )

    return metadata
  } catch (error: any) {
    return undefined
  }
}
