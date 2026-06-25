import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create a simulated User
  const user = await prisma.user.upsert({
    where: { phone: '+919628616168' },
    update: {},
    create: {
      phone: '+919628616168',
      name: 'Simulated User',
    },
  });

  console.log(`Created user: ${user.id}`);

  // 2. Clear existing categories and products to prevent duplicates on multiple runs
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 3. Create Categories
  const catRolling = await prisma.category.create({
    data: { name: 'Rolling Needs', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=50&q=80' }
  });
  
  const catCigarette = await prisma.category.create({
    data: { name: 'Cigarette', image: 'https://images.unsplash.com/photo-1599813083656-7881079dff7d?w=50&q=80' }
  });

  const catPaan = await prisma.category.create({
    data: { name: 'Paan Masala', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=50&q=80' }
  });

  const catSmoking = await prisma.category.create({
    data: { name: 'Smoking Cessation', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ad?w=50&q=80' }
  });

  const catHookah = await prisma.category.create({
    data: { name: 'Hookah Needs', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=50&q=80' }
  });

  // Home page categories
  await prisma.category.createMany({
    data: [
      { name: "Dairy, Bread & Eggs", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&q=80" },
      { name: "Fruits & Vegetables", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&q=80" },
      { name: "Cold Drinks & Juices", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=100&q=80" },
      { name: "Snacks & Munchies", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=100&q=80" },
      { name: "Breakfast & Instant Food", image: "https://images.unsplash.com/photo-1612929633738-8fe01f38e4c5?w=100&q=80" },
      { name: "Sweet Tooth", image: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=100&q=80" },
      { name: "Bakery & Biscuits", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&q=80" },
      { name: "Tea, Coffee & More", image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=100&q=80" },
      { name: "Atta, Rice & Dal", image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=100&q=80" },
    ]
  });

  // 4. Create Products for "Rolling Needs"
  await prisma.product.createMany({
    data: [
      { name: "Ultimate Rolling Paper with Filter Tips &...", qty: "32 pcs", price: 90, eta: "23 MINS", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=200&q=80", categoryId: catRolling.id },
      { name: "Perfect Rolled Cones (Natural) - Bongchie", qty: "3 pcs", price: 45, eta: "23 MINS", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&q=80", categoryId: catRolling.id },
      { name: "Thins Pre-Rolled Rolling Paper - LIT", qty: "1 pack", price: 25, eta: "23 MINS", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&q=80", categoryId: catRolling.id },
      { name: "Brown Rolling Paper Cones - Stash Pro", qty: "6 pcs", price: 90, eta: "23 MINS", image: "https://images.unsplash.com/photo-1599813083656-7881079dff7d?w=200&q=80", categoryId: catRolling.id },
      { name: "Perfect Rolling Paper (Pink) - Bongchie", qty: "3 packs", price: 45, eta: "23 MINS", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ad?w=200&q=80", categoryId: catRolling.id },
      { name: "Dollar Pre-rolled Rolling Paper -...", qty: "3 pcs", price: 60, eta: "23 MINS", image: "https://images.unsplash.com/photo-1612929633738-8fe01f38e4c5?w=200&q=80", categoryId: catRolling.id },
    ]
  });

  // 4. Create Products for "Cigarette"
  await prisma.product.createMany({
    data: [
      { name: "Cigarette Smoking Filter - Nicofree", qty: "21 pcs", price: 239, eta: "9 MINS", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&q=80", categoryId: catCigarette.id },
    ]
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
