-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('Pending', 'Generated', 'Claimed', 'Void');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "metaData" JSONB,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "event" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "end_date" TIMESTAMP(6),
    "metaData" JSONB,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_registerations" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_registerations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" UUID NOT NULL,
    "event_registration_id" UUID NOT NULL,
    "barcode_data" TEXT,
    "status" "TicketStatus" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets_audit" (
    "id" UUID NOT NULL,
    "ticketStatus" "TicketStatus" NOT NULL,
    "ticket_id" UUID NOT NULL,
    "changed_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "tickets_audit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_registerations" ADD CONSTRAINT "event_registerations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_registerations" ADD CONSTRAINT "event_registerations_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_registration_id_fkey" FOREIGN KEY ("event_registration_id") REFERENCES "event_registerations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
