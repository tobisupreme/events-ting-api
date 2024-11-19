/*
  Warnings:

  - A unique constraint covering the columns `[event_registration_id]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tickets_event_registration_id_key" ON "tickets"("event_registration_id");
