/*
  Warnings:

  - You are about to drop the column `vidoId` on the `VideoBonus` table. All the data in the column will be lost.
  - Added the required column `videoId` to the `VideoBonus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VideoBonus" DROP CONSTRAINT "VideoBonus_vidoId_fkey";

-- AlterTable
ALTER TABLE "VideoBonus" DROP COLUMN "vidoId",
ADD COLUMN     "videoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "VideoBonus" ADD CONSTRAINT "VideoBonus_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
