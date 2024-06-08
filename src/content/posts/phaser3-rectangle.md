---
title: "矩形 - Phaser3 Tips"
date: "2024-06-01"
description: "Phaser3で矩形を生成する方法を紹介します。"
tags: ["Phaser3"]
---

## 矩形
### 型定義
```typescript
let rect: Phaser.GameObjects.Rectangle;
```
### 基本
```typescript
const rect = this.add.rectangle(x, y, width, height, color);
```
### あとから変更する
```typescript
rect.setPosition(x, y); // 座標の変更
rect.setX(x); // X座標の変更
rect.setY(y); // Y座標の変更
rect.setSize(width, height); // サイズの変更
rect.setDisplaySize(width, height); // 表示サイズの変更
rect.setFillStyle(color); // 色の変更
```
### 矩形のクリックイベント
```typescript
rect.setInteractive(); // クリックイベントを有効化
rect.on('pointerdown', () => {
    // クリック時の処理
});
```
### 矩形の削除
```typescript
rect.destroy();
```
### 矩形の表示・非表示
```typescript
rect.setVisible(true); // 表示
rect.setVisible(false); // 非表示
```
### 矩形の透明度
```typescript
rect.setAlpha(1); // 不透明
rect.setAlpha(0); // 透明
```
### 矩形の回転
```typescript
rect.setRotation(0); // 回転なし
rect.setRotation(Math.PI / 2); // 90度回転
rect.setRotation(Math.PI); // 180度回転
rect.setRotation(Math.PI * 1.5); // 270度回転
```
### 矩形の拡大・縮小
```typescript
rect.setScale(1); // 拡大・縮小なし
```