import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { CATS, PRODS, GARANTIAS } from './seed-data';

const prisma = new PrismaClient();

async function main() {
  for (const c of CATS) {
    await prisma.category.upsert({
      where: { id: c.id },
      update: { name: c.nome, iconName: c.icone, photoId: c.fid },
      create: { id: c.id, name: c.nome, iconName: c.icone, photoId: c.fid },
    });
  }

  for (const p of PRODS) {
    const d3 = p.d3 as any;
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        name: p.n,
        spec: p.s,
        categoryId: p.c,
        price: parseFloat(p.p.replace(/\./g, '').replace(',', '.')),
        oldPrice: p.a ? parseFloat(p.a.replace(/\./g, '').replace(',', '.')) : null,
        photoId: p.fid,
        tags: JSON.stringify(p.tags),
        buildTipo: d3.tipo,
        buildElo: d3.elo ?? null,
        buildEsp: d3.esp,
        buildMedida: d3.medida ?? null,
        buildPingente: d3.pingente ?? null,
        buildSinete: !!d3.sinete,
        buildGravacao: d3.gravacao ?? null,
      },
    });
  }

  const demoEmail = 'ana.ribeiro@email.com';
  const existing = await prisma.user.findUnique({ where: { email: demoEmail } });
  if (!existing) {
    const user = await prisma.user.create({
      data: {
        name: 'Ana Ribeiro',
        email: demoEmail,
        passwordHash: await bcrypt.hash('erkpratas123', 10),
        phone: '(11) 91112-4875',
        cpf: '381.***.***-04',
        address: {
          create: {
            street: 'Rua João Ribeiro, 148 · Centro',
            city: 'Salto',
            state: 'SP',
            zip: '13320-140',
            preference: 'motoboy',
          },
        },
        measurements: {
          create: { anelAro: 18, correnteCm: 60, pulseiraCm: 21, paymentPref: 'pix', cardLast4: '4471' },
        },
      },
    });

    const p01 = await prisma.product.findUnique({ where: { id: 'p01' } });
    const p14 = await prisma.product.findUnique({ where: { id: 'p14' } });
    if (p01 && p14) {
      await prisma.order.create({
        data: {
          userId: user.id,
          status: 'preparo',
          customerName: user.name,
          customerPhone: user.phone!,
          zip: '13320-140',
          delivery: 'motoboy',
          payment: 'pix',
          subtotal: 231,
          total: 231,
          items: { create: [{ productId: p01.id, name: p01.name, spec: p01.spec + ' · com gravação ERK', quantity: 1, unitPrice: 231 }] },
        },
      });
      await prisma.order.create({
        data: {
          userId: user.id,
          status: 'entregue',
          customerName: user.name,
          customerPhone: user.phone!,
          zip: '13320-140',
          delivery: 'correios',
          payment: 'pix',
          subtotal: 220,
          shipping: 10,
          total: 230,
          items: {
            create: [
              { productId: 'p06', name: 'Pulseira cubana', spec: 'Elo cubano · 21 cm', quantity: 1, unitPrice: 151 },
              { productId: 'p11', name: 'Pingente cruz', spec: 'Argola reforçada', quantity: 1, unitPrice: 79 },
            ],
          },
        },
      });
    }
  }

  console.log('Seed concluído:', CATS.length, 'categorias,', PRODS.length, 'produtos, garantias:', GARANTIAS.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
