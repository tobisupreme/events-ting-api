/*
  Warnings:

  - You are about to drop the column `metaData` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `metaData` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "event" DROP COLUMN "metaData",
ADD COLUMN     "metadata" JSONB;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "metaData",
ADD COLUMN     "metadata" JSONB;
