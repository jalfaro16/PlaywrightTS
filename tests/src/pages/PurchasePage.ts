import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PurchasePage extends BasePage {

    

  purchaseButton() {
    return this.button(/Purchase/i);
  }

  confirmationCB() {
    return this.text('I agree with the');
  }

  async setDeliveryLocation(location: string) {
       
        await this.byId('country').fill(location);

    }

    

    

  // Método alternativo: Verificar que NO haya productos extra (Validación estricta)
    async verifyExactCartList(productList: string[]) {
        // Obtenemos todos los textos de los productos visibles
        const visibleProducts = await this.page.locator('h4.media-heading a').allInnerTexts();
        
        // Comparamos que la lista visible sea igual a la lista del JSON
        // (Ordenamos ambas listas para evitar errores por orden de inserción)
        expect(visibleProducts.sort()).toEqual(productList.sort());
    }

}
