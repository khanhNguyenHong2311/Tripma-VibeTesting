/*
  Warnings:

  - Added the required column `arrivalDate` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureDate` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "arrivalDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "departureDate" TIMESTAMP(3) NOT NULL;
