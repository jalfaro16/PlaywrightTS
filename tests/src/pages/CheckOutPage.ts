import { expect, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckOutPage extends BasePage {

    getCheckoutButton(): Locator {
    return this.button(/Checkout/i);
    }

    getPageTitle(): Locator {
    return this.link(/ProtoCommerce Home/i);
    }  


  // Método alternativo: Verificar que NO haya productos extra (Validación estricta)
    async verifyExactCartList(productList: string[]) {
        // Obtenemos todos los textos de los productos visibles
        const visibleProducts = await this.page.locator('h4.media-heading a').allInnerTexts();
        
        // Comparamos que la lista visible sea igual a la lista del JSON
        // (Ordenamos ambas listas para evitar errores por orden de inserción)
        expect(visibleProducts.sort()).toEqual(productList.sort());
    }

    private cleanPrice(priceText: string): number {
        // Elimina "₹.", espacios y comas. Deja solo números.
        const cleanString = priceText.replace(/[^0-9]/g, '');
        return Number(cleanString);
    }

    async getCartTotals(): Promise<{ calculated: number, displayed: number }> {
        // 1. Identificamos las filas que SON productos.
        // Filtramos por las que tienen el botón "Remove". 
        const productRows = this.page.locator('tbody tr').filter({ has: this.page.locator('.btn-danger') });
        
        // 2. Extraemos los textos de la columna de precios (la 4ta columna)
        // .allInnerTexts() devuelve un array con todos los textos encontrados: ['₹. 100000', '₹. 85000']
        const pricesTextList = await productRows.locator('td:nth-child(4) strong').allInnerTexts();
        console.log(`Productos encontrados para sumar: ${pricesTextList.length}`); //3,2,1 ... cambia según el test

        // 3. Sumamos dinámicamente
        let calculatedSum = 0;
        // Este bucle corre tantas veces como productos haya en la lista
        for (const priceText of pricesTextList) {
            const numericValue = this.cleanPrice(priceText); //convierte '₹. 100000' -> 100000
            calculatedSum += numericValue;
        }

        // 4. Obtenemos el Total final de la tabla
        const grandTotalText = await this.page.locator('td.text-right h3 strong').innerText();//innerText porque es un solo elemento, no una lista
        const grandTotalValue = this.cleanPrice(grandTotalText);

        return { 
        calculated: calculatedSum, 
        displayed: grandTotalValue 
       };
    }



}
