import { decodeBase64 } from "../utils/base64";
import { BasePage, Locator } from "./BasePage";


export class LoginPage extends BasePage {

    

    async goto() {
        await this.page.goto('');
    }

    async login(username: string, password: string) {

        await this.byId('username').fill(username);
        await this.textbox('password').fill(password);
        await this.button('Sign In').click();

    }

    get errorMessage(): Locator {
    return this.page.locator('.alert.alert-danger');
    }

    getErrorMsg() {
    this.page.locator('.alert.alert-danger');
    }

}
