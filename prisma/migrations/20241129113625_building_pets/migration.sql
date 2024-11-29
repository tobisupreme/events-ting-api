-- CreateEnum
CREATE TYPE "MessageLogStatus" AS ENUM ('Sent', 'NotSent');

-- CreateTable
CREATE TABLE "message_logs" (
    "id" UUID NOT NULL,
    "raw" TEXT NOT NULL,
    "eventRegistrationId" UUID NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message_log_status" "MessageLogStatus" NOT NULL,

    CONSTRAINT "message_logs_pkey" PRIMARY KEY ("id")
);
