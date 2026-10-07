import { decodeBase64 } from "../utils/base64";
import { BasePage, Locator } from "./BasePage";
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {

    

    async goto() {
        await this.page.goto('');
    }

    async login(username: string, password: string) {

    const usernameInput = this.byId('username');
    const passwordInput = this.textbox('password');
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await expect(usernameInput).toHaveValue(username);
    await expect(passwordInput).toHaveValue(password);
    await this.button('Sign In').click();
    await this.page.waitForURL('**/angularpractice/shop', {
    timeout: 30_000,
    });
    }

    get errorMessage(): Locator {
    return this.page.locator('.alert.alert-danger');
    }

    getErrorMsg() {
    this.page.locator('.alert.alert-danger');
    }

}
