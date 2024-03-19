# skin-bloom-frontend

## フォルダの説明
基本的にsrcフォルダ内を編集する。
src/pages配下が、クライアントサイドでの各ページに大体対応している。
ページ間で共通で用いられるような要素（コンポーネント）はsrc/componentsフォルダ配下にある。
src/componentsフォルダ配下にはjsとscss(便利css)のファイルがある。

### src/components
- Footer, Header
- Layout: これで要素を挟むとFooterとHeaderで挟める
- page/: 配下には、src/pages配下と同様のディレクトリ構造があり、各ページで用いられるcomponentが格納される。
## Getting Started

プロジェクトをcloneした後、一度
```npm install next```コマンドを打つ必要がある。

## localで挙動を確認したいとき
First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/home/intro](http://localhost:3000/home/intro) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on firebase hosting

buildする

```
npm run build
```

デプロイ

```
npm run deploy
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
