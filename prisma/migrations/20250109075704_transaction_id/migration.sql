/*
  Warnings:

  - You are about to drop the column `transitionId` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "transitionId",
ADD COLUMN     "transactionId" TEXT;
