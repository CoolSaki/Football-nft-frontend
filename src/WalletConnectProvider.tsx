import React, { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Web3Modal, { providers } from 'web3modal'
import { ethers } from 'ethers'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import toast from 'react-hot-toast'
import HotToaster from '@components/HotToaster'
import { useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

type connectStatus = true | false
// Type and component name conflicted
type ConnectContext = {
  connectStatus: connectStatus
  connect: (wallet: string) => void
  disconnect: () => void
  transactionStatus: string
  initialize: () => void
  send: (privateKey: string, receiverAddress: string, amount: string) => void
  sendWithWallet: (receiverAddress: string, amount: string) => void
  getBalance: () => void
}

const POLLING_INTERVAL = 12000
const RPC_URL = 'https://rpc-mainnet.matic.quiknode.pro'

const simpleRpcProvider = new ethers.providers.StaticJsonRpcProvider(RPC_URL)

const connector = new WalletConnect({
  bridge: 'https://bridge.walletconnect.org', // Required
  qrcodeModal: QRCodeModal,
})

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

export const ConnectContext = React.createContext<ConnectContext>(
  {} as ConnectContext,
)

export const WalletConnectProvider: React.FC = ({ children }) => {
  // const [theme, setTheme] = useState<Theme>('light')
  // const toggleTheme = () => {
  //   setTheme(theme === 'light' ? 'dark' : 'light')
  // }
  const [connectStatus, setConnectStatus] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState('init')
  const { t } = useTranslation()

  const context = useWeb3React()

  // wallet connect
  // const providerOptions: any = {
  //   coinbasewallet: {
  //     package: CoinbaseWalletSDK, // Required
  //     options: {
  //       appName: 'Mecarreira', // Required
  //       infuraId: process.env.INFURA_KEY, // Required
  //     },
  //   },
  // }

  // if (!window.ethereum) {
  //   providerOptions['custom-metamask'] = {
  //     display: {
  //       logo: providers.METAMASK.logo,
  //       name: 'Install MetaMask',
  //       description: 'Connect using browser wallet',
  //     },
  //     package: {},
  //     connector: async () => {
  //       window.open('https://metamask.io')
  //       throw new Error('MetaMask not installed')
  //     },
  //   }
  // }

  //Polygon Mainnet Param
  const POLYGON_MAINNET_PARAMS = {
    chainId: '0x89', // 137
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC Token',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mainnet.matic.quiknode.pro'],
    blockExplorerUrls: ['https://polygonscan.com/'],
  }

  // let web3Modal: any
  // if (typeof window !== 'undefined') {
  //   web3Modal = new Web3Modal({
  //     network: 'mainnet', // optional
  //     cacheProvider: true,
  //     providerOptions, // required
  //   })
  // }
  const isWebview = () => {
    if (typeof window === undefined) {
      return false
    }

    const navigator: any = window.navigator

    const standalone = navigator.standalone
    const userAgent = navigator.userAgent.toLowerCase()
    const safari = /safari/.test(userAgent)
    const ios = /iphone|ipod|ipad/.test(userAgent)

    return ios ? !standalone && !safari : userAgent.includes('wv')
  }

  const isMobileDevice = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  }

  const connect = async (wallet: string) => {
    let provider
    let web3Provider
    if (wallet === 'Trust') {
      if (!isMobileDevice()) {
        toast.error(t('trust wallet only works on mobile.'))
        return
      }
      if (isWebview()) {
        const { activate, connector } = context
        activate(
          new WalletConnectConnector({
            rpc: {
              1: 'https://mainnet.infura.io/v3/1c3acca035dd41dfbf400abac71e59a7',
            },
            bridge: 'https://bridge.walletconnect.org',
            qrcode: true,
          }),
          async (error: Error) => {
            // toast.error(wallet + ' ' + t('wallet is not installed.'))
          },
        )
        const { library } = context
        provider = library
        web3Provider = library
        console.log('web3Provider', web3Provider, library)
        localStorage.setItem('wallet', wallet)
      } else {
        window.location.replace(
          'https://link.trustwallet.com/open_url?coin_id=60&url=' +
            window.location.href,
        )
      }
    } else if (wallet === 'WalletConnect') {
      const { activate, connector } = context
      activate(
        new WalletConnectConnector({
          rpc: {
            1: 'https://mainnet.infura.io/v3/1c3acca035dd41dfbf400abac71e59a7',
          },
          bridge: 'https://bridge.walletconnect.org',
          qrcode: true,
        }),
        async (error: Error) => {
          // toast.error(wallet + ' ' + t('wallet is not installed.'))
        },
      )
      const { library } = context
      provider = library
      web3Provider = library
      console.log('web3Provider', web3Provider, library)
      localStorage.setItem('wallet', 'Trust')

      const { account } = context
      if (account) {
        localStorage.setItem('loginInfo', account ?? '')
        console.log('trust wallet address', localStorage.getItem('loginInfo'))
        const balance = await simpleRpcProvider.getBalance(
          localStorage.getItem('loginInfo') ?? '',
        )
        const balanceInEth =
          Math.trunc(
            Number.parseFloat(ethers.utils.formatEther(balance)) * 10 ** 6,
          ) /
          10 ** 6
        console.log(`balance: ${balanceInEth} MATIC`)
        localStorage.setItem('balance', balanceInEth.toString())
        setConnectStatus(true)
      }
    } else {
      provider = window.ethereum?.providers?.find((provider: any) =>
        wallet === 'Metamask'
          ? provider.isMetaMask
          : wallet === 'Coinbase'
          ? provider.isCoinbaseWallet
          : provider.isTrustWallet,
      )
      if (!provider) {
        if (
          (window.ethereum?.isMetaMask && wallet === 'Metamask') ||
          (window.ethereum?.isCoinbaseWallet && wallet === 'Coinbase')
        ) {
          provider = window.ethereum
        }
      }

      if (!isMobileDevice() && (!provider || provider === undefined)) {
        if (wallet === 'Metamask') {
          window.open('https://metamask.io/download/', '_blank')
        } else if (wallet === 'Coinbase') {
          window.open(
            'https://www.coinbase.com/wallet/articles/getting-started-extension',
            '_blank',
          )
        }
        return
      }

      try {
        provider.request({ method: 'eth_requestAccounts' })
      } catch {
        if (wallet === 'Metamask') {
          window.location.replace(
            'https://metamask.app.link/dapp/' + window.location.href,
          )
        } else {
          window.location.replace(
            'https://go.cb-w.com/dapp?cb_url=' + window.location.href,
          )
        }
        return
      }
      if (provider.isCoinBase) console.log('metamask')
      const chainId = await provider.request({ method: 'eth_chainId' })
      const polygonChainId = '0x89'
      console.log(chainId)
      if (chainId === polygonChainId) {
        console.log('Bravo!, you are on the correct network')
      } else {
        console.log('olal, switch to the correct network')
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [POLYGON_MAINNET_PARAMS],
          })
          console.log('You have succefully switched to Polygon Main Network')
        } catch (switchError: any) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            console.log(
              'This network is not available in your metamask, please add it',
            )
          }
          console.log('Failed to switch to the network')
        }
      }
      try {
        web3Provider = new ethers.providers.Web3Provider(provider)

        const signer = web3Provider.getSigner()
        const address = await signer.getAddress()

        localStorage.setItem('loginInfo', address)
        localStorage.setItem('wallet', wallet)

        web3Provider.getBalance(address).then((balance: any) => {
          // convert a currency unit from wei to ether
          const balanceInEth =
            Math.trunc(
              Number.parseFloat(ethers.utils.formatEther(balance)) * 10 ** 6,
            ) /
            10 ** 6
          console.log(`balance: ${balanceInEth} MATIC`)
          localStorage.setItem('balance', balanceInEth.toString())
        })
        setConnectStatus(true)
        toast.success(t('successfully connected!'))
      } catch {
        toast.error(t('Please check if you joined to wallet!'))
      }
    }
  }

  const disconnect = async () => {
    localStorage.removeItem('loginInfo')
    localStorage.removeItem('balance')
    localStorage.removeItem('accessToken')
    setConnectStatus(false)
  }

  const initialize = async () => {
    setTransactionStatus('init')
  }

  const getBalance = async () => {
    const curWallet = localStorage.getItem('wallet')
    if (curWallet === 'Trust' || curWallet === 'WalletConnect') {
      const { account } = context
      if (account) {
        localStorage.setItem('loginInfo', account ?? '')
        console.log('trust wallet address', localStorage.getItem('loginInfo'))
        const balance = await simpleRpcProvider.getBalance(
          localStorage.getItem('loginInfo') ?? '',
        )
        const balanceInEth =
          Math.trunc(
            Number.parseFloat(ethers.utils.formatEther(balance)) * 10 ** 6,
          ) /
          10 ** 6
        console.log(`balance: ${balanceInEth} MATIC`)
        localStorage.setItem('balance', balanceInEth.toString())
      }
    } else {
      let provider = window.ethereum.providers?.find((provider: any) =>
        curWallet === 'Metamask'
          ? provider.isMetaMask
          : curWallet === 'Coinbase'
          ? provider.isCoinbaseWallet
          : provider.isTrustWallet,
      )
      if (!provider) {
        if (
          (window.ethereum.isMetaMask && curWallet === 'Metamask') ||
          (window.ethereum.isCoinbaseWallet && curWallet === 'Coinbase')
        ) {
          provider = window.ethereum
        }
      }
      const web3Provider = new ethers.providers.Web3Provider(provider)
      const signer = web3Provider.getSigner()
      // const address = await signer.getAddress()
      // console.log(address)
      web3Provider
        .getBalance(
          localStorage.getItem('loginInfo') ?? (await signer.getAddress()),
        )
        .then(balance => {
          // convert a currency unit from wei to ether
          const balanceInEth =
            Math.trunc(
              Number.parseFloat(ethers.utils.formatEther(balance)) * 10 ** 6,
            ) /
            10 ** 6
          console.log(`balance: ${balanceInEth} MATIC`)
          localStorage.setItem('balance', balanceInEth.toString())
        })
    }
  }

  const sendWithWallet = async (receiverAddress: string, amount: string) => {
    const curWallet = localStorage.getItem('wallet')
    const provider = window.ethereum.providers.find((provider: any) =>
      curWallet === 'Metamask'
        ? provider.isMetaMask
        : curWallet === 'Coinbase'
        ? provider.isCoinbaseWallet
        : provider.isTrustWallet,
    )
    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    })
    const account = accounts[0]
    const from = localStorage.getItem('loginInfo')
    if (account.toLowerCase() !== from?.toLowerCase()) {
      console.log('Select correct account!!!')
      return
    }

    const params = {
      from: ethers.utils.getAddress(from ? from : ''),
      to: ethers.utils.getAddress(receiverAddress),
      gas: '0x5208', // 21000
      maxFeePerGas: ethers.utils.parseEther('0.000001')._hex,
      value: ethers.utils.parseEther(amount.toString())._hex,
    }

    console.log(params)
    provider
      .request({
        method: 'eth_sendTransaction',
        params: [params],
      })
      .then((txHash: any) => {
        console.log(txHash)
      })
      .catch((error: any) => {
        // If the request fails, the Promise will reject with an error.
        console.log(error)
      })
  }

  const send = async (
    privateKey: string,
    receiverAddress: string,
    amount: string,
  ) => {
    const curWallet = localStorage.getItem('wallet')
    const provider = window.ethereum.providers.find((provider: any) =>
      curWallet === 'Metamask'
        ? provider.isMetaMask
        : curWallet === 'Coinbase'
        ? provider.isCoinbaseWallet
        : provider.isTrustWallet,
    )
    const web3Provider = new ethers.providers.Web3Provider(provider)
    const wallet = new ethers.Wallet(privateKey, web3Provider)
    // const maxFeePerGas = ethers.BigNumber.from(400000000000) // fallback to 400 gwei
    const maxFeePerGas = ethers.utils.parseEther('0.000001')
    // const maxPriorityFeePerGas = ethers.BigNumber.from(400000000000) // fallback to 400 gwei
    const maxPriorityFeePerGas = ethers.utils.parseEther('0.000001')
    const tx = {
      from: wallet.address,
      to: receiverAddress,
      gasLimit: ethers.utils.hexlify(21000),
      maxFeePerGas,
      maxPriorityFeePerGas,
      value: ethers.utils.parseEther(amount.toString()),
    }
    wallet
      .sendTransaction(tx)
      .then(txObj => {
        console.log('txHash', txObj.hash)
        setTransactionStatus('success')
      })
      .catch(ex => {
        console.log('exception', ex)
        setTransactionStatus('fail')
      })
  }

  return (
    <ConnectContext.Provider
      value={
        {
          connectStatus,
          connect,
          disconnect,
          transactionStatus,
          initialize,
          send,
          sendWithWallet,
          getBalance,
        } as ConnectContext
      }
    >
      {children}
      <HotToaster />
    </ConnectContext.Provider>
  )
}
