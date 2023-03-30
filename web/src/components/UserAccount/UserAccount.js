export function getStyledUsernameFromCurrentUser(currentUser, sizeVariant) {
  if (!currentUser?.id) {
    return ''
  }
  switch (currentUser.id.split('-')[0].toLowerCase()) {
    case 'discord':
      return (
        <div className={`flex text-[#5865F2] ${sizeVariant || 'text-[12px]'}`}>
          <div>{currentUser?.username}</div>
        </div>
      )
    case 'google':
      return (
        <div className={`flex ${sizeVariant || 'text-[12px]'}`}>
          <div className="text-gray-2000">{currentUser?.username}</div>
        </div>
      )
    case 'chess':
      return (
        <div className={`flex ${sizeVariant || 'text-[12px]'}`}>
          <div className="text-gray-2000">{currentUser?.username}</div>
        </div>
      )
    case 'twitter':
      return (
        <div className={`flex ${sizeVariant || 'text-[12px]'}`}>
          <div className="text-[#1DA1F2]">{currentUser?.username}</div>
        </div>
      )
    case 'twitch':
      return (
        <div className={`flex ${sizeVariant || 'text-[12px]'}`}>
          <div className="text-[#9146FF]">{currentUser?.username}</div>
        </div>
      )
    default:
      return (
        <div className={`flex text-gray-2000 ${sizeVariant || 'text-[12px]'}`}>
          {currentUser?.username}
        </div>
      )
  }
}
