CREATE TABLE "public"."beacons" (
    "id" character varying(16),
    "name" text,
    "created" timestamp without time zone NOT NULL DEFAULT now(),
    "last_seen" timestamp without time zone,
    "location" earth,
    "battery" integer,
    PRIMARY KEY ("id")
);

CREATE INDEX beacons_location on beacons USING gist(location);