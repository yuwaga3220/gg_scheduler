/*
  Warnings:

  - A unique constraint covering the columns `[communityId,userName,date]` on the table `ScheduleEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ScheduleEntry_communityId_userName_date_key" ON "ScheduleEntry"("communityId", "userName", "date");
