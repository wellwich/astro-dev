---
title: "タッチイベント - Phaser3 Tips"
date: "2024-06-01"
description: "ゲームオブジェクトにタッチイベントを追加する方法を紹介します。"
tags: ["Phaser3","Phaser3 Tips"]
---

## ゲームオブジェクトのタッチイベント

　ここでのゲームオブジェクトとは、`Phaser.GameObjects.Sprite`や`Phaser.GameObjects.Rectangle`などのことを指します。例では`Phaser.GameObjects.Sprite`を使用します。

```typescript
const sprite = this.add.sprite(x, y, 'key');
```

### タッチイベントの有効化

```typescript
sprite.setInteractive(); // タッチイベントを有効化
```

### タッチイベントの追加

```typescript
sprite.on('pointerdown', () => {
    // タッチ時の処理
});
sprite.on('pointerup', () => {
    // タッチ終了時の処理
});
sprite.on('pointermove', () => {
    // タッチ移動時の処理
});
```