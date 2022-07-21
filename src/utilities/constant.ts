import { Furniture } from '../@types/dashboard'
import { OptionProps } from '../components/uis/InputSelect'
import theme_1 from '../assets/image/furniture_1.jpg'

export const recommendation: Partial<Furniture> = {
  price: 39900,
  baseColor: 'white',
  subColor: 'grey',
  imageUrl: theme_1,
  details:
    'ドライフラワーと照明が特徴的なワンルームの一人暮らしインテリア。テキトタイルはグレー系で揃えられ、IKEAの毛布やサイドテーブル、照明などで特徴立たせている、シンプルな雰囲気のお部屋。'
}

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

export const weekdaysOptions: Array<string> = [
  '月',
  '火',
  '水',
  '木',
  '金',
  '土',
  '日'
]

export const text =
  'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export const mineType = [
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/bmp',
  'image/svg+xml'
]
