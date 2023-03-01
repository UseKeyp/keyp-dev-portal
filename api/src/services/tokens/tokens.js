import { db } from 'src/lib/db'
import KeypManager from 'src/lib/keyp'
const KEYP_CLIENT_ID = 'dev-portal'

export const transferErc721 = async ({
  toAddress,
  tokenAddress,
  network,
  tokenId,
}) => {
  const user = await db.user.findUnique({
    where: { id: context.currentUser.id },
    select: { accessToken: true },
  })
  const keyp = new KeypManager({
    clientId: KEYP_CLIENT_ID,
    accessToken: user.accessToken,
  })
  const response = await keyp.transferErc721({
    toAddress,
    tokenAddress,
    network,
    tokenId,
  })
  return response
}

export const transferErc20 = async ({
  toAddress,
  tokenAddress,
  amount,
  network,
}) => {
  const user = await db.user.findUnique({
    where: { id: context.currentUser.id },
    select: { accessToken: true },
  })
  const keyp = new KeypManager({
    clientId: KEYP_CLIENT_ID,
    accessToken: user.accessToken,
  })
  const response = await keyp.transferErc20({
    toAddress,
    amount,
    network,
    tokenAddress,
  })
  return response
}
