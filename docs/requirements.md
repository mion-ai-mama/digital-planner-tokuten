# AIで作るデジタル手帳｜Instagramリール特典ページ 要件定義書

## 0. アーキ構成

- 確定アーキ: #6 WEBアプリ（決定論）＝静的サイト
- 操作者: ブラウザのエンドユーザー（Instagram DM経由のスマホ閲覧者）
- AI本体(プロンプトY): なし（読者が自分のChatGPTで使うプロンプトを掲載するだけ。本ページはAIを呼ばない）
- MCP: なし
- 種別: Web型（静的サイト）
- 自社DB: なし
- フロントUI: あり
- 動的変数: なし
- 配布: マイ専用（個人GitHubリポジトリ `mion-ai-mama/digital-planner-tokuten`・GitHub Pages）

## 1. プロジェクト概要

### 成果目標（100字以内）
InstagramのDMから来た40代前後の女性が、ChatGPTのコピペ用プロンプト2つでデジタル手帳を1つ作れる。「作る」と「収入につなげる」は別だと気づき、自然にLINE登録へ進む無料特典ページ。

### 成功指標
定量:
1. 最下部到達率 60%以上
2. コピーボタン押下率 40%以上（STEP1・STEP2それぞれ）
3. LINE CTAクリック率 10%以上（最下部1箇所のみ）
4. 375〜430px幅で横スクロールなし・初回表示3秒以内

定性:
1. 「私にも作れた」という小さな成功体験（教材感を出さない）
2. 大人かわいい世界観で抵抗なく読める
3. 売り込み感なく「作れる≠稼げる」に納得してLINEへ進める
4. 収益保証・「リスクゼロ」表現なし、Etsy規約への注意を併記

### 制作方針
- デジタル手帳販売を完全攻略させる教材にしない。内容を勝手に増やさない
- LINE CTAはページ最下部＋画面下の常時表示ボタン（2026-09-30 ユーザー指示で追加）。特典を読ませる前に誘導しない
- CTAには過去ページ標準の「AIマネタイズの教科書」「AI収益化サポート会」の案内を含める（ユーザー指示 2026-09-29）

## 2. 業務フロー（ユーザー体験）

Instagramリール → コメント → DM → 本ページ → ChatGPTで手帳を作る → 「意外と簡単」 → 「作れる」と「収入」は別と理解 → LINE

## 3. ページ詳細仕様（単一ページ P-001 `index.html`）

| # | セクション | 内容 |
|---|-----------|------|
| 1 | ファーストビュー | 「AIで作る／デジタル手帳」、サブタイトル「ChatGPTで作ってEtsyに出品するまでの3STEP」、バッジ「コピペで使えるプロンプト付き」、導入文、STEP1→2→3のミニフロー |
| 2 | STEP 1｜まずは好きな柄を作ろう | 説明、コピペ用プロンプト＋コピーボタン、`[ ]`の説明と柄の例5種（floral/marble/check/botanical/abstract pattern）、色追加のTIP（beige / dusty pink / sage green / light blue） |
| 3 | STEP 2｜作った背景を手帳にしよう | 説明、コピペ用プロンプト＋コピーボタン、「うまくいかないときは？」アコーディオン（3項目のみ） |
| 4 | 慣れたらこんな手帳も作れるよ | WEEKLY / MONTHLY PLANNER・HABIT / MEAL PLANNER・BUDGET TRACKER のカード5枚＋一文説明。詳細プロンプトなし |
| 5 | STEP 3｜Etsyに出品してみよう | デジタル商品の特徴（在庫・梱包・発送なし。「リスクゼロ」不使用）、PDF化の指示文、出品の5手順 |
| 6 | 出品前にここだけチェック | 注意カード（AI開示／模倣回避／文字・スペル確認／出品料・手数料／規約変更の注記） |
| 7 | ここまでできたら完成👏 | 雰囲気を変えた達成メッセージ |
| 8 | LINE導線（最終CTA） | 「でも、“作れる”だけでは収入にはならない。」＋本文＋ボタン「AIを仕事につなげる方法を見る」＋「LINEで無料で受け取れます」 |

### 掲載するプロンプト（欠落なく原文どおり）

STEP1:
```
Create a seamless, stylish background pattern for a digital planner cover.

Style: [floral / marble / check / botanical / abstract pattern]

Soft, muted colors.
No text, no logos, no people.

Vertical A4 ratio.
```

STEP2:
```
Use the uploaded background image to create a simple and stylish daily planner.

Keep the background design visible.

Add the following sections:

DAILY PLANNER

Date

Today's Top 3

To-do List

Schedule

Notes

Use a clean, easy-to-read layout.

Vertical A4 ratio.
```

うまくいかないとき（3項目のみ）:
- 背景が変わってしまった → 「背景画像は変更せず、そのまま使用してください」と追加で伝える
- 文字がおかしい → AI画像では文字が崩れる場合がある。必ず完成画像の文字を確認する
- 書き込む場所が見にくい → 「記入欄の部分だけ背景を薄くして、文字を書き込みやすくしてください」と追加する

### コピー機能
- 2つのプロンプトに「コピーする」ボタン。押下後「コピーしました ✓」を1〜2秒表示して元に戻す
- Clipboard API（外部ライブラリなし）。非対応環境（Instagramアプリ内ブラウザ等）では `execCommand('copy')` にフォールバック
- コピー対象は表示テキストと同一の単一の源から取得（欠落防止）

### 設定定数（`script.js` 先頭）
- `LINE_URL`（後から差し替え。未設定時はボタンが誤動作しないこと）
- `OGP_IMAGE_URL`（空の状態で構造だけ用意。空なら `og:image` を出力しない）

## 4. 認証・データ設計

- 認証・ユーザー登録・ログイン: なし（全員が閲覧可能）
- データベース・バックエンド: なし

## 5. セキュリティ要件

- HTTPS（GitHub Pages標準）
- 外部リンクに `rel="noopener noreferrer"`
- ユーザー入力を扱わない（XSS面なし）。個人情報・トラッキング入力なし
- ヘルスチェック・グレースフルシャットダウンはサーバーがないため対象外

## 6. 技術スタック

- HTML5 / CSS3 / Vanilla JavaScript（ビルドなし・フレームワークなし）
- ホスティング: GitHub Pages
- 構成（兄弟リポジトリと同じフラット構成）: `index.html` / `style.css` / `script.js` / `README.md` / `assets/` / `docs/`
- 文章の単一の源は `index.html`（プロンプト本文もここ）

## 7. 外部サービス一覧

| サービス | 用途 | 費用 |
|---------|------|------|
| LINE公式アカウント | 最終CTAの遷移先（URLは後から差し替え） | 既存 |
| GitHub / GitHub Pages | 管理・公開 | 無料 |
| Etsy | 本文中の説明のみ（連携なし） | ― |

## 8. AI設計

対象外（AI本体Yなし）。ANTHROPIC_API_KEY等の環境変数も不要。

## 9. デザイン・品質

- 配色: 標準の大人ピンク×アイボリー（`--color-bg #fdfaf7` / `--color-bg-soft #fbeeec` / `--color-primary #d03f64` / `--color-primary-dark #b02c52` / `--color-accent-light #f7dfe0` / `--color-text #3d322f` / `--color-text-muted #8a7972` / `--color-border #f0dfdc`）。青・紫・ネオン・派手なグラデーション不可
- カードUIでSTEPを明確に区切る。スマホ375〜430px最優先、PCでも崩れない
- 画像を使う場合は `<img>` に width/height 属性を付けず、CSSで `aspect-ratio` + `object-fit: contain`
- title: 「AIで作るデジタル手帳｜ChatGPTで作ってEtsyに出品する3STEP」
- description: 「ChatGPTを使ってデジタル手帳を作る方法を3ステップで紹介。コピペで使えるプロンプト付き。」
- コード品質: 関数100行以下 / ファイル700行以下（index.htmlは文章保持のため対象外）/ 複雑度10以下 / 行長120文字

## 10. 禁止事項

収益保証（「誰でも稼げる」等）／「リスクゼロ」／実績のない収益額／Etsyで必ず売れる表現／不要なEtsy攻略情報／特典内容の作り込み／LINEへの過剰誘導／派手なAI風デザイン／ログイン・DB・ユーザー登録・複雑なバックエンド

## 11. 実装後の確認項目

1. 375pxでレイアウト崩れなし　2. 430pxで正常　3. PCで正常　4. 2つのコピーボタン動作
5. コピー文に欠落なし　6. LINE URL差し替えが容易　7. 外部リンク正常
8. 「リスクゼロ」「必ず売れる」等が入っていない　9. STEP1→2→3の流れがひと目で分かる
10. 最終CTAまで自然に読み進められる

完了報告には、変更ファイル一覧と、ユーザー側で差し替える箇所（LINE URL・OGP画像URL）を含める。

## 12. 調査メモ

- Etsyの現行規約（2026-07-09発効）: 自分のオリジナルのプロンプトでAI生成した作品は出品可。商品説明でAI使用の開示が必須。出品料・手数料の金額は変動するため本文には金額を書かず、公式の最新情報の確認を促す
- ChatGPTの画像生成は「A4縦」指定でも比率が完全にA4にならない場合がある。PDF化の説明文は断定せず、うまくいかない時の一言を添える方向で検討（Step#10で確認）
