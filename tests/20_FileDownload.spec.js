import { test, expect } from '@playwright/test';
const fs = require('fs')

test.describe('Download', async() =>{
    test('1 file only', async({page}) =>{
        await page.goto('https://the-internet.herokuapp.com/download')
        test.setTimeout(60000)

        const[download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator('text=evening.jpg').click()
        ]);
       
        const suggestedFileName = download.suggestedFilename()
        const filePath = 'download/' + suggestedFileName
        await download.saveAs(filePath)
        expect(fs.existsSync(filePath)).toBeTruthy()
    })

    test('Download Multiple files and assert', async ({ page }) => {    
        await page.goto('https://the-internet.herokuapp.com/download')
        test.setTimeout(60000);
        const fileNames = ["C:/Playwright Complete Programs/upload/evening.jpg", "C:/Playwright Complete Programs/upload/morning.jpg"]
        for (const fileName of fileNames) {
            const [download] = await Promise.all([
                page.waitForEvent('download'),
                page.locator(`text=${fileName}`).click()
            ]);
            const suggestedFileName = download.suggestedFilename()
            const filePath = 'download/' + suggestedFileName
            await download.saveAs(filePath)
            expect(fs.existsSync(filePath)).toBeTruthy()
        }
    });

    // test('Download Multiple files and assert', async ({ page }) => {    
    //     await page.goto('https://the-internet.herokuapp.com/download')
    //     test.setTimeout(60000);
    //     const fileNames = ["C:/Playwright Complete Programs/upload/evening.jpg", "C:/Playwright Complete Programs/upload/morning.jpg"]
    //     for (const fileName of fileNames) {
    //         const [download] = await Promise.all([
    //             page.waitForEvent('download'),
    //             page.locator(`text=${fileName}`).click()
    //         ]);
    //         const suggestedFileName = download.suggestedFilename()
    //         const filePath = 'download/' + suggestedFileName
    //         await download.saveAs(filePath)
    //         expect(fs.existsSync(filePath)).toBeTruthy()
    //     }
    // })
 
   
})
 