/*
  Warnings:

  - A unique constraint covering the columns `[user_id,event_id]` on the table `event_registerations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "event_registerations_user_id_event_id_key" ON "event_registerations"("user_id", "event_id");
