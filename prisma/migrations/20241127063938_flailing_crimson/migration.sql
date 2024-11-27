-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Virtual', 'Physical');

-- AlterTable
ALTER TABLE "event" ADD COLUMN     "organizer" VARCHAR(255),
ADD COLUMN     "type" "EventType" NOT NULL DEFAULT 'Virtual';
