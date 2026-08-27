ALTER TABLE "Division"
  ADD COLUMN "slug" TEXT,
  ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "District"
  ADD COLUMN "slug" TEXT,
  ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "Upazila"
  ADD COLUMN "slug" TEXT,
  ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

UPDATE "Division" SET "slug" = lower(regexp_replace("name", '[^a-zA-Z0-9]+', '-', 'g')) WHERE "slug" IS NULL;
UPDATE "District" SET "slug" = lower(regexp_replace("name", '[^a-zA-Z0-9]+', '-', 'g')) || '-' || lower("code") WHERE "slug" IS NULL;
UPDATE "Upazila" SET "slug" = lower(regexp_replace("name", '[^a-zA-Z0-9]+', '-', 'g')) || '-' || lower("code") WHERE "slug" IS NULL;

ALTER TABLE "Division" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "District" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "Upazila" ALTER COLUMN "slug" SET NOT NULL;

CREATE UNIQUE INDEX "Division_slug_key" ON "Division"("slug");
CREATE UNIQUE INDEX "District_slug_key" ON "District"("slug");
CREATE UNIQUE INDEX "Upazila_slug_key" ON "Upazila"("slug");
CREATE UNIQUE INDEX "District_code_key" ON "District"("code");
CREATE UNIQUE INDEX "Upazila_code_key" ON "Upazila"("code");
CREATE INDEX "Division_isActive_idx" ON "Division"("isActive");
CREATE INDEX "District_code_idx" ON "District"("code");
CREATE INDEX "District_isActive_idx" ON "District"("isActive");
CREATE INDEX "Upazila_code_idx" ON "Upazila"("code");
CREATE INDEX "Upazila_isActive_idx" ON "Upazila"("isActive");

DROP INDEX "District_divisionId_code_key";
DROP INDEX "Upazila_districtId_code_key";