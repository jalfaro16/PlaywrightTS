import { test} from '@fixtures/test-fixtures';
import { expect } from '@playwright/test';
import { decodeBase64 } from 'tests/src/utils/base64';
import { decrypt } from 'tests/src/utils/crypto';


test.describe('Login Tests', () => {

// base64 decode
// const user = decodeBase64(process.env.User!);
// const pass = decodeBase64(process.env.Password!);

  //Using AES-256-CBC decryption for credentials
  const user = decrypt(process.env.USER!);
  const pass = decrypt(process.env.PASSWORD!);


  test.beforeEach(async ({ loginPage }) => {
    await test.step('Navegar a la página de login', async () => {
    await loginPage.goto();
  });});

  test('should login successfully', async ({ page, loginPage }) => {
    await loginPage.login(user, pass);
    await expect(page).toHaveURL('/angularpractice/shop', {
timeout: 60_000,
});
});

  test('should show error message on failed login', async ({ loginPage }) => {
    await loginPage.login("test", "123");
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Incorrect username/password.');   
  });

});