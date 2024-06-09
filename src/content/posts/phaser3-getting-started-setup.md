---
title: "Phaser3とViteでHello Worldするまでの環境を構築する方法"
date: "2024-06-01"
description: "Phaser3とViteでHello Worldするまでの環境を構築する方法を説明します。"
tags: ["Phaser3"]
---
# #02 環境構築
　今回は、Phaser3とViteでHello Worldするまでの環境を構築する方法を説明します。

　Phaser3の公式サイトには、[Getting Started](https://phaser.io/tutorials/getting-started-phaser3 "Getting Started") というチュートリアルがあります。このチュートリアルでは、webpackを使ってビルドしています。しかし、このサイトではwebpackではなく、基本的にViteを使ってビルドします。Viteは、簡単に構築できてビルドが速いというメリットがあります。

## 環境
　現時点での環境です。
- Node.js 18.17.0 (x64) and npm.
- Vite 4.4.5
- Phaser 3.60.0


## 1．Viteプロジェクトを生成する
　ここでも書きますが、分からなくなったら [Viteの公式サイト](https://ja.vitejs.dev/guide/ "Vite") を見ましょう。
```console {name = "console"}
npm create vite@latest
```

　以下のように聞かれるので、以下のように答えます。ただし、`vite-project`は任意の名前でOKです。
```console {name = "console"}
√ Project name: ... vite-project
√ Select a framework: » Vanilla
√ Select a variant: » TypeScript
```
　カレントディレクトリを先ほど答えた`Project name`にします。
```console {name = "console"}
cd vite-project
```
## 2．Phaserをインストールする
```console {name = "console"}
npm install phaser
```
## 3．index.htmlを編集する
　`index.html`を以下のように編集します。
```html {name = "index.html"}
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Getting Started Phaser3</title>
</head>

<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>

</html>
```
　この`index.html`は、最低限の設定です。`<div id="app"></div>`は、`main.ts`で`Phaser.Game`を作成する際に、`parent`に指定するために必要です。
## 4．不要なファイルを削除する
```console {name = "tree"}
├─public
│      vite.svg         <=要らない
│
└─src
        counter.ts      <=要らない
        main.ts
        style.css
        typescript.svg  <=要らない
        vite-env.d.ts   <=要らない
```
　`public`ディレクトリの`vite.svg`と`src`ディレクトリの`counter.ts`、`typescript.svg`、`vite-env.d.ts`は不要なので削除します。
## 5．main.tsを編集する
　`main.ts`も最低限の設定で書いています。今回はテキストで「Hello world!」と表示するだけです。
```typescript {name="src/main.ts"}
import Phaser from 'phaser';

const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 480;

class GameScene extends Phaser.Scene {
  constructor() {
    super('gameScene');
  }

  preload() {
  }

  create() {
    const title = this.add.text(DEFAULT_WIDTH / 2, DEFAULT_HEIGHT / 2,
      'Hello world!',
      {
        fontSize: '48px',
        color: '#fff'
      }).setOrigin(0.5, 0.5);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  scale: {
    parent: 'app',
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [GameScene],
};

new Phaser.Game(config);
```
## 6．実行する
```console {name = "console"}
npm run dev
```
`http://localhost:5173/`にアクセスすると、以下のように表示されます。
![Hello world!](https://r2dev.wellwich.com/images/getting-started-phaser3_1.jpg)