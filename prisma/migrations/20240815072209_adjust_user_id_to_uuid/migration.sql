/*
  Warnings:

  - You are about to drop the column `flightId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `Date` on the `Flight` table. All the data in the column will be lost.
  - The primary key for the `Seat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `departingFlightId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baggageFees` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureDate` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_flightId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "flightId",
ADD COLUMN     "departingFlightId" UUID NOT NULL,
ADD COLUMN     "returningFlightId" UUID,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "Date",
ADD COLUMN     "baggageFees" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "departureDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_pkey",
ADD CONSTRAINT "Seat_pkey" PRIMARY KEY ("flightId", "seatNumber");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_departingFlightId_fkey" FOREIGN KEY ("departingFlightId") REFERENCES "Flight"("flightId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_returningFlightId_fkey" FOREIGN KEY ("returningFlightId") REFERENCES "Flight"("flightId") ON DELETE SET NULL ON UPDATE CASCADE;
