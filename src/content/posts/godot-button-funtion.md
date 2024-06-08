---
title: "Godotのボタンノードで任意の処理を実行する方法"
date: "2024-06-07"
description: "Godotのボタンノードで任意の処理を実行する方法を紹介します。"
tags: ["Godot"]
---

&emsp;Godotのボタンノードで任意の処理を実行する方法を紹介します。

## ボタンノードの作成

&emsp;まず、ボタンノードを作成します。

## ボタンノードにスクリプトを追加

&emsp;次に、ボタンノードにスクリプトを追加します。

```python
extends Button

func _ready():
    connect("pressed", Callable(self, "_on_button_pressed"))

func _on_button_pressed():
    print("Button pressed")
    # 任意の処理をここに追加
```