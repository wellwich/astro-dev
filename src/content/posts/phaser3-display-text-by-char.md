---
title: "テキストを1文字ずつ表示させる - Phaser3 Utils"
date: "2024-06-01"
description: "Phaser3でテキストを1文字ずつ表示させる方法を紹介します。"
tags: ["Phaser3","Phaser3 Utils"]
---
# テキストを1文字ずつ表示させる

![テキストを1文字ずつ表示させる](https://r2dev.wellwich.com/images/display-text-by-char.webp)
ノベルゲームのようにテキストを1文字ずつ表示させるための関数を紹介します。

## displayTextByChar関数

テキストを1文字ずつ表示するための`displayTextByChar`関数を作成します。この関数は、以下のパラメータを受け取ります：

- `scene`: テキストを表示するPhaserのシーンオブジェクト。
- `x`, `y`: テキストを表示する位置のX座標とY座標。
- `text`: 表示するテキスト。
- `style`: テキストのスタイルを定義するオブジェクト。フォントサイズや色などを指定します。
- `delayDef`: 各文字の表示間隔をミリ秒で指定します（デフォルトは100ミリ秒）。
- `delayMin`: ユーザーが画面をクリックしたときに適用される最小遅延時間（デフォルトは25ミリ秒）。

### 関数の実装

```typescript
import Phaser from 'phaser';

export default function displayTextByChar(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    style: Phaser.Types.GameObjects.Text.TextStyle,
    delayDef: number = 100,
    delayMin: number = 25
) {
    const textObj = scene.add.text(x, y, '', style);
    let i = 0;
    const timerEvent = scene.time.addEvent({
        delay: delayDef,
        repeat: text.length - 1,
        callback: () => {
            textObj.text += text[i];
            i++;
        }
    });

    scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        if (pointer.leftButtonDown()) {
            timerEvent.reset({
                delay: delayMin,
                repeat: timerEvent.repeatCount,
                callback: timerEvent.callback,
            })
        }
    });

    return { textObj, timerEvent };
}
```

### 機能の説明

- **テキストオブジェクトの作成**: 空のテキストオブジェクトを作成し、指定された位置に配置します。
- **タイマーイベント**: Phaserのタイマーイベントを使用して、指定された遅延ごとにテキストの次の文字を追加します。これにより、テキストが1文字ずつ表示されます。
- **クリックで表示を早くする**: ユーザーが画面をクリック（またはタップ）すると、テキストの表示速度が上がります。これは、`pointerdown`イベントをリッスンし、左ボタンが押された場合にタイマーイベントの遅延を`delayMin`にリセットすることで実現されます。

### 戻り値

関数は、作成したテキストオブジェクトとタイマーイベントを含むオブジェクトを返します。これにより、関数を使用する側でこれらのオブジェクトにアクセスし、必要に応じてさらに制御を加えることができます。

## 使用例

`displayTextByChar`関数を使用して、テキストを1文字ずつ表示する例を以下に示します。

```typescript
import Phaser from 'phaser';
import displayTextByChar from './displayTextByChar';

class MyScene extends Phaser.Scene {
    constructor() {
        super('MyScene');
    }

    create() {
        const style = { fontSize: '32px', color: '#fff' };
        displayTextByChar(this, 100, 100, 'Hello, World!', style);
    }
}
```

ページ上部の画像は以下のようなコードで動いています。

```typescript
import Phaser from 'phaser';
import displayTextByChar from './displayTextByChar';

const DEFAULT_WIDTH = 640;
const DEFAULT_HEIGHT = 480;

class MyScene extends Phaser.Scene {
    constructor() {
        super('MyScene');
    }

    create() {
        const style = { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' };
        displayText(this, DEFAULT_WIDTH / 2, DEFAULT_HEIGHT / 2, 'Hello World!', style).textObj.setOrigin(0.5, 0.5);
    }
}
```