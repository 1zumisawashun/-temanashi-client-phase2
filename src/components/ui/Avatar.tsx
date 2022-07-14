import styled from '@emotion/styled'

const AvatarWrapper = styled('div')<{ size: string }>`
  border-radius: 50%;
  display: inline-block;
  margin: 0 10px;
  height: ${(p) => {
    if (p.size === 'small') return 40
    if (p.size === 'medium') return 50
    if (p.size === 'large') return 60
    return 0
  }}px;
  overflow: hidden;
  width: ${(p) => {
    if (p.size === 'small') return 40
    if (p.size === 'medium') return 50
    if (p.size === 'large') return 60
    return 0
  }}px;
`
const AvatarImage = styled('img')`
  height: 100%;
  width: 100%;
`

interface AvatarProps {
  src: string
  size?: 'small' | 'medium' | 'large'
}

export const Avatar: React.VFC<AvatarProps> = ({ src, size = 'small' }) => {
  return src ? (
    <AvatarWrapper size={size}>
      <AvatarImage src={src} />
    </AvatarWrapper>
  ) : (
    <AvatarWrapper size={size} />
  )
}
