-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "logo" TEXT;

-- CreateTable
CREATE TABLE "testimonials" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "role" TEXT,
    "company" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "photo" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "testimonials_published_order_idx" ON "testimonials"("published", "order");
