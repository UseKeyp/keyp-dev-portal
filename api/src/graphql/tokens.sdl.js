export const schema = gql`
  type TransferResponse {
    status: TransferStatus!
    hash: String!
  }
  transferTokens(
    tokenAddress: String!
    tokenId: Int
    amount: String
    toAddress: String!
    network: String!
  ): TransferResponse! @requireAuth
`


