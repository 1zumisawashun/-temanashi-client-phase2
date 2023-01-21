import { useState, useEffect, useCallback, useMemo } from 'react'
import { useQuery } from 'react-query'
import { DiagnoseResult, DiagnoseTinderSwipe } from '../models/disgnose'
import { Loading } from '../uis'
import { useRandomContext } from '../../functions/hooks/useContextClient'
import { ProductItem } from '../../@types/dashboard'
import { delay } from '../../functions/utilities'
import { fetchAllProduct } from '../../functions/api/fetchAllProduct'

export const DiagnoseTemplate: React.VFC = () => {
  const { products, addProductWithRandom } = useRandomContext()
  const [isVisibleDisagnoseResult, setIsVisibleDisagnoseResult] =
    useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [documents, setDocuments] = useState<Array<ProductItem>>([])
  const { data } = useQuery('productItems', fetchAllProduct)

  /* eslint-disable */
  useEffect(() => {
    if (data && products.length === 0) {
      addProductWithRandom(data)
    }
  }, [data])

  const changeHandler = useCallback(async () => {
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
        <DiagnoseTinderSwipe db={documents} changeHandler={changeHandler} />
      )}
      {isVisibleDisagnoseResult && documents.length > 0 && (
        <DiagnoseResult db={documents} />
      )}
    </>
  )
}
