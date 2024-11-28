import { faker } from '@faker-js/faker';
import { EventType, PrismaClient } from '@prisma/client';
import { generateEventRegistrationTicket } from '../src/tickets';

faker.seed(1738);

const prisma = new PrismaClient();

async function main() {
    const promises = [];

    const events = [
        {
            id: faker.string.uuid(),
            name: 'YPIT Series F',
            startDate: new Date('2024-11-30T13:00:00'),
            type: EventType.Physical,
            organizer: 'YPIT Limited',
            venue: 'Bature Brewery',
        },
    ];
    promises.push(
        ...events.map((event) =>
            prisma.event.upsert({
                where: { id: event.id },
                create: event,
                update: event,
            })
        )
    );

    const users = new Array(50).fill('').map(() => {
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
                numberOfTickets: 1,
            });
        }
    }
    eventRegistrations[eventRegistrations.length - 1].numberOfTickets = 4;
    eventRegistrations[eventRegistrations.length - 2].numberOfTickets = 2;
    eventRegistrations[eventRegistrations.length - 3].numberOfTickets = 2;

    const eventRegisterationPromises = [];
    for (const { id, ...eventRegistration } of eventRegistrations) {
        eventRegisterationPromises.push(
            prisma.eventRegisteration.upsert({
                where: { id },
                create: { id, ...eventRegistration },
                update: eventRegistration,
            })
        );
    }
    await Promise.all(eventRegisterationPromises);

    await Promise.all(
        eventRegistrations.map((eventReg) => {
            return generateEventRegistrationTicket(eventReg.id);
        })
    );

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
