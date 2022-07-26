import { useCallback, useEffect } from 'react'

import { Ipfs } from 'senUse/ipfs'

const ColumnCreatedAt = ({ metadata }: { metadata: number[] }) => {
  const fetchCreatedAt = useCallback(async () => {
    const data = await Ipfs.methods.booster.get(metadata)
    console.log(data.payRate, 'data')
  }, [metadata])

  useEffect(() => {
    fetchCreatedAt()
  }, [fetchCreatedAt])

  return <div>22/12/2022</div>
}

export default ColumnCreatedAt
