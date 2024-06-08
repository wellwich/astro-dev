---
title: "テキスト - Phaser3 Tips"
description: "Phaser3でテキストを表示する方法を紹介します。"
date: "2024-06-01"
tags: ["Phaser3"]
---

## テキスト
### 型定義
```typescript
let text: Phaser.GameObjects.Text;
```
### 基本
```typescript
const text = this.add.text(x, y, 'Hello, World!');
```
### 1行で書く
```typescript
const text = this.add.text(x, y, 'Hello, World!', { fontSize: '32px', color: '#000' });
```
### あとから変更する
```typescript
text.setPosition(x, y); // 座標の変更
text.setX(x); // X座標の変更
text.setY(y); // Y座標の変更
text.setText('Hello, World!'); // テキストの変更
text.setFontSize(fontSize); // フォントサイズの変更
text.setColor(color); // 色の変更
```
### テキストのクリックイベント
```typescript
text.setInteractive(); // クリックイベントを有効化
text.on('pointerdown', () => {
    // クリック時の処理
});
```
### テキストの削除
```typescript
text.destroy();
```
### テキストの表示・非表示
```typescript
text.setVisible(true); // 表示
text.setVisible(false); // 非表示
```
### テキストの透明度
```typescript
text.setAlpha(1); // 不透明
text.setAlpha(0); // 透明
```
### テキストの回転
```typescript
text.setRotation(0); // 回転なし
text.setRotation(Math.PI / 2); // 90度回転
text.setRotation(Math.PI); // 180度回転
text.setRotation(Math.PI * 1.5); // 270度回転
```
### テキストの拡大・縮小
```typescript
text.setScale(1); // 拡大・縮小なし
text.setScale(2); // 2倍に拡大
text.setScale(0.5); // 半分に縮小
```
### テキストのアンカー
```typescript
text.setOrigin(0.5); // テキストの中央揃え
text.setOrigin(0.5, 0); // テキストの中央揃え（X軸のみ）
text.setOrigin(0, 0.5); // テキストの中央揃え（Y軸のみ） 
```
### テキストの影
```typescript
text.setShadow(1, 1, '#000', 1); // 影の設定
text.setShadow(0, 0, '#000', 0); // 影の削除
```
### テキストのアウトライン
```typescript
text.setStroke('#000', 1); // アウトラインの設定
text.setStroke('#000', 0); // アウトラインの削除
```
### テキストのアンチエイリアス
```typescript
text.setAntialias(false); // アンチエイリアスを無効化
text.setAntialias(true); // アンチエイリアスを有効化
```