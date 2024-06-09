---
title: "ブロック崩しを作る - Phaser3 Sample"
date: "2024-06-01"
description: "Phaser 3を使用して基本的なブロック崩しゲームを作成するプロセスを順を追ってで説明します。"
tags: ["Phaser3","Phaser3 Sample"]
---

この記事では、Phaser 3を使用して基本的なブロック崩しゲームを作成するプロセスを順を追ってで説明します。このゲームでは、プレイヤーはパドルを操作してボールを跳ね返し、空中のブロックを破壊します。ボールが画面の下端を越えるとゲームオーバーになります。

> この記事ではTypeScriptを使用していますが、JavaScriptでの実装も可能です。JavaScriptのサンプルコードは一番下に記載しています。


## ゲームの構造

ゲームは`BreakoutScene`という単一のシーンから構成されます。Phaserでは、ゲームの異なる部分（例えば、メニュー画面、ゲームプレイ画面、ゲームオーバー画面）をシーンとして管理します。今回は、ゲームのロジック全てを`BreakoutScene`クラス内に実装します。

### シーンの基本設定

```typescript
import Phaser from 'phaser';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

class BreakoutScene extends Phaser.Scene {
    constructor() {
        super('BreakoutScene');
    }

    // シーン内で使用するプロパティの宣言
    private ball!: Phaser.Physics.Arcade.Sprite;
    private paddle!: Phaser.Physics.Arcade.Sprite;
    private bricks!: Phaser.GameObjects.Group;
}
```

### アセットのプリロード（preload()）

ゲームのビジュアル要素は、`preload`メソッド内で動的に生成します。今回は外部の画像ファイルを使用せずに、ボール、パドル、ブリックのグラフィックを作成します。

#### ボール、パドル、ブリックのグラフィック生成


```typescript
preload() {
    const ballGraphics = this.add.graphics();
    ballGraphics.fillStyle(0xffffff); // 白色で塗りつぶしを設定
    ballGraphics.fillCircle(8, 8, 8); // 中心(8, 8)に半径8の円を描画
    ballGraphics.generateTexture('ball', 16, 16); // 描画した円から16x16ピクセルのテクスチャを生成し、'ball'というキーで保存
    ballGraphics.destroy(); // Graphicsオブジェクトを破棄してリソースを解放

    const paddleGraphics = this.add.graphics();
    paddleGraphics.fillStyle(0xffffff); // 白色で塗りつぶしを設定
    paddleGraphics.fillRect(0, 0, 100, 25); // 左上(0, 0)から100x25ピクセルの長方形を描画
    paddleGraphics.generateTexture('paddle', 100, 25); // 描画した長方形からテクスチャを生成し、'paddle'というキーで保存
    paddleGraphics.destroy(); // Graphicsオブジェクトを破棄

    const brickGraphics = this.add.graphics();
    brickGraphics.fillStyle(0xffffff); // 白色で塗りつぶしを設定
    brickGraphics.fillRect(0, 0, 50, 25); // 左上(0, 0)から50x25ピクセルの長方形を描画
    brickGraphics.generateTexture('brick', 50, 25); // 描画した長方形からテクスチャを生成し、'brick'というキーで保存
    brickGraphics.destroy(); // Graphicsオブジェクトを破棄
}
```

このコードでは、Phaserの`Graphics`オブジェクトを使用してボール、パドル、ブリックのグラフィックをプログラム的に生成しています。`fillStyle`メソッドで塗りつぶしの色を設定し、`fillCircle`や`fillRect`メソッドで形状を描画しています。その後、`generateTexture`メソッドを使用して、これらの形状からテクスチャを生成し、ゲーム内で使用するためにキーを割り当てています。最後に、使用済みの`Graphics`オブジェクトを`destroy`メソッドで破棄して、リソースを解放しています。

このプロセスにより、外部の画像ファイルを使用せずに、ゲームの主要なビジュアル要素を完全にコントロール下に置くことができます。`preload`メソッドを通じて事前にこれらのアセットを準備することで、ゲームのレンダリング時にこれらのオブジェクトを即座に表示できるようになり、パフォーマンスを向上させることができます。

詳しくは、[Phaser3 Tips: スプライトを生成する](https://dev.wellwich.com/docs/phaser3/tips/sprites-from-graphics/)を参照してください。

### ゲームオブジェクトの作成（create()）

`create`メソッドでは、ゲームの初期状態を設定します。物理エンジンの境界を定義し、ボール、パドル、ブリックを配置します。また、ボールとパドル、ボールとブリックの衝突処理もここで実装します。

#### 物理エンジンの境界設定

```typescript
this.physics.world.setBoundsCollision(true, true, true, false);
```

この行は、ゲームの物理世界における境界の衝突を設定しています。上、左、右の境界での衝突を有効にし、下の境界では衝突を無効にしています。これにより、ボールが上、左、右の壁に当たると跳ね返りますが、下には落ちていくことができるようになります。

#### ボールの作成と設定

```typescript
this.ball = this.physics.add.sprite(DEFAULT_WIDTH / 2, DEFAULT_HEIGHT - 25, 'ball');
this.ball.setData('onPaddle', true);
this.ball.setCollideWorldBounds(true);
this.ball.setBounce(1, 1);
```

ボールは画面の中央に配置され、いくつかの重要な物理プロパティが設定されています。`setData`メソッドでボールがパドル上にある状態を示し、`setCollideWorldBounds`で画面の境界との衝突を有効にしています。`setBounce`メソッドでボールの跳ね返り係数を1に設定し、完全な弾性衝突を実現しています。

#### パドルの作成と設定

```typescript
this.paddle = this.physics.add.sprite(DEFAULT_WIDTH / 2, DEFAULT_HEIGHT - 5, 'paddle');
this.paddle.setImmovable(true);
```

パドルは画面下部中央に配置され、`setImmovable`メソッドにより、他のオブジェクトとの衝突時に動かないように設定されています。

#### ブリックの配置

```typescript
this.bricks = this.physics.add.staticGroup();
for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 15; x++) {
        const brick = this.bricks.create(DEFAULT_WIDTH / 4 + x * 50, 40 + y * 25, 'brick');
        brick.setOrigin(0.5, 0);
        brick.refreshBody();
    }
}
```

ブリックは`staticGroup`を使用して配置されます。これは、ブリックが動かない静的なオブジェクトであることを意味します。二重のforループを使用して、ブリックをグリッド状に配置しています。`setOrigin`メソッドでブリックの原点を調整し、`refreshBody`で物理ボディを更新しています。

#### ボールとパドルの衝突処理

```typescript
this.physics.add.collider(this.ball, this.paddle, (ball, paddle) => {
    if (this.ball.getData('onPaddle')) return;
    let diff = 0;
    if (this.ball.x < this.paddle.x) {
        diff = this.paddle.x - this.ball.x;
        this.ball.setVelocityX(-10 * diff);
    }
    else if (this.ball.x > this.paddle.x) {
        diff = this.ball.x - this.paddle.x;
        this.ball.setVelocityX(10 * diff);
    }
});
```

このコードは、ボールとパドルが衝突した際の挙動を定義しています。衝突時には、ボールの位置とパドルの位置の差（`diff`）を計算し、その差に基づいてボールのX軸方向の速度を変更しています。これにより、ボールがパドルのどの部分に当たるかによって、ボールが跳ね返る角度が変わるようになっています。

#### ボールとブリックの衝突処理

```typescript
this.physics.add.collider(this.ball, this.bricks, (ball, brick) => {
    brick.destroy();
});
```

このコードは、ボールがブリックに衝突した際にブリックを破壊する処理を定義しています。`destroy`メソッドを呼び出すことで、衝突したブリックをゲームから取り除きます。

#### パドルの操作とボールの発射

```typescript
this.input.on('pointermove', (pointer) => {
    this.paddle.x = Phaser.Math.Clamp(pointer.x, 50, DEFAULT_WIDTH - 50);
    if (this.ball.getData('onPaddle')) {
        this.ball.x = this.paddle.x;
    }
});

this.input.on('pointerup', () => {
    if (this.ball.getData('onPaddle')) {
        this.ball.setVelocityY(-300);
        this.ball.setData('onPaddle', false);
    }
});
```

これらのイベントリスナーは、プレイヤーがマウスまたはタッチスクリーンを使用してパドルを操作し、ボールを発射できるようにするためのものです。`pointermove`イベントでパドルの位置を更新し、`pointerup`イベントでボールがパドル上にある状態から発射されるように設定しています。

### ゲームの更新処理（update()）

`update`メソッドでは、ゲームの状態をフレームごとに更新します。特に、ボールが画面下端を越えたかどうかをチェックし、越えた場合にはゲームをリスタートします。

```typescript
update(time: number, delta: number) {
    if (this.ball.y > DEFAULT_HEIGHT) {
        this.scene.restart();
    }
}
```

このシンプルな`update`メソッドの実装では、主にボールが画面の下端を越えたかどうかをチェックしています。ボールの`y`座標が`DEFAULT_HEIGHT`（ゲーム画面の高さ）を超えた場合、つまりボールが画面の下端を越えて落下した場合に、現在のシーンを再起動します。これは、プレイヤーがボールをキャッチできなかったときにゲームをリセットするための処理です。

#### ゲームのリセット

`this.scene.restart();`の呼び出しにより、現在のシーンが再起動されます。これは、Phaserにおいてシーンをリセットし、初期状態からゲームを再開する簡単な方法です。シーンが再起動されると、`preload`、`create`メソッドが再び実行され、ゲームオブジェクトが初期状態にリセットされます。これにより、プレイヤーは新たなゲームを始めることができます。

## ゲームの設定と起動

ゲームの設定を定義し、Phaserのゲームインスタンスを作成してゲームを起動します。
typescript
```typescript
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        },
    },
    scene: [BreakoutScene],
};

new Phaser.Game(config);
```

## 全コード
### TypeScript版
```typescript
import Phaser from 'phaser';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

class BreakoutScene extends Phaser.Scene {
    constructor() {
        super('BreakoutScene');
    }

    private ball!: Phaser.Physics.Arcade.Sprite;
    private paddle!: Phaser.Physics.Arcade.Sprite;
    private bricks!: Phaser.GameObjects.Group;

    init() {
    }

    preload() {
        const ballGraphics = this.add.graphics();
        ballGraphics.fillStyle(0xffffff);
        ballGraphics.fillCircle(8, 8, 8);
        ballGraphics.generateTexture('ball', 16, 16);
        ballGraphics.destroy();

        const paddleGraphics = this.add.graphics();
        paddleGraphics.fillStyle(0xffffff);
        paddleGraphics.fillRect(0, 0, 100, 25);
        paddleGraphics.generateTexture('paddle', 100, 25);
        paddleGraphics.destroy();

        const brickGraphics = this.add.graphics();
        brickGraphics.fillStyle(0xffffff);
        brickGraphics.fillRect(0, 0, 50, 25);
        brickGraphics.generateTexture('brick', 50, 25);
        brickGraphics.destroy();
    }

    create() {
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.ball = this.physics.add.sprite(DEFAULT_WIDTH / 2, DEFAULT_HEIGHT - 25, 'ball');
        this.ball.setData('onPaddle', true);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);

        this.paddle = this.physics.add.sprite(DEFAULT_WIDTH / 2, DEFAULT_HEIGHT - 5, 'paddle');
        this.paddle.setImmovable(true);

        this.bricks = this.physics.add.staticGroup();
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 15; x++) {
                const brick = this.bricks.create(DEFAULT_WIDTH / 4 + x * 50, 40 + y * 25, 'brick') as Phaser.Physics.Arcade.Image;
                brick.setOrigin(0.5, 0);
                brick.refreshBody();
            }
        }

        this.physics.add.collider(this.ball, this.paddle, (ball, paddle) => {
            if (this.ball.getData('onPaddle')) return;
            let diff = 0;
            if (this.ball.x < this.paddle.x) {
                diff = this.paddle.x - this.ball.x;
                this.ball.setVelocityX(-10 * diff);
            }
            else if (this.ball.x > this.paddle.x) {
                diff = this.ball.x - this.paddle.x;
                this.ball.setVelocityX(10 * diff);
            }
        });

        this.physics.add.collider(this.ball, this.bricks, (ball, brick) => {
            brick.destroy();
        });


        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 50, DEFAULT_WIDTH - 50);
            if (this.ball.getData('onPaddle')) {
                this.ball.x = this.paddle.x;
            }
        });

        this.input.on('pointerup', () => {
            if (this.ball.getData('onPaddle')) {
                this.ball.setVelocityY(-300);
                this.ball.setData('onPaddle', false);
            }
        });
    }

    update(time: number, delta: number) {
        if (this.ball.y > DEFAULT_HEIGHT) {
            this.scene.restart();
        }
    }
}

export default BreakoutScene;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  scale: {
    parent: 'app',
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [BreakoutScene],
};

new Phaser.Game(config);

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});
```
### JavaScript版
```javascript
import Phaser from 'phaser';

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

class BreakoutScene extends Phaser.Scene {
    constructor() {
        super('BreakoutScene');
        this.ball = undefined;
        this.paddle = undefined;
        this.bricks = undefined;
    }

    init() {
    }

    preload() {
        const ballGraphics = this.add.graphics();
        ballGraphics.fillStyle(0xffffff);
        ballGraphics.fillCircle(8, 8, 8);
        ballGraphics.generateTexture('ball', 16, 16);
        ballGraphics.destroy();

        const paddleGraphics = this.add.graphics();
        paddleGraphics.fillStyle(0xffffff);
        paddleGraphics.fillRect(0, 0, 100, 25);
        paddleGraphics.generateTexture('paddle', 100, 25);
        paddleGraphics.destroy();

        const brickGraphics = this.add.graphics();
        brickGraphics.fillStyle(0xffffff);
        brickGraphics.fillRect(0, 0, 50, 25);
        brickGraphics.generateTexture('brick', 50, 25);
        brickGraphics.destroy();
    }

    create() {
        this.physics.world.setBoundsCollision(true, true, true, false);
        this.ball = this.physics.add.sprite(DEFAULT_WIDTH / 2, DEFAULT_HEIGHT - 25, 'ball');
        this.ball.setData('onPaddle', true);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);

        this.paddle = this.physics.add.sprite(DEFAULT_WIDTH / 2, DEFAULT_HEIGHT - 5, 'paddle');
        this.paddle.setImmovable(true);

        this.bricks = this.physics.add.staticGroup();
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 15; x++) {
                const brick = this.bricks.create(DEFAULT_WIDTH / 4 + x * 50, 40 + y * 25, 'brick');
                brick.setOrigin(0.5, 0);
                brick.refreshBody();
            }
        }

        this.physics.add.collider(this.ball, this.paddle, (ball, paddle) => {
            if (this.ball.getData('onPaddle')) return;
            let diff = 0;
            if (this.ball.x < this.paddle.x) {
                diff = this.paddle.x - this.ball.x;
                this.ball.setVelocityX(-10 * diff);
            }
            else if (this.ball.x > this.paddle.x) {
                diff = this.ball.x - this.paddle.x;
                this.ball.setVelocityX(10 * diff);
            }
        });

        this.physics.add.collider(this.ball, this.bricks, (ball, brick) => {
            brick.destroy();
        });

        this.input.on('pointermove', (pointer) => {
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 50, DEFAULT_WIDTH - 50);
            if (this.ball.getData('onPaddle')) {
                this.ball.x = this.paddle.x;
            }
        });

        this.input.on('pointerup', () => {
            if (this.ball.getData('onPaddle')) {
                this.ball.setVelocityY(-300);
                this.ball.setData('onPaddle', false);
            }
        });
    }

    update(time, delta) {
        if (this.ball.y > DEFAULT_HEIGHT) {
            this.scene.restart();
        }
    }
}

export default BreakoutScene;

const config = {
  type: Phaser.AUTO,
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  scale: {
    parent: 'app',
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [BreakoutScene],
};

new Phaser.Game(config);

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});
```