import React, { useState } from 'react'

import { Button, Icon, TextInput } from '@usekeyp/components-soft-ui'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {
  TRANSFER_ERC20_MUTATION,
  TRANSFER_ERC721_MUTATION,
} from 'src/providers/wallet/graphql'
import {
  getExplorerBaseUrlFromName,
  isHexAddress,
  trimAddress,
} from 'src/utils/helpers'

export const TransferForm = ({ title, open }) => {
  const [isOpen, setIsOpen] = useState(open)
  return (
    <div className="mt-4 flex-grow self-start rounded-md border border-gray-800 p-4 sm:p-6">
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
  const [transferSuccess, setTransferSuccess] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')
  const [transactionURL, setTransactionURL] = useState('')

  const onSubmit = async () => {
    if (!isHexAddress(tokenAddress)) {
      toast.error('Token address should be a 40 character hex string')
      return
    } else if (!isHexAddress(toAddress)) {
      toast.error('Recipient address should be a 40 character hex string')
      return
    } else if (!network) {
      toast.error('No network specified')
      return
    }
    if (typeOfToken.includes('ERC-721')) {
      if (!tokenId) {
        toast.error('Invalid token ID')
        return
      }
      setTransferErc721Error('')
      setTransferErc721Loading(true)
      const tokenIdAsInt = parseInt(tokenId)
      let data
      try {
        data = await transferErc721({
          tokenAddress,
          tokenId: tokenIdAsInt,
          toAddress,
          network,
        })
      } catch (e) {
        setTransferErc721Loading(false)
        return
      }
      if (data?.transferErc721?.status === 'SUCCESS') {
        setTransferErc721Loading(false)
        setTransactionHash(trimAddress(data?.transferErc721?.hash))
        setTransactionURL(
          `${getExplorerBaseUrlFromName(network)}tx/${
            data?.transferErc721?.hash
          }`
        )
        setTransferSuccess(true)
      }
      setTransferErc721Loading(false)
    } else if (typeOfToken.includes('ERC-20')) {
      if (!amount) {
        toast.error('Invalid amount to transfer')
        return
      }
      setTransferErc20Error('')
      setTransferErc20Loading(true)
      let data
      try {
        data = await transferErc20({
          tokenAddress,
          amount,
          toAddress,
          network,
        })
      } catch (e) {
        setTransferErc20Loading(false)
        return
      }
      if (data?.transferErc20?.status === 'SUCCESS') {
        setTransferErc20Loading(false)
        setTransactionHash(trimAddress(data?.transferErc20?.hash))
        setTransactionURL(
          `${getExplorerBaseUrlFromName(network)}tx/${
            data?.transferErc20?.hash
          }`
        )
        setTransferSuccess(true)
      }
      setTransferErc20Loading(false)
    } else {
      toast.error('Token type not found')
      setTransferErc20Loading(false)
      setTransferErc721Loading(false)
    }
  }

  const transferErc721 = async (args) => {
    try {
      const { data } = await transferErc721Mutation({ variables: args })
      if (data?.transferErc721?.status === 'FAILED') {
        throw Error(
          data?.transferErc721?.error
            ? data?.transferErc721?.error
            : 'An error occurred'
        )
      }
      return data
    } catch (e) {
      if (e?.message.length > 100) {
        e.message = e.message.substring(0, 100)
      }
      toast.error(e?.message)
      setTransferErc721Error(e?.message)
      setTransferErc721Loading(false)
      return e
    }
  }
  const transferErc20 = async (args) => {
    try {
      const { data } = await transferErc20Mutation({ variables: args })
      if (data?.transferErc20?.status === 'FAILED') {
        throw Error(
          data?.transferErc20?.error
            ? data?.transferErc20?.error
            : 'An error occurred'
        )
      }
      return data
    } catch (e) {
      if (e?.message.length > 100) {
        e.message = e.message.substring(0, 100)
      }
      toast.error(e?.message)
      setTransferErc20Error(e?.message)
      setTransferErc20Loading(false)
      return e
    }
  }

  return (
    <div>
      {transferSuccess ? (
        <div className="flex flex-col">
          <div className="mb-8 flex w-full flex-col items-center gap-y-2 bg-gray-100 pt-4 pb-4 text-center">
            <div className="flex text-[16px] font-bold text-green-1200">
              Transaction Processing
            </div>
            <Icon name="transaction_processing" />
            <a
              target="_blank"
              href={transactionURL}
              className="flex text-[12px] font-light text-blue-1200"
              rel="noreferrer"
            >
              View on Chain Explorer
            </a>
            <div className="flex text-[12px] font-light text-gray-1200">
              {transactionHash}
            </div>
          </div>
          <Button
            fluid={true}
            variant="transparent"
            borderColor="border border-green-1200"
            classNameVariant="hover:bg-green-1200"
            onClick={() => {
              setTransactionHash('')
              setTransactionURL('')
              setTransferSuccess(false)
            }}
          >
            <div className="text-green-1200 group-hover:text-white">
              New Transfer
            </div>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          <div>
            <div className="mb-1 text-sm font-semibold text-gray-800">
              NETWORK
            </div>
            <select
              className="h-[48px] w-full rounded-lg border border-gray-400 bg-white p-2 pl-4 text-sm placeholder-gray-400"
              name="networks"
              id="networks"
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
            >
              {['polygon'].map((network) => (
                <option key={network} value={network}>
                  {network}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-1 text-sm font-semibold text-gray-800">
              TOKEN ADDRESS
            </div>
            <TextInput
              type="text"
              placeholder="0x0000000000000000000000000000000000000000"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
            />
          </div>
          <div>
            {typeOfToken.includes('ERC-721') ? (
              <div>
                <div className="mb-1 text-sm font-semibold text-gray-800">
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
                <div className="mb-1 text-sm font-semibold text-gray-800">
                  AMOUNT
                </div>
                <TextInput
                  type="text"
                  placeholder="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-lg border border-gray-400 p-2 placeholder-gray-400"
                />
              </div>
            )}
          </div>
          <div>
            <div className="mb-1 text-sm font-semibold text-gray-800">
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
            variant={`${
              transferErc20Loading ||
              transferErc721Loading ||
              (typeOfToken === 'ERC-721' && !tokenId) ||
              (typeOfToken === 'ERC-20' && !amount) ||
              !toAddress ||
              !tokenAddress
                ? 'grey'
                : 'green'
            }`}
            onClick={() =>
              onSubmit({ network, tokenAddress, amount, tokenId, toAddress })
            }
            disabled={
              transferErc20Loading ||
              transferErc721Loading ||
              (typeOfToken === 'ERC-721' && !tokenId) ||
              (typeOfToken === 'ERC-20' && !amount) ||
              !toAddress ||
              !tokenAddress
            }
          >
            Transfer
          </Button>
          <div className="text-red-1200 sm:text-center">
            {transferErc20Error || transferErc721Error}
          </div>
        </div>
      )}
    </div>
  )
}
