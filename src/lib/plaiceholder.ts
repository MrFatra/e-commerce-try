// import fs from 'fs/promises'
import { getPlaiceholder } from 'plaiceholder'

// export const genImgBase64 = async () => {
//     try {
//         const file = await fs.readFile('./public/images/market-login.jpg')
//         const base64 = await getPlaiceholder(file)
//         return base64.base64
//     } catch (err: any) {
//         console.log(err.message)
//     }
// }

export const genDynamicImgBase64 = async (image: string) => {
    try {
        const response = await fetch(image)
        const file = Buffer.from(await response.arrayBuffer())
        const base64 = await getPlaiceholder(file)
        return base64.base64
    } catch (err: any) {
        console.log(err.message)
    }
}