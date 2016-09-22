CREATE TABLE "public"."beacons" (
    "id" char(16),
    "name" text,
    "created" timestamp without time zone NOT NULL DEFAULT now(),
    "last_seen" timestamp without time zone,
    "location" earth,
    "intensity" integer NOT NULL DEFAULT '0',
    "battery" integer,
    PRIMARY KEY ("id")
);
