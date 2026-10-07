import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { HomePage } from '@pages/HomePage';
import { CheckOutPage } from '@pages/CheckOutPage';
import { PurchasePage } from '@pages/PurchasePage';

type Pages = {
    loginPage: LoginPage;
    homePage: HomePage;
    checkoutPage: CheckOutPage;
    purchasePage: PurchasePage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckOutPage(page));
  },
  purchasePage: async ({ page }, use) => {  
    await use(new PurchasePage(page));
  }
});