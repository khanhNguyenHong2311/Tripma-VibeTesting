/*
  Warnings:

  - You are about to drop the column `arrivalDate` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `departureDate` on the `Flight` table. All the data in the column will be lost.
  - Added the required column `Date` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "arrivalDate",
DROP COLUMN "departureDate",
ADD COLUMN     "Date" TIMESTAMP(3) NOT NULL;
