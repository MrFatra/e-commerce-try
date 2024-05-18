import { getPlaiceholder } from 'plaiceholder';
import fs from "fs/promises";
import { NextPageContext } from 'next';


const ImageAsync = ({ base64 }: { base64?: any }) => {
    return (
        <img
            src={base64}
            alt="Market Tree"
            style={{ backgroundImage: `url(${base64})` }}
        />
    )
}

ImageAsync.getInitialProps = async (ctx: NextPageContext) => {
    const file = await fs.readFile('/images/client/market-login.jpg')
    const { base64 } = await getPlaiceholder(file)
    console.log(base64)
    return { base64 }
}

export default ImageAsync;