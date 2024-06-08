---
title: "テキストをテクスチャにしたり他のテクスチャと合成したりする - Phaser3 Tips"
description: "テキストをテクスチャにしたり、他のテクスチャと合成したりする方法を紹介します。"
date: "2024-06-01"
tags: ["Phaser3"]
---

　テキストをテクスチャにしたり、他のテクスチャと合成したりする方法を紹介します。

## グラフィックをテクスチャにする

　まずグラフィックからテクスチャを生成する方法です。

```typescript
const graphics = this.add.graphics(); // Graphicsを生成
graphics.fillStyle(0xffffff, 1); // 色を指定
graphics.fillRect(100, 100, 100, 100); // 矩形を描画
graphics.generateTexture("rect"); // Graphicsを元にテクスチャを生成
```

## テキストをテクスチャにする

次にテキストをテクスチャにする方法です。

```typescript
const text = this.add.text(100, 100, "ABC", { fontSize: "32px", color: "#000" }); // テキストを生成
text.setOrigin(0); // テキストの原点を左上にする
const renderTexture = this.add.renderTexture(100, 100, 100, 100); // レンダーテクスチャを生成
renderTexture.draw(text); // テキストをレンダーテクスチャに描画
renderTexture.saveTexture("text"); // レンダーテクスチャをテクスチャに保存
```

## テクスチャを合成する

最後にテクスチャを合成する方法です。

```typescript
const graphics = this.add.graphics(); // Graphicsを生成
graphics.fillStyle(0xffffff, 1); // 色を指定
graphics.fillRect(100, 100, 100, 100); // 矩形を描画
const text = this.add.text(100, 100, "ABC", { fontSize: "32px", color: "#000", fontFamily: "monospace" }); // テキストを生成
text.setOrigin(0); // テキストの原点を左上にする
const renderTexture = this.add.renderTexture(100, 100, 100, 100); // レンダーテクスチャを生成
renderTexture.draw(graphics); // Graphicsをレンダーテクスチャに描画
renderTexture.draw(text); // テキストをレンダーテクスチャに描画
renderTexture.saveTexture("composite"); // レンダーテクスチャをテクスチャに保存
```

## 完成例
![完成例](https://r2dev.wellwich.com/images/texture-from-text.webp)

応用するとこんなこともできます。
![応用例](https://r2dev.wellwich.com/images/texture-from-text-trump.webp)