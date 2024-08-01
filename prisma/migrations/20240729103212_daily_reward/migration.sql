-- AlterTable
ALTER TABLE "VideoBonus" ADD COLUMN     "claimed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "dailyReward" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dailyReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dailyRewardClaim" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dailyRewardId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dailyRewardClaim_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dailyRewardClaim" ADD CONSTRAINT "dailyRewardClaim_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dailyRewardClaim" ADD CONSTRAINT "dailyRewardClaim_dailyRewardId_fkey" FOREIGN KEY ("dailyRewardId") REFERENCES "dailyReward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
