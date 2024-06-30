---
title: "AstroでPhaser3で作ったゲーム（Typescript）を埋め込む方法 - Astro Tips"
date: "2024-06-30"
description: "AstroでPhaser3で作ったゲーム（Typescript）を埋め込む方法を紹介します。"
tags: ["Astro","Astro Tips","Phaser3"]
---

&emsp;AstroでPhaser3で作ったゲームを埋め込む方法を紹介します。

## Phaser3でゲームを作成

&emsp;まず、Phaser3でゲームを作成します。ファイル名は`phaser-game.ts`とします。

```typescript
import Phaser from 'phaser';

const D_WIDTH = 800;
const D_HEIGHT = 600;

class GameScene extends Phaser.Scene {
    constructor() {
        super('gameScene');
    }

    preload() {
    }

    create() {
        this.add.text(100, 100, 'Hello, Phaser3!', { fill: '#0f0' });
    }
}


const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: D_WIDTH,
    height: D_HEIGHT,
    scene: [GameScene],
    scale: {
        parent: 'main',
        mode: Phaser.Scale.FIT,
        fullscreenTarget: 'main',
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
};

export function initPhaserGame() {
    new Phaser.Game(config);
}

```

## Astroのコンポーネントに埋め込む

&emsp;次に、AstroのコンポーネントにPhaser3のゲームを埋め込みます。ファイル名は`phaser-game.astro`とします。

```astro
---
---
<div id="main"></div>

<script type="module">
    import { initPhaserGame } from './phaser-game.ts';
    initPhaserGame();
</script>
```

## 作成したAstroのコンポーネントを表示

&emsp;最後に、作成したAstroのコンポーネントを表示します。例えば、`index.astro`に以下のように記述します。

```astro
---
---
import PhaserGame from './phaser-game.astro';

<PhaserGame />
```

&emsp;これで、AstroでPhaser3で作成したゲームを埋め込むことができます。Phaser3のゲームをAstroのコンポーネントに埋め込むことで、簡単にゲームをWebページに表示することができます。