import { useCallback, useEffect } from 'react'
import { IPFS } from '@sen-use/web3'

import { TOKEN } from 'constant'

const ColumnCreatedAt = ({ metadata }: { metadata: number[] }) => {
  const fetchCreatedAt = useCallback(async () => {
    const ipfs = new IPFS(TOKEN)
    const data = await ipfs.get(metadata)
    console.log(data, 'data')
  }, [metadata])

  useEffect(() => {
    fetchCreatedAt()
  }, [fetchCreatedAt])

  return <div>22/12/2022</div>
}

export default ColumnCreatedAt
