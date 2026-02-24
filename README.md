# 條碼比對小工具 (Barcode Compare Tool)

這是一個專為手機瀏覽器設計的單頁式前端網頁應用程式（SPA）。使用者可透過手機相機掃描一維（1D）或二維（2D/QR Code）條碼，擷取特定字串並進行交叉比對。

最新版本導入了 **「雙引擎掃描架構」**，完美解決了常見的 1D 條碼掃描效能不佳、畫面變暗等問題，並新增了**手電筒 (Torch) 控制**與**多國語系即時切換**功能。

## 🌟 功能特色

- **純前端實作**：無需後端伺服器，使用純 HTML5, CSS3 與 Vanilla JavaScript 編寫。
- **🚀 雙引擎極速掃描架構**：
  - **1D 模式 (Quagga2)**：專為工業/物流一維條碼優化，支援綠框動態追蹤與「防抖過濾機制（連續多幀確認）」，大幅降低誤讀率。
  - **2D 模式 (html5-qrcode)**：專注於 QR Code 高速解析，支援全畫面無遮罩掃描（不變暗）。
- **🔦 智慧手電筒 (Torch) 支援**：自動偵測手機硬體，支援在掃描畫面中直接開關手電筒（具備嚴謹的硬體相容性檢查與錯誤動畫提示）。
- **🌍 多國語系支援 (i18n)**：內建**繁體中文 (zh-TW)**、**英文 (en)** 與**越南文 (vi)**。透過畫面右上角的下拉選單即可「即時切換」介面語言，無需重新整理網頁。
- **✂️ 客製化擷取**：內建自訂函式，可依需求修改邏輯以擷取條碼中的特定區段文字（如：只取前 10 碼或特定格式的數字）。
- **⚖️ 雙模式比對**：
  - **自動比對**：當 A 欄位與 B 欄位皆取得資料時，自動彈出比對結果。
  - **手動比對**：掃描完成後，由使用者手動點擊按鈕進行比對。
- **🎯 直覺的比對結果**：彈出式視窗（Modal）上下並列顯示雙方字串，並清楚標示比對成功/失敗。
- **🧹 獨立清除功能**：可個別清除 A 欄位、B 欄位，或一鍵清空所有資料。

## 🚀 線上預覽與使用 (Live Demo)

您可以直接點擊以下連結開啟此工具（請使用手機開啟以獲得最佳體驗）：
👉 **[點我開啟條碼比對小工具](https://sspig0127.github.io/barcode-compare-tool/)**

> ⚠️ **注意**：基於瀏覽器安全政策，存取相機與手電筒功能必須在 `https://` 或是本地端 `localhost` 環境下執行。

---

## 🛠️ 開發與客製化指南

### 1. 如何修改「1D 條碼防抖強度」？
Quagga2 在讀取 1D 條碼時非常靈敏，為了避免把雜訊誤認為條碼，程式內建了防抖機制。你可以修改 `index.html` 中的變數來調整需連續辨識成功的幀數：

```javascript
// 預設需要連續 2 次掃出同樣字串才算成功 (數字越大越嚴謹，但掃描體感會稍微變慢)
const REQUIRED_MATCHES = 2; 
```

### 2. 如何新增其他語言（如：印尼文、泰文）？

本工具採用輕量化的字典物件來管理多國語系。打開 index.html，找到 translations 物件，並依照格式新增您需要的語言即可：

```javascript
const translations = {
    'zh-TW': { title: '條碼比對工具', ... },
    'en': { title: 'Barcode Matcher', ... },
    'vi': { title: 'Công cụ so sánh mã vạch', ... },
    // 在這裡新增新的語言，例如印尼文 (id)：
    // 'id': { title: 'Alat Pembanding Barcode', ... }
};
```



新增完畢後，記得在 HTML 的 <select id="langSelector"> 中加入對應的 <option value="id">Bahasa Indonesia</option> 即可完成擴充！



📦 使用技術
- HTML5 / CSS3 / Vanilla JavaScript

- [html5-qrcode - 負責 2D / QR Code 高效解析](https://www.google.com/url?sa=E&q=https%3A%2F%2Fgithub.com%2Fmebjas%2Fhtml5-qrcode)

- [Quagga2 (@ericblade/quagga2) - 負責 1D 條碼解析與即時定位追蹤](https://github.com/ericblade/quagga2)


## 📄 授權條款 (License)

[MIT License](https://www.google.com/url?sa=E&q=LICENSE)
