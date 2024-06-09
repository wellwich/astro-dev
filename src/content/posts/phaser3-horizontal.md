---
title: "ゲーム画面を強制的に横向きにする - Phaser3 Tips"
date: "2024-06-01"
description: "Phaser3で画面を強制的に横向きにする方法を紹介します。"
tags: ["Phaser3","Phaser3 Tips"]
---
画面を強制的に横向きにする方法を紹介します。

## 画面を強制的に横向きにしたい場合
実をいうと、Phaser3には画面を強制的に横向きにする機能はありません。しかし、以下の方法で横向きにすることを実現させます。

### 画面を横向きにする
```typescript
if (window.matchMedia && window.matchMedia('(max-device-width: 640px)').matches) { // 画面の幅が640px以下の場合
        const background = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x000000); // 黒い背景を生成
        background.setInteractive(); // タップイベントを有効化
        background.setOrigin(0, 0); // 原点を左上に設定
        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, '横画面にしてください').setOrigin(0.5); // テキストを生成
        const fixScreen = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 150, '横画面にしたらここをタップ').setOrigin(0.5); // テキストを生成
        fixScreen.setInteractive(); // タップイベントを有効化
        fixScreen.on('pointerup', () => { // タップ時の処理
            this.scale.startFullscreen(); // フルスクリーンにする
            this.scene.start('titleScene'); // タイトルシーンに遷移
        });
}
```
このコードは、画面が縦向きの場合に黒い背景とテキストを表示し、画面が横向きになったら次のシーンに遷移する処理です。
判定方法は、画面の幅が640px以下の場合に縦向きと判定しています。

### 解説
- `window.matchMedia('(max-device-width: 640px)').matches`で画面の幅が640px以下かどうかを判定しています。
- `this.scale.startFullscreen()`で画面をフルスクリーンにします。（これは任意）
- `this.scene.start('titleScene')`で次のシーンに遷移します。

## まとめ
画面を強制的に横向きにする方法を紹介しました。Phaser3には画面を強制的に横向きにする機能はありませんが、上記の方法で横向きにすることを実現させます。