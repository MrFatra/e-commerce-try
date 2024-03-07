import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
const prisma = new PrismaClient()
async function main() {
    // const adidasProduct = await prisma.product.create({
    //     data: {
    //         name: 'Adidas',
    //         price: 200000,
    //         quantity: 150,
    //     },
    // })
    const salt = 10
    const salty = await bcrypt.genSalt(salt)
    const adminPass = await bcrypt.hash('admin', salty)
    const userPass = await bcrypt.hash('pass', salty)
    const superAdmin = await prisma.user.create({
        data: {
            fullName: 'MrFatra',
            username: 'mrfatra',
            role: 'ADMIN',
            password: adminPass,
        }
    })
    const superUser = await prisma.user.create({
        data: {
            fullName: 'Ramadhan Fatra',
            username: 'fatra',
            role: 'USER',
            password: userPass,
        }
    })
    console.log({ superAdmin, superUser })
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