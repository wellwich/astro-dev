---
title: "シーン - Phaser3 Tips"
date: "2024-06-01"
description: "Phaser3でシーンを作成する方法を紹介します。"
tags: ["Phaser3","Phaser3 Tips"]
---
## シーンの作成
### クラスを作成する
```typescript
class MyScene extends Phaser.Scene {
    constructor() {
        super('MyScene');
    }
}
```

### コンフィグにシーンを追加する
```typescript
const config: Phaser.Types.Core.GameConfig = {
    scene: [MyScene],
};
```

### シーンを複数追加する
```typescript
const config: Phaser.Types.Core.GameConfig = {
    scene: [MyScene, MyScene2],
};
```

## シーンのライフサイクル
### シーンの作成
```typescript
class MyScene extends Phaser.Scene {
    constructor() {
        super('MyScene');
    }

    create() {
        // シーンの作成時に実行される処理
    }
}
```

### シーンの更新
```typescript
class MyScene extends Phaser.Scene {
    constructor() {
        super('MyScene');
    }

    update() {
        // シーンの更新時に実行される処理
    }
}
```

## シーンの切り替え
### シーンの切り替え
```typescript
this.scene.start('MyScene'); // MySceneに切り替える
```

### シーンの切り替え（引数付き）
```typescript
this.scene.start('MyScene', { x: 100, y: 200 }); // MySceneに切り替える
```

### シーンの切り替え（引数付き）：切り替え先で引数を受け取る
```typescript
class MyScene extends Phaser.Scene {
    constructor() {
        super('MyScene');
    }

    init(data: any) {
        console.log(data.x); // 100
        console.log(data.y); // 200
    }
}
```

### シーンの切り替え（引数付き）：切り替え先で引数を受け取る（型付き）
```typescript
interface MySceneData {
    x: number;
    y: number;
}

class MyScene extends Phaser.Scene {
    constructor() {
        super('MyScene');
    }

    init(data: MySceneData) {
        console.log(data.x); // 100
        console.log(data.y); // 200
    }
}
```