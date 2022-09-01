import { useTranslation } from 'react-i18next'
import { ContactUs as ContactUsItems } from '@root/constants'
import { useNavigate } from 'react-router'

const ContactUs = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const openService = (item: any) => {
    // navigate('/terms_conditions')
    navigate(item.path)
    // if (item === 'terms & conditions') {
    //   navigate('/terms_conditions')
    // }
  }

  return (
    <div className="App">
      {ContactUsItems.map((item, index) => (
        <div
          className="page-link h-4"
          key={index}
          onClick={() => openService(item)}
        >
          {t(item.title)}
        </div>
      ))}
    </div>
  )
}

export default ContactUs
