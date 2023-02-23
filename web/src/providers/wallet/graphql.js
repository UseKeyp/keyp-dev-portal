export const TRANSFER_ERC721_MUTATION = gql`
  mutation transferTokens(
    $tokenAddress: String!
    $tokenId: Int!
    $toAddress: String!
    $network: String!
  ) {
    transferTokens(
      tokenAddress: $tokenAddress
      tokenId: $tokenId
      toAddress: $toAddress
      network: $network
    ) {
      status
      hash
    }
  }
`
export const TRANSFER_ERC20_MUTATION = gql`
  mutation transferTokens(
    $tokenAddress: String!
    $amount: String!
    $toAddress: String!
    $network: String!
  ) {
    transferTokens(
      tokenAddress: $tokenAddress
      amount: $amount
      toAddress: $toAddress
      network: $network
    ) {
      status
      hash
    }
  }
`
