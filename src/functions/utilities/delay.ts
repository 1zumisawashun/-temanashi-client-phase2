/**
 * 純粋なdelayするための関数
 */
export const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })
