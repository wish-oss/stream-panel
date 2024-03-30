-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('HOBBY', 'PRO', 'ENTERPRISE');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'HOBBY';
