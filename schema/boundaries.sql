CREATE TABLE "public"."boundaries" (
    "id" serial,
    "lower_bound" earth NOT NULL,
    "upper_bound" earth NOT NULL,
    "name" text,
    "created" timestamp without time zone NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);
COMMENT ON COLUMN "public"."boundaries"."name" IS 'Friendly name of boundary for reference';
