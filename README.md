# AIで作るデジタル手帳｜Instagramリール特典ページ

ChatGPTでデジタル手帳を作り、Etsyに出品するまでの3STEPを紹介する1ページ完結の特典ページです。
HTML / CSS / JavaScript だけの静的サイトで、ビルド作業は不要です。

- 公開ページ: <https://mion-ai-mama.github.io/digital-planner-tokuten/>
- リポジトリ: <https://github.com/mion-ai-mama/digital-planner-tokuten>

## ファイル構成

```text
index.html   ページ本体（文章・プロンプト本文もここ）
style.css    配色・レイアウト（色は先頭の :root で変更）
script.js    コピー機能 / アコーディオン / スクロール演出 / 設定値
assets/      favicon
docs/        requirements.md（要件定義）/ SCOPE_PROGRESS.md（進捗）
```

## 設定値（script.js の先頭）

| 定数 | 内容 |
|---|---|
| `LINE_URL` | 最終CTAボタンの遷移先。空にするとボタンは表示されません |
| `OGP_IMAGE_URL` | SNSシェア用画像のURL。空なら `og:image` を出力しません |

## ローカル確認

```bash
python3 -m http.server 8000   # http://localhost:8000/
```

## 公開

GitHub Pages（`main` ブランチのルート）で配信。文章を直したら `index.html` を編集して push するだけです。
