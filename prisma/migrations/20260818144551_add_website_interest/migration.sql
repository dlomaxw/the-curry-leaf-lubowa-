-- CreateTable
CREATE TABLE "WebsiteInterest" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebsiteInterest_pkey" PRIMARY KEY ("id")
);
