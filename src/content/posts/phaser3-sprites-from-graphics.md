---
title: "元画像なしでスプライトを生成する - Phaser3 Tips"
date: "2024-06-01"
description: "元画像なしでスプライトを生成する方法を紹介します。"
tags: ["Phaser3","Phaser3 Tips"]
---
　画像を用意せずにスプライトを生成する方法です。`Phaser.GameObjects.Graphics`を使用します。

　まず、`Phaser.GameObjects.Graphics`を生成します。

```typescript
const graphics = this.add.graphics();
```

　次に、`Phaser.GameObjects.Graphics`に描画を行います。ここでは、矩形を描画します。

```typescript
graphics.fillStyle(0xffffff, 1); // 色を指定
graphics.fillRect(0, 0, 100, 100); // 矩形を描画
```

　最後に、`Phaser.GameObjects.Graphics`を元にスプライトを生成します。

```typescript
const sprite = this.add.sprite(0, 0, graphics.generateTexture()); // スプライトを生成
graphics.destroy(); // Graphicsを削除
```

## 完成例

```typescript
const graphics = this.add.graphics(); // Graphicsを生成
graphics.fillStyle(0xffffff, 1); // 色を指定
graphics.fillRect(0, 0, 100, 100); // 矩形を描画
graphics.generateTexture("rect"); // Graphicsを元にテクスチャを生成
const sprite = this.add.sprite(0, 0, "rect"); // スプライトを生成
graphics.destroy(); // Graphicsを削除
```

## 完成例の解説

### `const graphics = this.add.graphics();`

　`Phaser.GameObjects.Graphics`を生成します。

### `graphics.fillStyle(0xffffff, 1);`

　色を指定します。`fillStyle`の第一引数に色を指定します。第二引数に透明度を指定します。透明度は0～1の間で指定します。

### `graphics.fillRect(0, 0, 100, 100);`

　矩形を描画します。`fillRect`の第一引数にX座標を指定します。第二引数にY座標を指定します。第三引数に幅を指定します。第四引数に高さを指定します。
　矩形以外にも、円を描画する`fillCircle`や、線を描画する`strokeRect`などがあります。

### `graphics.generateTexture("rect");`

　`Phaser.GameObjects.Graphics`を元にテクスチャを生成します。`generateTexture`の第一引数にテクスチャのキーを指定します。

### `const sprite = this.add.sprite(0, 0, "rect");`

　スプライトを生成します。`sprite`の第一引数にX座標を指定します。第二引数にY座標を指定します。第三引数にテクスチャのキーを指定します。