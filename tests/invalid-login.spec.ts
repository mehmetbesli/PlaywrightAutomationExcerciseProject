import { test } from '../utils/customTest';
import { testData } from '../data/testData';
import { messages } from '../data/messages';
import { HomePage } from '../pages/HomePage';
import { HeaderPage } from '../pages/HeaderPage';
import { SignupLoginPage } from '../pages/SignupLoginPage';

test.describe('Authentication Test Suite', () => {
  let homePage: HomePage;
  let headerPage: HeaderPage;
  let signupLoginPage: SignupLoginPage;

  test.beforeEach(async ({ page }) => {
    // Block Google Ads scripts and request routes to prevent popup vignettes and flaky test failures
    await page.route('**/*', route => {
      const url = route.request().url();
      if (
        url.includes('googleads') ||
        url.includes('doubleclick') ||
        url.includes('adservice') ||
        url.includes('googlesyndication')
      ) {
        route.abort();
      } else {
        route.continue();
      }
    });

    homePage = new HomePage(page);
    headerPage = new HeaderPage(page);
    signupLoginPage = new SignupLoginPage(page);
  });


  test('Login: Attempt to log in with invalid credentials and verify error message', async () => {
    // Adım 1: Ana sayfaya git ve sayfanın yüklendiğini doğrula
    await homePage.navigateTo('/');
    await homePage.verifyHomePageLoaded();

    // Adım 2: Signup / Login sayfasına git ve Login başlığını doğrula
    await headerPage.clickLoginSignup();
    await signupLoginPage.verifyLoginHeader(messages.signupLogin.loginHeader);

    // Adım 3: Geçersiz e-posta ve şifre girerek Giriş yapmayı dene
    await signupLoginPage.login(
      testData.invalidLogin.email,
      testData.invalidLogin.password
    );

    // Adım 4: Hata mesajının göründüğünü ve doğru metni içerdiğini doğrula
    await signupLoginPage.verifyLoginErrorMessage(messages.signupLogin.loginErrorMsg);
  });
});
