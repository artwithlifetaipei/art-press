# 🏛️ Looom Club (ART PRESS Asia) 專案專屬開發規範與規格書

本規範自動套用於 `Looom Club` 專案目錄。AI 在修改本專案任何檔案時，必須同時遵守根目錄全局規範與本專案專屬規範。

---

## 1. 🔒 全站凍結保護區清單（未經點名嚴禁觸碰）

除非使用者在對話中**明確點名**要修改該頁面，否則以下所有已完成系統均處於**「凍結保護狀態」**，AI 嚴禁順手修改、格式化或重構：

1. **全站共用外框**：`src/app/layout.tsx`（頂部導覽列 Global Nav、底部電子報與版權頁尾 Global Footer）
2. **首頁與媒體內容系統**：
   - 首頁：`src/app/page.tsx`、`src/app/page.module.css`
   - Magazine 雜誌列表與內頁：`src/app/magazine/page.tsx`、`src/app/magazine/[slug]/*`
   - Looom People 人物專訪列表與內頁：`src/app/people/page.tsx`、`src/app/people/[slug]/page.tsx`
   - 聯絡我們：`src/app/contact/page.tsx`
   - 共用元件：`src/components/EditorialCard.tsx`、`MobileNav.tsx`、`Search.tsx`、`PageTransition.tsx`
3. **俱樂部介紹與入會報名金流系統（高風險鎖定）**：
   - 俱樂部介紹頁：`src/app/looom-club/page.tsx`
   - 入會申請表單：`src/app/looom-club/apply/page.tsx`
   - 方案與金額邏輯：`src/lib/looom-applications.ts`（Basic Tier NT\$18,800/yr、Premium Tier NT\$28,800/yr、匯款憑證與電子簽名）
4. **Admin 後台管理系統（高風險鎖定）**：
   - 文章管理與編輯器：`src/app/admin/page.tsx`、`src/app/admin/editor/[id]/page.tsx`
   - 會員申請審核與 CSV 匯出：`src/app/admin/members/page.tsx`

---

## 2. 🛑 防止「改 A 壞 B」：針對 `globals.css` (1,870 行) 的特別防護鐵律

本專案使用原生 CSS (`src/app/globals.css`) 且累積超過 1,870 行，許多頁面共用同名類別。為徹底杜絕「改 A 頁面卻導致 B 頁面跑版」：

- **禁止直接覆寫共用 Class**：
  - 絕對禁止為了配合單一頁面的視覺調整，直接去修改 `globals.css` 裡的 `.container`、`.global-nav`、`.nav-links`、`.editorial-card`、`.caps-label`、`.serif`、`body`、`a` 等跨頁面共用選擇器。
- **單頁修改必須「局部隔離」**：
  - 當使用者要求調整某個特定頁面（例如：只改「入會申請頁」或只改「人物專訪內頁」）時，AI 必須：
    1. 使用該頁面專屬的 class 前綴（例如 `.looom-apply-...` 或 `.people-detail-...`），或使用獨立的 `*.module.css`。
    2. 若發現原本該區塊綁定了共用 class，應先在幕後拆出獨立的 class 名稱再改，或者先停下來用白話文詢問使用者：「這個樣式目前跟『XX 頁面』共用，請問您只想改這一頁（我幫您獨立拆開），還是兩邊要一起改？」

---

## 3. 🎨 品牌美學與視覺一致性規範 (Art Authority V4)

當新增區塊或調整畫面時，**嚴禁 AI 自創顏色、字體或間距**，必須 100% 沿用以下品牌設計基因與對標頁面：

- **標準色票（僅限使用 CSS 變數）**：
  - 背景畫布：`var(--canvas)` (`#FFFFFF` 純白)
  - 主文字墨色：`var(--ink)` (`#000000` 純黑)
  - 品牌強調色（Hover／重點標示）：`var(--accent)` (`#ff5858` 品牌紅粉)
  - 次要輔助字色：`var(--muted)` (`#777777`)
  - 細緻分隔線：`var(--border)` (`#E8E8E8` `1px solid`)
- **標準字體系統**：
  - 權威襯線體（主標題、雜誌內文、導覽列）：`var(--font-serif)` (`Cormorant Garamond`, `Songti TC`, `Noto Serif TC`)
  - 現代無襯線體（標籤、分類小標 `.caps-label`、表單介面）：`var(--font-sans)` (`Inter`)
- **空間與留白比例**：
  - 最大內容寬度：`var(--max-width)` (`1400px`)
  - 左右大留白邊距：`var(--container-padding)` (`8vw`)
  - 區塊垂直大間距：`var(--section-gap)` (`200px`，手機版依既有 `@media` 等比縮放)
- **視覺改動雙軌制**：
  - 小區塊微調／新增：強制以現有頁面（如 `/magazine`、`/people`、`/looom-club`）為範本照抄排版與按鈕風格。
  - 大版面重設：先提供視覺草稿或方案對比，使用者確認後再寫入正式頁面。

---

## 4. 📱 交付前自動檢查與白話驗收要求

1. **雙裝置防跑版驗證**：每次修改後，AI 必須自動驗證**桌面版（1400px 寬螢幕）**與**手機版（375px 直式螢幕，含 `MobileNav` 漢堡選單與表格換行）**均無跑版、文字重疊或橫向破版。
2. **附帶白話驗收單**：回報時清楚列出「✅ 這次改了哪裡」、「🛡️ 確認其他凍結頁面與後台未受影響、桌面與手機版正常」、「⏪ 隨時可說『還原上一步』退回」。
