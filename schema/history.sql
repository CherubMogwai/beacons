CREATE TABLE "public"."history" (
    "id" serial,
    "beacon_id" char(16) NOT NULL,
    "time" timestamp without time zone NOT NULL DEFAULT now(),
    "location" earth,
    "rate" integer,
    "intensity" integer,
    "in_boundary" boolean,
    PRIMARY KEY ("id"),
    CONSTRAINT "fk_history_beacon_id" FOREIGN KEY ("beacon_id") REFERENCES "public"."beacons"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
