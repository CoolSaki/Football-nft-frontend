import React, { useEffect, useState } from 'react'
import SearchBar from '@components/SearchBar'
import { NftCardData as NftItems } from '@root/constants'
import NftCard from '../../../components/Card/NftCard'
import { useDispatch } from 'react-redux'

const NftList = () => {
  const dispatch = useDispatch()
  const handleSearch = (value: string | undefined) => {
    console.log('searchKeys---', value)
  }

  return (
    <>
      <SearchBar onEdit={handleSearch} onClose={() => console.log('')} />
      <div className="nft-line">
        <div className="nft-column">
          {NftItems.map((item, index) => {
            return index % 2 === 0 && <NftCard nft={item} key={index} />
          })}
        </div>
        <div className="nft-column">
          {NftItems.map((item, index) => {
            return index % 2 === 1 && <NftCard nft={item} key={index} />
          })}
        </div>
      </div>
    </>
  )
}

export default NftList
