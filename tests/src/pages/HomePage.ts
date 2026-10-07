import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    get checkOutButton() {
    return this.page.locator('.nav-link').filter({ hasText: /Checkout/i });
    }

    getCheckoutPattern(count: number): RegExp {
        return new RegExp(`Checkout\\s*\\(\\s*${count}\\s*\\)`, 'i');
    }

  /**
     * Recibe una lista de nombres de productos y hace clic en 'Add' para cada uno.
     * @param productNames Array de strings con los nombres de los productos
     */
    async addProductsToCart(productNames: string[]) {
        for (const productName of productNames) {
            const card = this.page.locator('app-card').filter({ hasText: productName });
            await card.getByRole('button', { name: 'Add' }).click();
            console.log(`Producto agregado: ${productName}`);
        }
    }

    

}
