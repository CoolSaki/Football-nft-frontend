import { useTranslation } from 'react-i18next'
import testImg from '@assets/images/nfts/3-min.png'
import SubmitButton from '@components/SubmitButton'
import { AppLayout } from '@components/index'
import '@assets/css/pages/NftGalleryDetail.css'
import AttrCard from '@components/Card/AttrCard'
import ClaimCard from '@components/Card/ClaimCard'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const NftGalleryDetail = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleLanch = () => {
    navigate('')
  }

  return (
    <AppLayout headerClass="home">
      <div className="nft-gallerydetail">
        <div className="nft-gallerydetail-title h-2">MY NFT Gallery</div>
        <img src={testImg} className="nft-gallerydetail-img" />
        <div className="nft-gallerdetail-itemDescription h-5">
          This Nft has status Draft
        </div>
        <SubmitButton
          className="nft-gallerydetail-btn"
          title="Make Public Visible"
          onPress={handleLanch}
        />
        <Grid container>
          <Grid item md={6} xs={6} className="nft-gallerydetail-item">
            <AttrCard title="Header" desc="Orange Hot" />
          </Grid>
          <Grid item md={6} xs={6} className="nft-gallerydetail-item">
            <AttrCard title="Header" desc="Orange Hot" />
          </Grid>
          <Grid item md={6} xs={6} className="nft-gallerydetail-item">
            <AttrCard title="Header" desc="Orange Hot" />
          </Grid>
          <Grid item md={6} xs={6} className="nft-gallerydetail-item">
            <AttrCard title="Header" desc="Orange Hot" />
          </Grid>
        </Grid>
        <ClaimCard
          title="Match warm shoes"
          desc="The Owner of this NFT gets the right to redeem the NFT against a pair of match worn shoes by the issuer. Shoes worn in the game PSG vs. Marseille on the 15.03.2022."
        />
      </div>
    </AppLayout>
  )
}

export default NftGalleryDetail
