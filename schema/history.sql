CREATE TABLE "public"."history" (
    "id" serial,
    "beacon_id" character varying(16) NOT NULL,
    "time" timestamp without time zone NOT NULL DEFAULT now(),
    "location" earth,
    "rate" integer,
    "intensity" integer,
    "in_boundary" boolean,
    PRIMARY KEY ("id"),
    CONSTRAINT "fk_history_beacon_id" FOREIGN KEY ("beacon_id") REFERENCES "public"."beacons"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE "public"."history" ADD COLUMN "seq" integer NOT NULL DEFAULT '0';

ALTER TABLE "public"."history"
  ADD COLUMN "r" integer,
  ADD COLUMN "g" integer,
  ADD COLUMN "b" integer;


CREATE INDEX history_location on history USING gist(location);