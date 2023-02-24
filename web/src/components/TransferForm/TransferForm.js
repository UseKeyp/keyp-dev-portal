import React, { useState } from 'react'

import { useMutation } from '@redwoodjs/web'

import { toast } from '@redwoodjs/web/toast'

import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'
import TextInput from 'src/components/TextInput/TextInput'
import {
  TRANSFER_ERC20_MUTATION,
  TRANSFER_ERC721_MUTATION,
} from 'src/providers/wallet/graphql'

export const TransferForm = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="mt-4 rounded-md border border-gray-800 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-1600">{title}</h2>
        <button
          className="flex items-center justify-center rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <Icon name="arrow_up" height="8" width="14" />
          ) : (
            <Icon name="arrow_down" height="8" width="14" />
          )}
        </button>
      </div>
      {isOpen ? (
        <div className="mt-4">
          <TransferFormFields typeOfToken={title} />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

const TransferFormFields = ({ typeOfToken }) => {
  const [network, setNetwork] = useState('polygon')
  const [tokenAddress, setTokenAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [tokenId, setTokenId] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [transferErc20Loading, setTransferErc20Loading] = useState(false)
  const [transferErc20Error, setTransferErc20Error] = useState('')
  const [transferErc721Loading, setTransferErc721Loading] = useState(false)
  const [transferErc721Error, setTransferErc721Error] = useState('')
  const [transferErc20Mutation] = useMutation(TRANSFER_ERC20_MUTATION)
  const [transferErc721Mutation] = useMutation(TRANSFER_ERC721_MUTATION)

  const transferErc721 = async (args) => {
    try {
      setTransferErc721Loading(true)

      const { error, data } = await transferErc721Mutation({ variables: args })
      if (error) {
        if (error.error.error['code'] === -32000) {
          throw 'Things are a bit congested now, please try again in a few minutes'
        } else {
          throw error
        }
      }
      return data
    } catch (e) {
      toast.error(e?.message)
      setTransferErc721Error(e?.message)
      setTransferErc721Loading(false)
    }
  }
  const transferErc20 = async (args) => {
    try {
      setTransferErc20Loading(true)

      const { error, data } = await transferErc20Mutation({ variables: args })
      if (error) {
        if (error.error.error['code'] === -32000) {
          throw 'Things are a bit congested now, please try again in a few minutes'
        } else {
          throw error
        }
      }
      return data
    } catch (e) {
      toast.error(e?.message)
      setTransferErc20Error(e?.message)
      setTransferErc20Loading(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-y-4">
        <div>
          <div className="pb-2 text-xs font-semibold text-gray-800">
            NETWORK
          </div>
          <select
            className="h-[48px] w-full rounded-lg border border-gray-400 bg-white p-2 placeholder-gray-400"
            name="networks"
            id="networks"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
          >
            {[
              'polygon',
              'mainnet',
              'gnosis',
              'mumbai',
              'goerli',
              'arbitrum',
              'arbitrum-nova',
              'optimism',
            ].map((network) => (
              <option key={network} value={network}>
                {network}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="pb-2 text-xs font-semibold text-gray-800">
            TOKEN ADDRESS
          </div>
          <TextInput
            type="text"
            placeholder="0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
          />
        </div>
        <div>
          {typeOfToken.includes('ERC-721') ? (
            <div>
              <div className="pb-2 text-xs font-semibold text-gray-800">
                TOKEN ID
              </div>
              <TextInput
                type="text"
                placeholder="11"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
              />
            </div>
          ) : (
            <div>
              <div className="pb-2 text-xs font-semibold text-gray-800">
                AMOUNT
              </div>
              <TextInput
                type="text"
                placeholder="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
              />
            </div>
          )}
        </div>
        <div>
          <div className="pb-2 text-xs font-semibold text-gray-800">
            RECIPIENT ADDRESS
          </div>
          <TextInput
            type="text"
            placeholder="0x0000000000000000000000000000000000000000"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
          />
        </div>
        <Button
          fluid={true}
          variant="green"
          onClick={() => {
            if (typeOfToken.includes('ERC-721')) {
              if (network && tokenAddress && tokenId && toAddress) {
                transferErc721({
                  tokenAddress,
                  tokenId,
                  toAddress,
                  network,
                }).catch((e) => {
                  setTransferErc721Error(e?.message)
                })
              }
            } else if (typeOfToken.includes('ERC-20')) {
              if (network && tokenAddress && amount && toAddress) {
                transferErc20({
                  tokenAddress,
                  amount,
                  toAddress,
                  network,
                }).catch((e) => {
                  setTransferErc20Error(e?.message)
                })
              }
            } else {
              toast.error('Token type not found')
            }
          }}
          disabled={transferErc20Loading || transferErc721Loading}
        >
          Transfer
        </Button>
      </div>
    </div>
  )
}
