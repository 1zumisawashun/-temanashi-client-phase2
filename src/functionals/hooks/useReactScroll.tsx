import { scroller, Element } from 'react-scroll'

/**
 * render-hooksパターンを採用している
 * https://engineering.linecorp.com/ja/blog/line-securities-frontend-3/
 */
export const useReactScroll = (data: string) => {
  const options = {
    duration: 1000,
    delay: 0,
    smooth: true,
    offset: -10
  }

  const renderScrollElement = () => <Element name={data} />

  const scrollHook = () => {
    scroller.scrollTo(data, options)
  }

  return {
    renderScrollElement,
    scrollHook
  }
}
