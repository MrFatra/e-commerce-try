import fs from 'fs/promises'
import { getPlaiceholder } from 'plaiceholder'

const genImgBase64 = async () => {
    try {
        const file = await fs.readFile('./public/images/market-login.jpg')
        const base64 = await getPlaiceholder(file)
        return base64.base64
    } catch (err: any) {
        console.log(err.message)
    }
}

export default genImgBase64