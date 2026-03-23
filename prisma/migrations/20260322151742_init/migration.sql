-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "roll" TEXT NOT NULL,
    "course" TEXT,
    "so" TEXT,
    "session" TEXT,
    "issue" TEXT,
    "birth" TEXT,
    "during" TEXT,
    "endDate" TEXT,
    "pass" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Marksheet" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "roll" TEXT NOT NULL,
    "com" INTEGER,
    "ms" INTEGER,
    "accounting" INTEGER,
    "dtp" INTEGER,
    "it" INTEGER,
    "studentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Marksheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_roll_key" ON "Student"("roll");

-- CreateIndex
CREATE UNIQUE INDEX "Marksheet_roll_key" ON "Marksheet"("roll");

-- CreateIndex
CREATE UNIQUE INDEX "Marksheet_studentId_key" ON "Marksheet"("studentId");

-- AddForeignKey
ALTER TABLE "Marksheet" ADD CONSTRAINT "Marksheet_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
