import { test} from '@fixtures/test-fixtures';
import { expect } from '@playwright/test';
import data from '@test-data/data.json';
import dataCounty from '@test-data/countries.json';


test.describe('E2E Verification', () => {

test.beforeEach(async ({ loginPage }) => {
await test.step('Go to Login Page', async () => {
    await loginPage.goto();
});
  });

    test('Add items to shopping cart and confir purchase', async ({ page, loginPage, homePage, checkoutPage, purchasePage }) => {
      await loginPage.login(process.env.User!, process.env.Password!);
      //Verify URL after login.
      await expect(page).toHaveURL('/angularpractice/shop');

      await expect(homePage.checkOutButton).toBeVisible();
      await homePage.addProductsToCart(data.products);
      const count = data.products.length;
      const expectedPattern = homePage.getCheckoutPattern(count);
      await expect(homePage.checkOutButton).toHaveText(expectedPattern);
      await homePage.checkOutButton.click();

      await expect(checkoutPage.getPageTitle()).toBeVisible();
      await expect(checkoutPage.getCheckoutButton()).toBeVisible();
      await checkoutPage.verifyExactCartList(data.products);
      const totals = await checkoutPage.getCartTotals();
      expect(totals.calculated).toBe(totals.displayed);
      await checkoutPage.getCheckoutButton().click();
      
      await expect(purchasePage.purchaseButton()).toBeVisible();
      //await purchasePage.setDeliveryLocation('United States');
      await purchasePage.setDeliveryLocation(dataCounty.countries[1]);
      await purchasePage.confirmationCB().click();
      //await expect(purchasePage.termsCloseButton).toBeVisible();
      //await purchasePage.termsCloseButton.click();
      await purchasePage.purchaseButton().click();
      await expect(checkoutPage.successAlert).toBeVisible();
      await expect(checkoutPage.successAlert).toContainText('Success!');

      });

  
        
    

    
});