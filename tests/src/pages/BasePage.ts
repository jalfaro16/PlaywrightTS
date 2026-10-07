import {expect, Locator, type Page} from '@playwright/test'; 

export abstract class BasePage {

constructor(protected readonly page: Page) {}

button(name: string | RegExp): Locator {
    return this.page.getByRole('button', {name});
}

link(name: string | RegExp, exact=false): Locator {
    return this.page.getByRole('link', {name});
}

byId(id: string): Locator {
    return this.page.locator(`#${id}`);
}

textbox(name: string | RegExp): Locator {
    return this.page.getByRole('textbox', {name});      
}

text(name: string | RegExp): Locator {
    return this.page.getByText(name);      
}

get successAlert(): Locator {
        return this.page.locator('.alert-success');
    }

get termsCloseButton(): Locator {
        return this.page.locator('button.btn-info', { hasText: 'Close' });
    }    


}

export {Locator};
