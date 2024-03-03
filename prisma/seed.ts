import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const adidas = await prisma.product.create({
        data: {
            name: 'Adidas',
            price: 200000,
            quantity: 150,
        },
    })
    console.log({ adidas })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })