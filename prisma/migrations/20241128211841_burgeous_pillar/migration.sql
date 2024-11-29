/*
  Warnings:

  - You are about to drop the column `numberOfTickets` on the `event_registerations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "event_registerations" RENAME COLUMN "numberOfTickets" TO "number_of_tickets";
ALTER TABLE "event_registerations" 
ADD COLUMN     "email_sent" BOOLEAN NOT NULL DEFAULT false;
