import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useContextClient'
import { productUseCase, ProductItem } from '../../utilities/stripeClient'
import { ButtonIconFavorite, ButtonIconNoFavirute } from '.'

type LikeButtonProp = {
  furniture: ProductItem
}

export const ButtonLike: React.VFC<LikeButtonProp> = ({ furniture }) => {
  const [like, setLike] = useState<boolean>(false)
  const { user } = useAuthContext()
  if (!user) throw new Error('we cant find your account')

  const likedUser = useQuery('likedUser', () =>
    productUseCase.fetchLikedUser(user.uid, furniture.product.id)
  )
  const likedFurniture = useQuery('LikedProduct', () =>
    productUseCase.fetchLikedProduct(user.uid, furniture.product.id)
  )

  // NOTE:set中にconverterで定義している型と違う値を入れるとエラーになることを確認できる
  const addLikedUser = () => {
    likedUser.data!.referense.set({
      liked_user: {
        uid: user.uid,
        displayName: user.displayName
      },
      createdAt: timestamp.fromDate(new Date())
    })
  }

  const addLikedFurniture = () => {
    likedFurniture.data!.referense.set({
      liked_furniture: furniture,
      createdAt: timestamp.fromDate(new Date())
    })
  }

  const removeLikedUser = () => {
    likedFurniture.data!.referense.delete()
  }

  const removeLikedFurniture = () => {
    likedUser.data!.referense.delete()
  }

  const handleClick = () => {
    setLike(!like)
    if (like === true) {
      removeLikedUser()
      removeLikedFurniture()
    }
    if (like === false) {
      addLikedUser()
      addLikedFurniture()
    }
  }

  useEffect(() => {
    const unsubscribe = likedFurniture.data!.referense.onSnapshot(
      (snapshot) => {
        if (snapshot.exists) {
          setLike(true)
        } else {
          setLike(false)
        }
      },
      (error) => {
        console.log(error)
      }
    )
    return () => unsubscribe()
    /*eslint-disable*/
  }, [likedFurniture])

  return (
    <div>
      {like ? (
        <ButtonIconFavorite
          color="primary"
          size="large"
          onClick={handleClick}
        />
      ) : (
        <ButtonIconNoFavirute
          color="primary"
          size="large"
          onClick={handleClick}
        />
      )}
    </div>
  )
}