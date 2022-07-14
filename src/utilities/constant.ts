import { Furniture } from '../@types/dashboard'
import { OptionProps } from '../components/ui/InputSelect'
import theme_1 from '../assets/image/furniture_1.jpg'
import furniture_bed from '../assets/image/furniture_bed.jpg'
import furniture_blanket from '../assets/image/furniture_blanket.jpg'
import furniture_chair from '../assets/image/furniture_chair.jpg'
import furniture_lamp from '../assets/image/furniture_lamp.jpg'
import furniture_plant from '../assets/image/furniture_plant.jpg'
import furniture_rug from '../assets/image/furniture_rug.jpg'
import furniture_shelf from '../assets/image/furniture_shelf.jpg'
import furniture_sofa from '../assets/image/furniture_sofa.jpg'

export const recommendation: Partial<Furniture> = {
  price: 39900,
  baseColor: 'white',
  subColor: 'grey',
  imageUrl: theme_1,
  details:
    'ドライフラワーと照明が特徴的なワンルームの一人暮らしインテリア。テキトタイルはグレー系で揃えられ、IKEAの毛布やサイドテーブル、照明などで特徴立たせている、シンプルな雰囲気のお部屋。'
}

export const db: Array<Partial<Furniture>> = [
  {
    width: 97,
    depth: 180,
    height: 50,
    price: 39900,
    name: 'ベッド',
    imageUrl: furniture_bed
  },
  {
    width: 40,
    depth: 40,
    height: 60,
    price: 4999,
    name: 'テーブル',
    imageUrl: furniture_chair
  },
  {
    width: 95,
    depth: 64,
    height: 68,
    price: 10990,
    name: 'ソファ',
    imageUrl: furniture_sofa
  },
  {
    width: 132,
    depth: 0,
    height: 38,
    price: 20280,
    name: '間接照明',
    imageUrl: furniture_lamp
  },
  {
    width: 130,
    depth: 190,
    height: 0,
    price: 4620,
    name: 'ラグ',
    imageUrl: furniture_rug
  },
  {
    width: 85,
    depth: 55,
    height: 0,
    price: 4999,
    name: '毛布',
    imageUrl: furniture_blanket
  },
  {
    width: 70,
    depth: 25,
    height: 70,
    price: 7000,
    name: 'ラック',
    imageUrl: furniture_shelf
  },
  {
    width: 55,
    depth: 60,
    height: 150,
    price: 15176,
    name: '観葉植物',
    imageUrl: furniture_plant
  }
]

export const filterList: Array<string> = [
  'all',
  'bed',
  'blanket',
  'chair',
  'lamp',
  'plant',
  'rug',
  'table',
  'shelf',
  'sofa'
]
export const userList: Array<string> = ['favorite', 'history', 'account']

export const categoryOptions: Array<OptionProps> = [
  { value: 'bed', label: 'Bed' },
  { value: 'blanket', label: 'Blanket' },
  { value: 'chair', label: 'Chair' },
  { value: 'lamp', label: 'Lamp' },
  { value: 'plant', label: 'Plant' },
  { value: 'rug', label: 'Rug' },
  { value: 'table', label: 'Table' },
  { value: 'shelf', label: 'Shelf' },
  { value: 'sofa', label: 'Sofa' }
]

export const text =
  'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
