---
title: "Godotのボタンノードで任意の処理を実行する方法"
date: "2024-06-07"
description: "Godotのボタンノードで任意の処理を実行する方法を紹介します。"
tags: ["Godot"]
---

&emsp;Godotのボタンノードで任意の処理を実行する方法を紹介します。Godot4.xの方法が日本語でまとまっている情報が少ないため、参考になれば幸いです。

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

&emsp;このスクリプトでは、ボタンが押されたときに`_on_button_pressed`メソッドが呼び出されます。ここに任意の処理を追加することができます。

## 引数を伴う処理の実行

&emsp;ボタンが押されたときに引数を伴う処理を実行する場合は、以下のようにします。

```python
extends Button

func _ready():
    connect("pressed", Callable(self, "_on_button_pressed").bind("Hello, World!"))

func _on_button_pressed(message: String):
    print(message)
    # 任意の処理をここに追加
```