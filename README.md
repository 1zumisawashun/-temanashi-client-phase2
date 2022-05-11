# phase-1

![image](https://user-images.githubusercontent.com/65071534/167672720-c0ba2b9b-020e-4e94-b73c-79280ba7f0ef.png)

- https://github.com/1zumisawashun/temanashi-client

- https://temanashi-39b3f.web.app/

- https://qiita.com/1zushun/items/9b52fee68489a5cf33f8

# phase-2

- https://temanashi-phase2.web.app/

# 課題

- CircleCI でデプロイ
- CircleCI にテストを組み込む
- firebase.json に cloud functions の自動デプロイを組み込む
- @types を分離させる
- リムーブパッケージの導入しビルド時の実行に混ぜる

### 採用している技術スタック

```
言語： TypeScript
CSSアーキテクチャ： ITCSS, RSCSS
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

# Available Scripts

### Install the dependencies

```
npm install
```

### Compiles and hot-reloads for development

```
npm run start
```

### Compiles and minifies for production1

```
npm run build:firebase
```

### Compiles and minifies for production2

```
npm run deploy:firebase
```
