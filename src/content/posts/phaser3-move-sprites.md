---
title: "スプライトを移動させる（TypeScriptの場合） - Phaser3 Tips"
date: "2024-06-01"
description: "スプライトを移動させる方法を紹介します。ここでは、TypeScriptを使用しています。"
tags: ["Phaser3","Phaser3 Tips"]
---
　スプライトを移動させる方法を紹介します。ここでは、TypeScriptを使用しています。

## スプライトを移動させる
　スプライトを移動させる方法は以下の通りです。
```typescript
class MyScene extends Phaser.Scene {
    private a!: Phaser.GameObjects.Sprite;

    constructor() {
        super('MyScene');
    }

    create() {
        this.a = this.add.sprite(0, 0, "a"); // aを生成
    }

    update() {
        this.a.x++; // aのX座標を1増やす
    }
}
```
　アクセス修飾子やプロパティの後ろの！の詳細は[Phaser3をTypeScriptで使用する際の問題点と解決方法](/blog/phaser3-typescript)

## スプライトを移動させる（元画像なし）
　元画像なしでスプライトを移動させる方法は以下の通りです。
 ```typescript
    class MyScene extends Phaser.Scene {
        private a!: Phaser.GameObjects.Sprite;
        constructor() {
            super('MyScene');
        }

        create() {
            const graphics = this.add.graphics(); // Graphicsを生成
            graphics.fillStyle(0xffffff, 1); // 色を指定
            graphics.fillRect(0, 0, 100, 100); // 矩形を描画
            graphics.generateTexture("rect"); // Graphicsを元にテクスチャを生成
            this.a = this.add.sprite(0, 0, "rect"); // スプライトを生成
            graphics.destroy(); // Graphicsを削除
        }

        update() {
            this.a.x++; // aのX座標を1増やす
        }
    }
```
　詳細は[元画像なしでスプライトを生成する](/sprites-from-graphics/)を参照してください。