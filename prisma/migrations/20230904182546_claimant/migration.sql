-- CreateTable
CREATE TABLE "claimant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "claimant_pkey" PRIMARY KEY ("id")
);
