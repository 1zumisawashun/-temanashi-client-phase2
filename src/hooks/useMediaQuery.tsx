import styled from '@emotion/styled'

const breakpoints = {
  iphone5: 320,
  sp: 576,
  tab: 768,
  pc: 1042
} as const

/**
 * mediaQueryの方が直感的に使いやすいのでそちらを採用する
 * deviceもmediaQueryも補完（予測変換）できている
 * https://github.com/emotion-js/emotion/blob/main/docs/media-queries.mdx
 */
export const device = {
  iphone5: `(max-width: ${breakpoints.iphone5}px)`,
  sp: `(max-width: ${breakpoints.sp}px)`,
  tab: `(max-width: ${breakpoints.tab}px)`,
  pc: `(max-width: ${breakpoints.pc}px)`
}

// eslint-disable-next-line
const FirstTextWrapper = styled('div')`
  margin: auto;
  @media ${device.tab} {
    max-width: 800px;
  }
  @media ${device.pc} {
    max-width: 1400px;
  }
`

export const mediaQuery = (key: keyof typeof breakpoints) =>
  `@media (max-width: ${breakpoints[key]}px)`

// eslint-disable-next-line
const SecondTestWrapper = styled('div')`
  color: 'green';
  margin: auto;
  ${mediaQuery('iphone5')} {
    color: 'gray';
  }
  ${mediaQuery('sp')} {
    color: 'hotpink';
  }
`
