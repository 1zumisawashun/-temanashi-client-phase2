import {
  ScrollPosition,
  LazyLoadImage,
  trackWindowScroll
} from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface ImageProp {
  src: string
  scrollPosition: ScrollPosition
  className?: string
}

/**
 * 遅延ロード画像のレイアウトを調整するにはclassNameを親コンポーネントから流す必要あり
 * 下記を参考にしている（親からレイアウトを渡す系で使えそう）
 * https://emotion.sh/docs/@emotion/css
 */
const Image: React.VFC<ImageProp> = ({ src, scrollPosition, className }) => {
  return (
    <LazyLoadImage
      src={src}
      className={className || 'image'}
      scrollPosition={scrollPosition}
    />
  )
}

export default trackWindowScroll(Image)
