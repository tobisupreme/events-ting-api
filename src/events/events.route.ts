import { Router } from 'express';
import {
    ensureRequestBody,
    IsValidUuidSchema,
    validateRequestBody,
    validateRequestParam,
    validateRequestQuery,
} from '../common';
import {
    checkInEventRegistration,
    getEventRegistration,
    getEventRegistrations,
    getEvents,
} from './events';
import {
    CheckInUserForEventSchema,
    FindEventRegistrationsSchema,
    FindOneEventRegistrationSchema,
} from './events.schema';

const router = Router();

router.route('/').get(getEvents);

router
    .route('/:id/registrations')
    .get(
        validateRequestParam(IsValidUuidSchema),
        validateRequestQuery(FindEventRegistrationsSchema),
        getEventRegistrations
    );

router
    .route('/:id/registrations/:ticketIdOrEmail')
    .post(
        ensureRequestBody,
        validateRequestParam(FindOneEventRegistrationSchema),
        validateRequestBody(CheckInUserForEventSchema),
        checkInEventRegistration
    )
    .get(
        validateRequestParam(FindOneEventRegistrationSchema),
        getEventRegistration
    );

export const eventsRouter = router;
