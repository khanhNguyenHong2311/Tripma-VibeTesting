/*
  Warnings:

  - The primary key for the `Seat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `seatId` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationRequest` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `providerType` on table `Account` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "Seat_flightId_type_seatNumber_key";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "providerType" SET NOT NULL;

-- AlterTable
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_pkey",
DROP COLUMN "seatId",
ADD CONSTRAINT "Seat_pkey" PRIMARY KEY ("flightId", "type", "seatNumber");

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationRequest";
