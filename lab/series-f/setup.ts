import { faker } from '@faker-js/faker';
import { EventType, PrismaClient } from '@prisma/client';
import { execSync } from 'node:child_process';
import { generateEventRegistrationTicket } from '../../src/tickets';

faker.seed(1738);

type userData = {
    email: string;
    name: string;
    quantity: number;
};

import userData from './YPIT_REG_normalized_unique_emails.json';

const prisma = new PrismaClient();

async function main() {
    execSync('npm run migration:apply');
    const promises = [];

    const events = [
        {
            id: faker.string.uuid(),
            name: 'YPIT Series F',
            startDate: new Date('2024-11-30T13:00:00'),
            type: EventType.Physical,
            organizer: 'YPIT Limited',
            venue: 'Bature Brewery. 256, Etim Inyang Cres, Victoria Island 106104 Lagos, Nigeria',
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

    const users = userData.map((user) => {
        return {
            email: user.email,
            id: faker.string.uuid(),
            name: user.name,
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
    const userDataDictionary = userData.reduce(
        (acc: Record<string, userData>, user) => {
            acc[user.email] = user;
            return acc;
        },
        {}
    );

    for (const user of users) {
        for (const event of events) {
            eventRegistrations.push({
                userId: user.id,
                eventId: event.id,
                id: faker.string.uuid(),
                numberOfTickets: userDataDictionary[user.email].quantity,
            });
        }
    }

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
