-- CreateTable
CREATE TABLE "Destinations" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "price" DECIMAL(8,2) NOT NULL,
    "imagesUrl" TEXT[],
    "testimonialId" TEXT,

    CONSTRAINT "Destinations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Destinations" ADD CONSTRAINT "Destinations_testimonialId_fkey" FOREIGN KEY ("testimonialId") REFERENCES "Testimonial"("id") ON DELETE SET NULL ON UPDATE CASCADE;
