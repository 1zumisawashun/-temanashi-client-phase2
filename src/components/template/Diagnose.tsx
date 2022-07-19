import { useState, useEffect, useCallback, useMemo } from 'react'
import { DiagnoseResult, DiagnoseTinderSwipe } from '../model/disgnose'
import { Loading } from '../ui'
import { useRandomContext } from '../../hooks/useContextClient'
import { useData } from '../../hooks/useData'
import { productUseCase, ProductItem } from '../../utilities/stripeClient'
import { delay } from '../../utilities'

export const DiagnoseTemplate: React.VFC = () => {
  const { products, addProductWithRandom } = useRandomContext()
  const [isVisibleDisagnoseResult, setIsVisibleDisagnoseResult] =
    useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [documents, setDocuments] = useState<Array<ProductItem>>([])

  if (products.length === 0) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const storeProductItems = useData<ProductItem[]>('ProductItems', () =>
      productUseCase.fetchAllProduct()
    )
    addProductWithRandom(storeProductItems)
  }

  const changePendingDiagnose = useCallback(async () => {
    setIsLoading(true)
    await delay(1000)
    setIsLoading(false)
    setIsVisibleDisagnoseResult(true)
  }, [])

  const fourOrSeven = useMemo(() => {
    return isVisibleDisagnoseResult ? 7 : 4
  }, [isVisibleDisagnoseResult])

  useEffect(() => {
    if (products.length <= fourOrSeven) return
    const randomDocument: Array<ProductItem> = []
    let indexs: Array<number> = []
    while (randomDocument.length <= fourOrSeven) {
      const queryIndex = Math.floor(Math.random() * products.length - 1)
      if (!indexs.includes(queryIndex)) {
        indexs = [...indexs, queryIndex]
        const results = products.find(
          (item) => item.product.random === queryIndex
        )
        if (results) {
          randomDocument.push(results)
          if (randomDocument.length === fourOrSeven) {
            setDocuments(randomDocument)
          }
        }
      }
    }
  }, [products, fourOrSeven])

  return (
    <>
      {documents.length === 0 && <Loading />}
      {isLoading && <Loading />}
      {!isVisibleDisagnoseResult && documents.length > 0 && (
        <DiagnoseTinderSwipe
          db={documents}
          changePendingDiagnose={changePendingDiagnose}
        />
      )}
      {isVisibleDisagnoseResult && documents.length > 0 && (
        <DiagnoseResult db={documents} />
      )}
    </>
  )
}
