import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { generateQRCode } from '../src/common';

faker.seed(1738);

const prisma = new PrismaClient();

async function main() {
    const promises = [];

    const events = ['', '', ''].map((_) => {
        const startDate = faker.date.soon();
        return {
            name: faker.lorem.words(3),
            id: faker.string.uuid(),
            startDate,
        };
    });
    promises.push(
        ...events.map((event) =>
            prisma.event.upsert({
                where: { id: event.id },
                create: event,
                update: event,
            })
        )
    );

    const users = ['', '', ''].map((_) => {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet
            .email({
                firstName,
                lastName,
                provider: 'inboxbear.com',
            })
            .toLowerCase();
        return {
            email,
            id: faker.string.uuid(),
            name: `${firstName} ${lastName}`,
        };
    });
    promises.push(
        ...users.map((user) =>
            prisma.users.upsert({
                where: { id: user.id },
                create: user,
                update: user,
            })
        )
    );
    await Promise.all(promises);

    const eventRegistrations = [];
    for (const user of users) {
        for (const event of events) {
            eventRegistrations.push({
                userId: user.id,
                eventId: event.id,
                id: faker.string.uuid(),
            });
        }
    }

    for await (const { id, ...eventRegistration } of eventRegistrations) {
        await prisma.eventRegisteration.upsert({
            where: { id },
            create: { id, ...eventRegistration },
            update: eventRegistration,
        });
        const barcodeData = await generateQRCode(id);
        if (!barcodeData) {
            console.warn(
                'Failed to generate barcode for event registration: ',
                id
            );
        }
        await prisma.ticket.upsert({
            where: { eventRegistrationId: id },
            create: {
                eventRegistrationId: id,
                barcodeData,
            },
            update: {
                barcodeData,
            },
        });
    }

    console.log('Seed data created successfully 🎉');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
