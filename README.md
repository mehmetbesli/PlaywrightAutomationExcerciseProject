# Playwright Test Otomasyonu - Kılavuz (Run & Configuration Guide)

Bu proje, Playwright ve TypeScript kullanarak geliştirilmiş uçtan uca (E2E) test otomasyon projesidir. Proje; Page Object Model (POM) mimarisi, `.env` tabanlı ortam yönetimi, saniye duyarlı dinamik raporlama ve ekran görüntüsü altyapısı ile donatılmıştır.

---

## ⚙️ Çoklu Ortam Yönetimi (`.env` Dosyası)

Projenin ana dizininde bulunan **`.env`** dosyası, testlerin koşacağı adresi ve test verilerini yönetmenizi sağlar. Kod değiştirmeden bu değişkenleri güncelleyebilirsiniz:

```env
BASE_URL=https://automationexercise.com
TEST_EMAIL_PREFIX=testuser
TEST_PASSWORD=TestPass123!
```

*   **`BASE_URL`**: Testlerin otomatik olarak başlatılacağı web adresi.
*   **`TEST_EMAIL_PREFIX`**: Kayıt ve giriş testlerinde kullanılacak benzersiz e-postaların ön eki.
*   **`TEST_PASSWORD`**: Yeni kayıt edilen kullanıcıların şifresi.

---

## 🚀 Kısayol Komutları (NPM Scripts)

Projedeki testleri koşturmak veya eski raporları temizlemek için `npx` komutları yerine `package.json` içine tanımladığımız şu kısayolları kullanabilirsiniz:

### 1. Test Koşum Komutları

*   **Chromium ile Arka Planda Çalıştırma (Headless):**
    ```bash
    npm run test
    ```
*   **Chromium ile Tarayıcıyı Açarak İzleme (Headed):**
    ```bash
    npm run test:headed
    ```
*   **Etkileşimli Arayüz (UI Mode) Açma:**
    ```bash
    npm run test:ui
    ```
*   **Tüm Tarayıcılarda (Chromium, Firefox, WebKit) Koşturma:**
    ```bash
    npm run test:all
    ```

### 2. Raporlama ve Temizlik Komutları

*   **En Son HTML Raporunu Açma:**
    ```bash
    npm run test:report
    ```
*   **Tüm Eski Rapor ve Geçici Dosyaları Temizleme:**
    ```bash
    npm run clean:reports
    ```

---

## 📊 Rapor ve Dosya Düzeni

*   **HTML Raporu:** `Reports/html/reports_[Yıl-Ay-Gün_Saat-Dakika-Saniye]/index.html` olarak kaydedilir.
*   **Ekran Görüntüleri ve Videolar (Sadece Hata Durumunda):** `Reports/screenshotsAndVideo/` klasörünün altına `screenshots_[Tarih_Saat].png` ve `video_[Tarih_Saat].webm` isimleriyle kaydedilir.
