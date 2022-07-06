# ■ phase-1

![image](https://user-images.githubusercontent.com/65071534/167672720-c0ba2b9b-020e-4e94-b73c-79280ba7f0ef.png)

### phase-1 のリポジトリ

- https://github.com/1zumisawashun/temanashi-client

### phase-1 の詳細

- https://qiita.com/1zushun/items/9b52fee68489a5cf33f8

# ■ phase-2

### phase-2 で採用している技術スタック

```
言語： TypeScript
CSSフレームワーク： MUI
ライブラリ： React
ホスティング： Firebase Hosting
DB： Firestore
認証： Firebase Authentication
トークン： JsonWebToken
APIサーバー： Cloud Functions, Express
ストレージ： Cloud Storage
決済： Firebase Stripe Extention
E2Eテスト： Cypress
```

### phase-2 で採用しているアーキテクチャ

```
└── src/
    ├── assets/
    │   │
    │   ├── icon/...
    │   │   ├── icon_not_found/
    │   │   └── icon_favorite/
    │   │
    │   ├── image/...
    │   │   ├── funituire1/
    │   │   └── funituire2/
    │   │
    │   └── sass/...
    │       ├── components/
    │       └── elements/
    │
    ├── components/...
    │   │
    │   ├── layouts/...
    │   │   ├── Footer/
    │   │   ├── HambergerMenu/
    │   │   └── Head/
    │   │
    │   ├── models/...
    │   │   │
    │   │   ├── Cart/...
    │   │   │   ├── CartAgreemant/
    │   │   │   ├── CartCounter/
    │   │   │   └── CartList/
    │   │   │
    │   │   ├── Dashboard/...
    │   │   │   ├── DashboardFilter/
    │   │   │   └── DashboardList/
    │   │   │
    │   │   └── Product/...
    │   │       ├── ProductComment/
    │   │       └── ProductSummary/
    │   │
    │   ├── templates/...
    │   │   ├── Cart/
    │   │   ├── Dashboard/
    │   │   └── Product/
    │   │
    │   └── uis/...
    │       ├── Avatar/
    │       ├── BasicButton/
    │       └── BasicModal/
    │
    ├── functionals/
    │   │
    │   ├── contexts/...
    │   │   ├── AuthContext/
    │   │   ├── CartContext/
    │   │   └── RandomContext/
    │   │
    │   ├── hooks/...
    │   │   ├── useAuth/
    │   │   ├── useCollection/
    │   │   └── useContextClient/
    │   │
    │   └── utilities/...
    │       ├── axiosClient/
    │       ├── constant/
    │       └── converterClient/
    │
    ├── pages/...
    │   ├── Cart/
    │   ├── Dashboard/
    │   └── Product/
    │
    ├── firebase/...
    │   └── config/
    │
    ├── providers/...
    │   └── app/
    │
    ├── routers/...
    │   └── app/
    └── ...
```

# Available Scripts

### Install the dependencies

```
npm install
```

### Compiles and hot-reloads for development

```
npm run start
```

### Run local test

```
npm run cy:open
```

### Compiles and minifies for production

```
npm run deploy
```
