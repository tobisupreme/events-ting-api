/*
  Warnings:

  - A unique constraint covering the columns `[ticketId]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "tickets_event_registration_id_key";

-- AlterTable
ALTER TABLE "event_registerations" ADD COLUMN     "numberOfTickets" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "ticketId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "tickets_ticketId_key" ON "tickets"("ticketId");
