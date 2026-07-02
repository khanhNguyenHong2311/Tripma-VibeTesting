/*
  Warnings:

  - Added the required column `numberofStops` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "numberofStops" INTEGER NOT NULL,
ADD COLUMN     "stopsInfo" TEXT;
