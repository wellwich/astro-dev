---
title: "Astroで画像をズームさせる方法 - Astro Tips"
date: "2024-06-12"
description: "Astroで画像をズームさせる方法を紹介します。"
tags: ["Astro","Astro Tips"]
---

&emsp;Astroで画像をズームさせる方法を紹介します。

## 画像のズーム

&emsp;画像をズームさせるには、以下のようにします。

```astro
---
---
<Layout>
    <div class="overlay" id="overlay"></div>
    <div class="markdown">
        <!-- マークダウンコンテンツを表示 -->
        <Content />
    </div>
    <script is:inline>
        document.addEventListener("DOMContentLoaded", function () {
            const images = document.querySelectorAll(".markdown img");
            const overlay = document.getElementById("overlay");

            if (overlay) {
                images.forEach((image) => {
                    image.addEventListener("click", () => {
                        if (image.classList.contains("zoomed")) {
                            image.classList.remove("zoomed");
                            overlay.classList.remove("active");
                        } else {
                            image.classList.add("zoomed");
                            overlay.classList.add("active");
                        }
                    });
                });

                overlay.addEventListener("click", () => {
                    const zoomedImage = document.querySelector(".zoomed");
                    if (zoomedImage) {
                        zoomedImage.classList.remove("zoomed");
                        overlay.classList.remove("active");
                    }
                });
            }
        });
    </script>
</Layout>

```

cssファイルに以下のスタイルを追加します。

```css
.markdown img {
    cursor: pointer;
}

.zoomed {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    width: 80vw;
    height: 80vh;
    max-width: 80vw;
    max-height: 80vh;
    object-fit: contain;
    z-index: 1000;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999;
    display: none;
}

.overlay.active {
    display: block;
}
```

&emsp;これで、画像をクリックするとズーム表示されるようになります。

## ポイント

&emsp;Astroでは、is:inlineを使用することで直接JavaScriptをHTML内に記述することができます。

## まとめ

&emsp;Astroで画像をズームする方法を紹介しました。画像をクリックするとズーム表示されるようになります。