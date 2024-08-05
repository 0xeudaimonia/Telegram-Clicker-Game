/*
  Warnings:

  - You are about to drop the column `dailyRewardId` on the `dailyRewardClaim` table. All the data in the column will be lost.
  - Added the required column `day` to the `dailyRewardClaim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `dailyRewardClaim` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "dailyRewardClaim" DROP CONSTRAINT "dailyRewardClaim_dailyRewardId_fkey";

-- AlterTable
ALTER TABLE "dailyRewardClaim" DROP COLUMN "dailyRewardId",
ADD COLUMN     "day" INTEGER NOT NULL,
ADD COLUMN     "points" INTEGER NOT NULL;
