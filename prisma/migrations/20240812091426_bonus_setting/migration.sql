/*
  Warnings:

  - You are about to drop the column `description` on the `BonusSeting` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `BonusSeting` table. All the data in the column will be lost.
  - You are about to drop the `Bonus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReferralCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VideoBonus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dailyReward` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dailyRewardClaim` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `video` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `data` to the `BonusSeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `BonusSeting` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bonus" DROP CONSTRAINT "Bonus_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReferralCode" DROP CONSTRAINT "ReferralCode_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoBonus" DROP CONSTRAINT "VideoBonus_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoBonus" DROP CONSTRAINT "VideoBonus_videoId_fkey";

-- DropForeignKey
ALTER TABLE "dailyRewardClaim" DROP CONSTRAINT "dailyRewardClaim_userId_fkey";

-- AlterTable
ALTER TABLE "BonusSeting" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "data" TEXT NOT NULL,
ADD COLUMN     "type" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Bonus";

-- DropTable
DROP TABLE "ReferralCode";

-- DropTable
DROP TABLE "VideoBonus";

-- DropTable
DROP TABLE "dailyReward";

-- DropTable
DROP TABLE "dailyRewardClaim";

-- DropTable
DROP TABLE "video";

-- CreateTable
CREATE TABLE "BonusHistory" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "rewards" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BonusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BonusType" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BonusType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BonusHistory" ADD CONSTRAINT "BonusHistory_type_fkey" FOREIGN KEY ("type") REFERENCES "BonusType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusHistory" ADD CONSTRAINT "BonusHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusSeting" ADD CONSTRAINT "BonusSeting_type_fkey" FOREIGN KEY ("type") REFERENCES "BonusType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
