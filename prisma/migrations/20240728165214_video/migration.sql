/*
  Warnings:

  - Added the required column `vidoId` to the `VideoBonus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VideoBonus" ADD COLUMN     "vidoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "video" (
    "id" SERIAL NOT NULL,
    "video_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VideoBonus" ADD CONSTRAINT "VideoBonus_vidoId_fkey" FOREIGN KEY ("vidoId") REFERENCES "video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
