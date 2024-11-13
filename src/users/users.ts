import { Request, Response, Router } from 'express';
import {
    createResponse,
    ensureRequestBody,
    ResponseType,
    validateRequestBody,
} from '../common/utils';
import { prisma } from '../db';
import {
    CreateUser,
    CreateUserSchema,
    UpdateUser,
    UpdateUserSchema,
} from './users.schema';

const router = Router();

router
    .route('/')
    .get(findUsers)
    .post(ensureRequestBody, validateRequestBody(CreateUserSchema), createUser)
    .patch(
        ensureRequestBody,
        validateRequestBody(UpdateUserSchema),
        updateUser
    );

async function createUser(req: Request, res: Response) {
    const requestData: CreateUser = req.body;

    const data = await prisma.users.create({
        data: requestData,
    });
    const { status, body } = createResponse(ResponseType.Success, data);

    res.status(status).json(body);
}

async function updateUser(req: Request, res: Response) {
    const requestData: UpdateUser = req.body;
    const { id, ...updatePayload } = requestData;

    const data = await prisma.users.update({
        data: updatePayload,
        where: { id },
    });
    const { status, body } = createResponse(ResponseType.Success, data);

    res.status(status).json(body);
}

async function findUsers(_: Request, res: Response) {
    const data = await prisma.users.findMany();
    const { status, body } = createResponse(ResponseType.Success, data);

    res.status(status).json(body);
}

export const usersRouter = router;
