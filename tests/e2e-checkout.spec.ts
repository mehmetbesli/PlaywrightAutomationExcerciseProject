import { test } from '../utils/customTest';
import { testData } from '../data/testData';
import { messages } from '../data/messages';
import { HomePage } from '../pages/HomePage';
import { HeaderPage } from '../pages/HeaderPage';
import { SignupLoginPage } from '../pages/SignupLoginPage';
import { SignupDetailsPage } from '../pages/SignupDetailsPage';
import { AccountCreatedPage } from '../pages/AccountCreatedPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';

test.describe('End-to-End Test Automation Suite', () => {
  let homePage: HomePage;
  let headerPage: HeaderPage;
  let signupLoginPage: SignupLoginPage;
  let signupDetailsPage: SignupDetailsPage;
  let accountCreatedPage: AccountCreatedPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let paymentPage: PaymentPage;

  // Generate unique credentials for the test execution to avoid conflicts
  const timestamp = Date.now();
  const uniqueName = `${testData.signUp.name}_${timestamp}`;
  const uniqueEmail = `${testData.signUp.emailPrefix}_${timestamp}@${testData.signUp.emailDomain}`;
  const password = testData.signUp.getPassword();

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

    // Page objects initialization
    homePage = new HomePage(page);
    headerPage = new HeaderPage(page);
    signupLoginPage = new SignupLoginPage(page);
    signupDetailsPage = new SignupDetailsPage(page);
    accountCreatedPage = new AccountCreatedPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    paymentPage = new PaymentPage(page);
  });


  test('E2E: Register User, Search and Add Product to Cart, Checkout and Delete Account', async () => {
    // ----------------------------------------------------
    // Adım 1: Ana sayfaya git ve sayfanın yüklendiğini doğrula
    // ----------------------------------------------------
    await homePage.navigateTo('/');
    await homePage.verifyHomePageLoaded();

    // ----------------------------------------------------
    // Adım 2: Signup / Login sayfasına git ve başlığı doğrula
    // ----------------------------------------------------
    await headerPage.clickLoginSignup();
    await signupLoginPage.verifySignupHeader(messages.signupLogin.newUserSignupHeader);

    // ----------------------------------------------------
    // Adım 3: İsim ve benzersiz e-posta girerek Signup'a tıkla
    // ----------------------------------------------------
    await signupLoginPage.signup(uniqueName, uniqueEmail);
    await signupDetailsPage.verifyDetailsPageLoaded();

    // ----------------------------------------------------
    // Adım 4: Hesap ve Adres detaylarını doldurup hesabı oluştur
    // ----------------------------------------------------
    await signupDetailsPage.fillAccountInformation({
      title: testData.signUp.title,
      password: password,
      day: testData.signUp.dayOfBirth,
      month: testData.signUp.monthOfBirth,
      year: testData.signUp.yearOfBirth,
      newsletter: testData.signUp.newsletter,
      optin: testData.signUp.optin,
    });

    await signupDetailsPage.fillAddressInformation({
      firstName: testData.address.firstName,
      lastName: testData.address.lastName,
      company: testData.address.company,
      address1: testData.address.address1,
      address2: testData.address.address2,
      country: testData.address.country,
      state: testData.address.state,
      city: testData.address.city,
      zipcode: testData.address.zipcode,
      mobileNumber: testData.address.mobileNumber,
    });

    await signupDetailsPage.clickCreateAccount();

    // ----------------------------------------------------
    // Adım 5: "ACCOUNT CREATED!" mesajını doğrula ve devam et
    // ----------------------------------------------------
    await accountCreatedPage.verifyAccountCreated(messages.registration.accountCreatedHeader);
    await accountCreatedPage.clickContinue();

    // ----------------------------------------------------
    // Adım 6: "Logged in as [Kullanıcı Adı]" bilgisini header'da doğrula
    // ----------------------------------------------------
    await headerPage.verifyLoggedInAs(uniqueName);

    // ----------------------------------------------------
    // Adım 7: Products sayfasına git ve sayfanın yüklendiğini doğrula
    // ----------------------------------------------------
    await headerPage.clickProducts();
    await productsPage.verifyProductsPageLoaded();

    // ----------------------------------------------------
    // Adım 8: Ürünü ara ve arama sonuçlarını doğrula
    // ----------------------------------------------------
    await productsPage.searchProduct(testData.product.searchQuery);
    await productsPage.verifySearchResultsHeader('Searched Products');

    // ----------------------------------------------------
    // Adım 9: İlk ürünü sepete ekle ve başarı pop-up'ını doğrula
    // ----------------------------------------------------
    await productsPage.addFirstProductToCart();
    await productsPage.verifyAddedToCartModal(
      messages.cart.addedPopupTitle,
      messages.cart.addedPopupMessage
    );

    // ----------------------------------------------------
    // Adım 10: Sepete git ve sepet sayfasını doğrula
    // ----------------------------------------------------
    await productsPage.clickViewCart();
    await cartPage.verifyCartPageLoaded();
    await cartPage.verifyCartItemsCount(1);

    // ----------------------------------------------------
    // Adım 11: Checkout sayfasına ilerle ve adres doğrulaması yap
    // ----------------------------------------------------
    await cartPage.clickProceedToCheckout();
    await checkoutPage.verifyCheckoutPageLoaded();

    const expectedFullName = `${testData.address.firstName} ${testData.address.lastName}`;
    const expectedCityStateZip = `${testData.address.city} ${testData.address.state} ${testData.address.zipcode}`;

    await checkoutPage.verifyDeliveryAddressDetails({
      fullName: expectedFullName,
      company: testData.address.company,
      address1: testData.address.address1,
      address2: testData.address.address2,
      cityStateZip: expectedCityStateZip,
      country: testData.address.country,
      phone: testData.address.mobileNumber,
    });

    // Açıklama alanına not yazıp sipariş oluştur
    await checkoutPage.fillComment(testData.orderComment);
    await checkoutPage.clickPlaceOrder();

    // ----------------------------------------------------
    // Adım 12: Ödeme sayfasına kart bilgilerini gir ve siparişi onayla
    // ----------------------------------------------------
    await paymentPage.verifyPaymentPageLoaded();
    await paymentPage.payAndConfirm({
      nameOnCard: testData.payment.nameOnCard,
      cardNumber: testData.payment.cardNumber,
      cvc: testData.payment.cvc,
      expiryMonth: testData.payment.expiryMonth,
      expiryYear: testData.payment.expiryYear,
    });

    // ----------------------------------------------------
    // Adım 13: "ORDER PLACED!" başarı mesajını doğrula ve devam et
    // ----------------------------------------------------
    await paymentPage.verifyOrderPlaced(messages.payment.orderPlacedHeader);
    await paymentPage.clickContinue();

    // ----------------------------------------------------
    // Adım 14: Hesabı sil, silindiğini doğrula ve bitir
    // ----------------------------------------------------
    await headerPage.clickDeleteAccount();
    await accountCreatedPage.verifyAccountDeleted(messages.registration.accountDeletedHeader);
    await accountCreatedPage.clickContinue();
  });
});
