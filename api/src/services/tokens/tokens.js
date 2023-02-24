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
  const client = await keyp.transferErc721({
    toAddress,
    tokenAddress,
    network,
    tokenId,
  })
  return client
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
  const client = await keyp.transferErc20({
    toAddress,
    tokenAddress,
    network,
    amount,
  })
  return client

}

// export const transferTokens = async ({
//   toAddress,
//   fromAddress,
//   tokenType,
//   tokenAddress,
//   amount,
//   network,
// }) => {
//   const user = await db.user.findUnique({
//     where: { id: context.currentUser.id },
//     select: { accessToken: true },
//   })
//   const keyp = new KeypManager({
//     clientId: KEYP_CLIENT_ID,
//     accessToken: user.accessToken,
//   })
//   if (tokenType === 'ERC721') {
//     const client = await keyp.transferErc721({
//       toAddress,
//       network,
//       tokenAddress,
//     })
//     return client
//   } else if (tokenType === 'ERC20') {
//     const client = await keyp.transferErc20({
//       toAddress,
//       fromAddress,
//       amount,
//       network,
//     })
//     return client
//   }
// }
