/*
  Warnings:

  - You are about to drop the column `testimonialId` on the `Destinations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Destinations" DROP CONSTRAINT "Destinations_testimonialId_fkey";

-- AlterTable
ALTER TABLE "Destinations" DROP COLUMN "testimonialId";

-- CreateTable
CREATE TABLE "_DestinationsToTestimonial" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DestinationsToTestimonial_AB_unique" ON "_DestinationsToTestimonial"("A", "B");

-- CreateIndex
CREATE INDEX "_DestinationsToTestimonial_B_index" ON "_DestinationsToTestimonial"("B");

-- AddForeignKey
ALTER TABLE "_DestinationsToTestimonial" ADD CONSTRAINT "_DestinationsToTestimonial_A_fkey" FOREIGN KEY ("A") REFERENCES "Destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DestinationsToTestimonial" ADD CONSTRAINT "_DestinationsToTestimonial_B_fkey" FOREIGN KEY ("B") REFERENCES "Testimonial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
