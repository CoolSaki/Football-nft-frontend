import TeamFaces from '@assets/images/team'
import { IPlayerCard, INftCard, stakingNFTs, ITutorialCard } from '@root/types'
export const MOBILE_MAX_WIDTH = 480
export const TABULET_MAX_WIDTH = 992
export const CONTACT_PHONE = '014-3456244'
export const CONTACT_EMAIL = 'hello@mecarreira.co.il'
const jwtToken = localStorage.getItem('accessToken')

export const API_CONSTANTS = {
  HOST_URL: process.env.REACT_APP_HOST_URL,
  MOCK_URL: process.env.REACT_APP_MOCK_URL,
  headers: {
    // 'Content-Type': 'application/json',
    // Accept: 'application/json',
    Authorization: `Bearer ${jwtToken}`,
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
}

export const PLAYER_STATUS = {
  VERIFIED: 2,
  COMINGSOON: 3,
  ISSUED: 4,
}

export const serverErrorCodes = [500, 501, 502, 503, 504, 505]

export const unAuthorizedErrorCode = 401
export const RECAPTCHA_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
export const INSTAGRAM_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

export const PRIVATE_KEY = `
    -----BEGIN RSA PRIVATE KEY-----
    MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
    WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
    aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
    AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
    xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
    m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
    8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
    z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
    rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
    V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
    aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
    psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
    uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876
    -----END RSA PRIVATE KEY-----`
export const PUBLIC_KEY = `
    -----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
    FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
    xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
    gwQco1KRMDSmXSMkDwIDAQAB
    -----END PUBLIC KEY-----`

export const Faq = [
  {
    question: 'what is a player coin',
    answer: ['erc-20 compatible cryptocurrency'],
  },
  {
    question: 'how is the price of a player coin calculated',
    answer: ['with every purchase price increases', 'if you buy 100'],
  },
  {
    question: 'why i want to buy player coins',
    answer: ['player coins give you exclusive access'],
  },
  {
    question: 'what is staking',
    answer: ['staking is process of protocol'],
  },
  {
    question: 'is that player getting my money',
    answer: ['player not getting money'],
  },
  {
    question: 'who can issue a player coin',
    answer: ['any footballer can issue player coin'],
  },
  {
    question: 'what is the role of meCarreira',
    answer: [
      'meCarreira is technology provider',
      'meCarreira is steward of protocol',
    ],
  },
  {
    question: 'i dont have cryptocurrency',
    // answer:
    //   'This is no problem. You can buy Player Coins directly with Credit Card through our partner wert.io. You just enter your card, the amount you want to spend and you will receive the player coins in your wallet. It is that easy.',
    answer: ['you can buy with credit card', 'you can buy with polygon'],
  },
  {
    question: 'is crypto stored on meCarreira',
    answer: ['protocol is decentral'],
  },
  {
    question: 'what is best wallet',
    // answer:
    //   'We suggest to use Metamask as its very simple. On your mobile, it acts as a browser with integrated wallet where you at any times control the private key. For more information on how to get Metamask and how to set it up, see How to Install Metamask for MeCarreira',
    answer: ['we suggest metamask', 'see how to install meCarreira'],
  },
]

// export const PlayerCardData: IPlayerCard[] = [
export const PlayerCardData: any[] = [
  {
    name: 'Alessandro Del Piero',
    ethPrice: 1.99,
    price: 6186,
    time: '06:03:23:42',
    img: require('@assets/images/players/alessandro_del_piero.png'),
    profileLink: 'player/1',
    changedPrice: '+20%',
    coinIssued: 168.425,
    holders: 48789,
  },
  {
    name: 'Diego Maradona',
    ethPrice: 1.99,
    price: 6186,
    time: '06:03:23:42',
    img: require('@assets/images/players/diego_maradona.png'),
    profileLink: 'player/2',
    changedPrice: '+20%',
    coinIssued: 1168.425,
    holders: 48789,
  },
  {
    name: 'Gianluigi Buffon',
    ethPrice: 1.99,
    price: 6186,
    time: '06:03:23:42',
    img: require('@assets/images/players/gianluigi_buffon.png'),
    profileLink: 'player/3',
    changedPrice: '+20%',
    coinIssued: 1682.425,
    holders: 48789,
  },
  {
    name: 'Granit Xhaka',
    ethPrice: 1.99,
    price: 6186,
    time: '06:03:23:42',
    img: require('@assets/images/players/granit_xhaka.png'),
    profileLink: 'player/4',
    changedPrice: '+20%',
    coinIssued: 16812.425,
    holders: 48789,
  },
  {
    name: 'Kylian Mbappe',
    ethPrice: 1.99,
    price: 6186,
    time: '06:03:23:42',
    img: require('@assets/images/players/killian_mbappe.png'),
    profileLink: 'player/5',
    changedPrice: '+20%',
    coinIssued: 168.425,
    holders: 48789,
  },
  {
    name: 'Lorenzo Insigne',
    ethPrice: 1.99,
    price: 6186,
    time: '06:03:23:42',
    img: require('@assets/images/players/lorenzo_insigne.png'),
    profileLink: 'player/5',
    changedPrice: '+20%',
    coinIssued: 168.425,
    holders: 48789,
  },
  {
    name: 'Mohammed Salah',
    ethPrice: 1.99,
    price: 6186,
    time: '06:03:23:42',
    img: require('@assets/images/players/mohammed_salah.png'),
    profileLink: 'player/5',
    changedPrice: '+20%',
    coinIssued: 168.425,
    holders: 48789,
  },
  {
    name: 'Neymar da Silva Santos Júnior',
    ethPrice: 1.99,
    price: 6186,
    time: '06:03:23:42',
    img: require('@assets/images/players/neymar_jr.png'),
    profileLink: 'player/5',
    changedPrice: '+20%',
    coinIssued: 168.425,
    holders: 48789,
  },
  {
    name: 'Ralf Rangnick',
    ethPrice: 1.99,
    price: 6186,
    time: '06:03:23:42',
    img: require('@assets/images/players/ralf_rangnick.png'),
    profileLink: 'player/5',
    changedPrice: '+20%',
    coinIssued: 168.425,
    holders: 48789,
  },
  {
    name: 'Robert Lewandowski',
    ethPrice: 1.99,
    price: 6186,
    time: '06:03:23:42',
    img: require('@assets/images/players/robert_lewandowski.png'),
    profileLink: 'player/5',
    changedPrice: '+20%',
    coinIssued: 168.425,
    holders: 48789,
  },
]

export const DummyCardData: any = {
  name: 'Coming soon',
  ethPrice: 0,
  price: 0,
  time: '06:03:23:42',
  img: require('@assets/images/players/dummy.png'),
  profileLink: 'player/0',
  changedPrice: '0%',
  coinIssued: 0,
  holders: 0,
}

export const TutorialData: ITutorialCard[] = [
  {
    img: '/tutorial.png',
    title: 'Vel cursus lorem mattis in arcu, habitant netus vestibulum diam?',
    desc: 'Ipsum ornare porta morbi velit eu, lectus. Aliquet quam sed dictum viverra. Sit vel suscipit quam in et aliquam nibh. Orci tellus curabitur ut vel nisi scelerisque odio fames non.',
  },
  {
    img: '/tutorial.png',
    title: 'Vel cursus lorem mattis in arcu, habitant netus vestibulum diam?',
    desc: 'Ipsum ornare porta morbi velit eu, lectus. Aliquet quam sed dictum viverra. Sit vel suscipit quam in et aliquam nibh. Orci tellus curabitur ut vel nisi scelerisque odio fames non.',
  },
  {
    img: '/tutorial.png',
    title: 'Vel cursus lorem mattis in arcu, habitant netus vestibulum diam?',
    desc: 'Ipsum ornare porta morbi velit eu, lectus. Aliquet quam sed dictum viverra. Sit vel suscipit quam in et aliquam nibh. Orci tellus curabitur ut vel nisi scelerisque odio fames non.',
  },
  {
    img: '/tutorial.png',
    title: 'Vel cursus lorem mattis in arcu, habitant netus vestibulum diam?',
    desc: 'Ipsum ornare porta morbi velit eu, lectus. Aliquet quam sed dictum viverra. Sit vel suscipit quam in et aliquam nibh. Orci tellus curabitur ut vel nisi scelerisque odio fames non.',
  },
  {
    img: '/tutorial.png',
    title: 'Vel cursus lorem mattis in arcu, habitant netus vestibulum diam?',
    desc: 'Ipsum ornare porta morbi velit eu, lectus. Aliquet quam sed dictum viverra. Sit vel suscipit quam in et aliquam nibh. Orci tellus curabitur ut vel nisi scelerisque odio fames non.',
  },
]

export const NftCardData: INftCard[] = [
  {
    name: 'David Villa Sanchez',
    title: 'Football Jersey',
    number: 351,
    owner: '0x234234235435345sdfers79834sdfsdfsd',
    img: require('@assets/images/nfts/1-min.png'),
    mintDate: '16.02.2022',
    question: 'what colour lamborghini should i buy next?',
  },
  {
    name: 'Joe Cheeo Sanchez',
    title: 'Football Jersey',
    number: 3551,
    owner: '0x234234235435345sdfers79834sdfsdfsd',
    img: require('@assets/images/nfts/2-min.png'),
    mintDate: '16.02.2022',
    question: 'what is my theme song?',
  },
  {
    name: 'Joe Cheeo Sanchez',
    title: 'Football Jersey',
    number: 3551,
    owner: '0x234234235435345sdfers79834sdfsdfsd',
    img: require('@assets/images/nfts/3-min.png'),
    mintDate: '16.02.2022',
    question: 'what is my favourite comedian?',
  },
  {
    name: 'Joe Cheeo Sanchez',
    title: 'Football Jersey',
    number: 3551,
    owner: '0x234234235435345sdfers79834sdfsdfsd',
    img: require('@assets/images/nfts/4-min.png'),
    mintDate: '16.02.2022',
    question: 'what is my pet name?',
  },
  {
    name: 'Joe Cheeo Sanchez',
    title: 'Football Jersey',
    number: 3551,
    owner: '0x234234235435345sdfers79834sdfsdfsd',
    img: require('@assets/images/nfts/5-min.png'),
    mintDate: '16.02.2022',
    question: 'what is my latest record ?',
  },
  {
    name: 'Joe Cheeo Sanchez',
    title: 'Football Jersey',
    number: 3551,
    owner: '0x234234235435345sdfers79834sdfsdfsd',
    img: require('@assets/images/nfts/2-min.png'),
    mintDate: '16.02.2022',
    question: 'what is my jersey number ?',
  },
  {
    name: 'Joe Cheeo Sanchez',
    title: 'Football Jersey',
    number: 3551,
    owner: '0x234234235435345sdfers79834sdfsdfsd',
    img: require('@assets/images/nfts/3-min.png'),
    mintDate: '16.02.2022',
    question: 'what is my latest kick ?',
  },
]

export const NftPlayerPriceData = [
  {
    id: 1,
    label: 'Estimated price per coin',
    value: '0.02147898 MATIC',
  },
  {
    id: 2,
    label: 'Total estimated',
    value: '2.2214 MATIC',
  },
]

export const Notifications = [
  {
    title: 'New Voting Request',
    content:
      'David Villa Sanchez is requesting your vote! Visit profile and vote now',
    date: '2022-03-07 14:34',
    url: '#',
  },
  {
    title: 'New Voting Request',
    content:
      'David Villa Sanchez is requesting your vote! Visit profile and vote now',
    date: '2022-03-07 14:34',
    url: '#',
  },
  {
    title: 'New Voting Request',
    content:
      'David Villa Sanchez is requesting your vote! Visit profile and vote now',
    date: '2022-03-07 14:34',
    url: '#',
  },
]

export const NotificationList = [
  {
    title: 'Notification 1',
  },
  {
    title: 'Notification 2',
  },
  {
    title: 'Notification 3',
  },
]

export const MenuItems = [
  {
    title: 'language',
    url: 'language',
  },
  {
    title: 'launch your own player coin',
    url: 'player-dashboard',
  },
  {
    title: 'change password',
    url: 'accounts/changePassword',
  },
  {
    title: 'ongoing subscriptions',
    url: 'all-players',
  },
  {
    title: 'latest created NFT’s',
    url: 'nfts',
  },
]

export const ContactUs = [
  {
    id: 1,
    title: 'about us',
    path: '/about-us',
  },
  {
    id: 2,
    title: 'team',
    path: '/our-team',
  },
  {
    id: 3,
    title: 'careers',
    path: '/careers',
  },
  {
    id: 4,
    title: 'contact us',
    path: '/contact-us',
  },
  {
    id: 5,
    title: 'privacy',
    path: '/privacy-policy',
  },
  {
    id: 6,
    title: 'disclaimer',
    path: '/disclaimer',
  },
  {
    id: 7,
    title: 'terms & conditions',
    path: '/terms-conditions',
  },
]

export const SocialGroup = [
  {
    social: require('@assets/icons/icon/twitter.svg'),
  },
  {
    social: require('@assets/icons/icon/discord.svg'),
  },
  {
    social: require('@assets/icons/icon/Instagram.svg'),
  },
  {
    social: require('@assets/icons/icon/youtube.svg'),
  },
]

export const Languages = [
  {
    name: 'English',
    symbol: 'en',
  },
  {
    name: '中文',
    symbol: 'zh',
  },
  {
    name: 'Français',
    symbol: 'fr',
  },
  {
    name: 'Deutsch',
    symbol: 'de',
  },
  {
    name: 'Português',
    symbol: 'pt',
  },
  {
    name: 'Italiano',
    symbol: 'it',
  },
  {
    name: 'Polski',
    symbol: 'ps',
  },
  {
    name: 'Español',
    symbol: 'es',
  },
]

export const SubLanguages = [
  {
    name: 'English',
    symbol: 'en',
  },
  {
    name: 'Deutsch',
    symbol: 'de',
  },
  {
    name: 'Português',
    symbol: 'pt',
  },
]

export const DemoPlayers = [
  {
    id: 3,
    name: 'Michael Sample',
    symbol: 'en',
    nfts: [
      {
        id: 31,
        isWin: false,
        playerId: 3,
        detailpageurl: 'michael-sample',
        title: 'Michael Jersey',
        title_url: 'michael-jersey',
        name: 'Michael Sample',
        number: 351,
        owner: '0x234234235435345sdfers79834sdfsdfsd',
        img: require('@assets/images/nfts/3-min.png'),
        mintDate: '16.02.2022',
      },
      {
        id: 32,
        isWin: true,
        playerId: 3,
        title: 'Michael Kicks',
        detailpageurl: 'michael-sample',
        title_url: 'michael-kicks',
        name: 'Michael Sample',
        number: 352,
        owner: '0x234234235435345sdfers79834sdfsdfsd',
        img: require('@assets/images/nfts/4-min.png'),
        mintDate: '16.02.2022',
      },
      {
        id: 33,
        isWin: true,
        playerId: 3,
        detailpageurl: 'michael-sample',
        title_url: 'michael-boots',
        title: 'Michael Boots',
        name: 'Michael Sample',
        number: 353,
        owner: '0x234234235435345sdfers79834sdfsdfsd',
        img: require('@assets/images/nfts/neymar5.jpg'),
        mintDate: '16.02.2022',
      },
    ],
  },
  {
    id: 4,
    name: 'John Demo',
    symbol: 'de',
    nfts: [
      {
        id: 41,
        playerId: 4,
        isWin: true,
        title: 'John Jersey',
        title_url: 'john-jersey',
        detailpageurl: 'john-demo',
        name: 'John Demo',
        number: 451,
        owner: '0x234234235435345sdfers79834sdfsdfsd',
        img: require('@assets/images/nfts/1-min.png'),
        mintDate: '16.02.2022',
      },
      {
        id: 42,
        playerId: 4,
        isWin: false,
        title_url: 'john-kicks',
        title: 'John Kicks',
        detailpageurl: 'john-demo',
        name: 'John Demo',
        number: 452,
        owner: '0x234234235435345sdfers79834sdfsdfsd',
        img: require('@assets/images/nfts/2-min.png'),
        mintDate: '16.02.2022',
      },
      {
        id: 43,
        playerId: 4,
        isWin: false,
        title: 'John Boots',
        title_url: 'john-boots',
        detailpageurl: 'john-demo',
        name: 'John Demo',
        number: 453,
        owner: '0x234234235435345sdfers79834sdfsdfsd',
        img: require('@assets/images/nfts/neymar5_alt2.jpg'),
        mintDate: '16.02.2022',
      },
    ],
  },
]

export const Nfts: stakingNFTs[] = [
  {
    name: 'Manuel Akanji',
    image: require('@assets/images/nfts/1-min.png'),
    amount: 1.254,
    price: 4652,
    stakingAmount: 0,
  },
  {
    name: 'Neymar da Silva Santos',
    image: require('@assets/images/nfts/3-min.png'),
    amount: 1.254,
    price: 4652,
    stakingAmount: 0.8,
  },
  {
    name: 'Mohammed Salah',
    image: require('@assets/images/nfts/4-min.png'),
    amount: 1.254,
    price: 4652,
    stakingAmount: 10,
  },
  {
    name: 'Manuel Akanji',
    image: require('@assets/images/nfts/5-min.png'),
    amount: 1.254,
    price: 4652,
    stakingAmount: 0.07,
  },
]

export const monthSet = [
  {
    id: 1,
    value: '0',
    title: 'Jan',
  },
  {
    id: 2,
    value: '1',
    title: 'Feb',
  },
  {
    id: 3,
    value: '2',
    title: 'Mar',
  },
  {
    id: 4,
    value: '3',
    title: 'Apr',
  },
  {
    id: 5,
    value: '4',
    title: 'May',
  },
  {
    id: 6,
    value: '5',
    title: 'Jun',
  },
  {
    id: 7,
    value: '6',
    title: 'Jul',
  },
  {
    id: 8,
    value: '7',
    title: 'Aug',
  },
  {
    id: 9,
    value: '8',
    title: 'Sep',
  },
  {
    id: 10,
    value: '9',
    title: 'Oct',
  },
  {
    id: 11,
    value: '10',
    title: 'Nov',
  },
  {
    id: 11,
    value: '11',
    title: 'Dec',
  },
]

export const TestNations = [
  {
    countryid: 218,
    iso2: 'TR',
    countryname: 'TURKEY',
    countrynamenice: 'Turkey',
    iso3: 'TUR',
    numcode: 792,
    phonecode: 90,
    continent: 'Europe',
    timezoneutc_from: '2.0',
    timezoneutc_to: null,
  },
  {
    countryid: 219,
    iso2: 'TM',
    countryname: 'TURKMENISTAN',
    countrynamenice: 'Turkmenistan',
    iso3: 'TKM',
    numcode: 795,
    phonecode: 7370,
    continent: 'CIS',
    timezoneutc_from: null,
    timezoneutc_to: null,
  },
  {
    countryid: 220,
    iso2: 'TC',
    countryname: 'TURKS AND CAICOS ISLANDS',
    countrynamenice: 'Turks and Caicos Islands',
    iso3: 'TCA',
    numcode: 796,
    phonecode: 1649,
    continent: null,
    timezoneutc_from: null,
    timezoneutc_to: null,
  },
]

export const TeamMembers = [
  {
    id: 1,
    fullName: 'Heinz Ernst',
    img: TeamFaces.heinz,
    companyTitle: 'chief executive officer',
    description: 'heinz ended his career',
  },
  {
    id: 2,
    fullName: 'Alessandro Pecorelli',
    img: TeamFaces.alessandro,
    companyTitle: 'chief technical officer',
    description: 'alex been programming since childhood',
  },
  {
    id: 3,
    fullName: 'Prof. Marco Casanova, lic.rer.pol',
    img: TeamFaces.marco,
    companyTitle: 'lic.rer.pol (partnerships & communication)',
    description: 'marco held executive positions',
  },
  {
    id: 4,
    fullName: 'Thomas Temperli',
    img: TeamFaces.thomas,
    companyTitle: 'head of international development',
    description: 'thomas is a pioneer',
  },
  {
    id: 5,
    fullName: 'Matthias Walter, lic.rer.pol',
    img: TeamFaces.matthias,
    companyTitle: 'head football',
    description: 'mathias held executive',
  },
  {
    id: 6,
    img: TeamFaces.alessandra,
    fullName: 'Alessandra Fausto',
    companyTitle: 'social media',
    description: 'content is king',
  },
  {
    id: 7,
    img: TeamFaces.oliver,
    fullName: 'Dr. Oliver Kaufmann',
    companyTitle: 'legal',
    description: 'oliver has had fairplay',
  },
]

export const SocialUrls = {
  youtube: 'https://www.youtube.com/channel/UCURXmWx148imxbaWPp4-ZcQ',
  instagram: 'https://www.instagram.com/mecarreira',
  twitter: 'https://twitter.com/mecarreiracom',
  tiktok: 'https://www.tiktok.com/@mecarreira',
  discord: 'https://discord.com/channels/@me',
  telegram: 'https://t.me/meCarreira',
}

export const tagManagerArgs = {
  gtmId: 'G-4QQXTKFF6W',
}
