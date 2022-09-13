import { PrismaClient } from '@prisma/client'
import console from 'console'

const prisma = new PrismaClient()

async function main() {
    const cliente = await prisma.cliente.create({
        data: {
          id: 1,
          nome: 'pescador95',
          cpf: '099 990 999 99',
          telefone:'+55 (45) 9 9999-9999',
          datanascimento: '12/09/1995',
          endereco:   'Rua casa do Carvalho, 666'
        },
      })
      console.log(cliente)
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
