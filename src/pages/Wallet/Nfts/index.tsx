import SearchBar from '@components/SearchBar'
import { NftCardData as NftItems } from '@root/constants'
import NftCard from '../../../components/Card/NftCard'

const Nfts = () => {
  const handleSearch = (value: string | undefined) => {
    console.log('searchKeys---', value)
  }

  return (
    <>
      <SearchBar onEdit={handleSearch} onClose={() => console.log('')} />
      <div className="fixed-content dlg-content border-top">
        <div className="nft-line">
          <div className="nft-column">
            {NftItems.map((item, index) => {
              return (
                index % 2 === 0 && (
                  <NftCard nft={item} isWalletNavigate={true} key={index} />
                )
              )
            })}
          </div>
          <div className="nft-column">
            {NftItems.map((item, index) => {
              return (
                index % 2 === 1 && (
                  <NftCard nft={item} isWalletNavigate={true} key={index} />
                )
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Nfts
