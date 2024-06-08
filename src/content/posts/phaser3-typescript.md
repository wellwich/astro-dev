---
title: "Phaser3をTypeScriptで使用する際の問題点と解決方法 - Phaser3 Tips"
date: "2024-06-01"
description: "Phaser3をTypeScriptで使用する際の問題点と解決方法を紹介します。"
tags: ["Phaser3"]
---
　Phaser3をTypeScriptで使用する際には、以下のような問題点があります。
- 変数を宣言する際に、型を指定する必要がある
- createメソッドとupdateメソッドで共通の変数を使用したいときに、変数をクラスのプロパティとして宣言しなければならない
- TS2564: Property 'a' has no initializer and is not definitely assigned in the constructor.（コンストラクタで初期化されていないプロパティ'a'は、初期化されていない可能性があります。）
- でもできるだけグローバル変数を使いたくない

この問題点を解決する方法を紹介します。

## createメソッドとupdateメソッドで共通の変数を使用したいときに、変数をクラスのプロパティとして宣言しなければならない
　createメソッドとupdateメソッドで共通の変数を使用したいときに、変数をクラスのプロパティとして宣言しなければならないという問題点があります。
　createメソッドとupdateメソッドで共通の変数を使用する方法は以下の通りです。
```typescript
class MyScene extends Phaser.Scene {
    private a!: Phaser.GameObjects.Sprite; // aの後ろに!を付けるのがポイント

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