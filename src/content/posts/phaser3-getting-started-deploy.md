---
title: "Phaser3で作ったゲームを無料で公開する方法"
date: "2024-06-01"
description: "Phaser3で作ったゲームを無料で公開する方法を紹介します。"
tags: ["Phaser3"]
---
　Phaser3で作ったゲームを無料で公開する方法を紹介します。

　CloudFlare Pagesを使えば、無料でwebサイトを公開することができます。CloudFlare Pagesは、GitHubにpushするだけでwebサイトを公開できるサービスです。GitHubのアカウントがあれば、すぐに始めることができます。

## CloudFlare Pagesの登録
　CloudFlare Pagesの登録は、[こちら](https://dash.cloudflare.com/sign-up)から行います。
### 1．Sign Upする
　まず、メールアドレスとパスワードを入力して、Sign Upします。すると以下のような画面が出るので、 **「Add a website or application」** をクリックします。
![CloudFlare Pagesの登録](https://r2dev.wellwich.com/images/deploy-phaser3_1.jpg)
### 2．CloudFlare Pagesに移動する
![CloudFlare Pagesに移動する](https://r2dev.wellwich.com/images/deploy-phaser3_2.jpg)
![CloudFlare Pagesに移動する](https://r2dev.wellwich.com/images/deploy-phaser3_3.jpg)
### 3．GitHubアカウントを連携する
![GitHubアカウントを連携する](https://r2dev.wellwich.com/images/deploy-phaser3_4.jpg)
### 4．リポジトリを選択する
![リポジトリを選択する](https://r2dev.wellwich.com/images/deploy-phaser3_5.jpg)
### 5．デプロイする
![デプロイする](https://r2dev.wellwich.com/images/deploy-phaser3_6.jpg)
1. **「Framework preset」** は **「None」** を選択します。
2. **「Build command」** は **「npm run build」** を入力します。
3. **「Build output directory」** は **「dist」** を入力します。
4. **「Environment variables」** は **「Add variable」** をクリックして、以下のように入力します。
    - **「Key」** は **「NODE_VERSION」** を入力します。
    - **「Value」** は **「16」** を入力します。
5. **「Save and Deploy」** をクリックします。
### 6．デプロイが完了するまで待つ
### 7．デプロイが完了したら、URLを確認する
　URLは、 **「https://xxx.pages.dev/」** となるので、ブラウザでアクセスしてみます。これでPhaser3のゲーム画面が映れば成功です。