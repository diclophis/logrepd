#!/bin/sh

psql --host=$PG_HOST --username=$PG_USERNAME --list | grep fluentd || createdb --host=$PG_HOST --username=$PG_USERNAME fluentd
echo "CREATE TABLE IF NOT EXISTS fluentd (tag Text, time Timestamptz, record Jsonb);" | psql --host=$PG_HOST --username=$PG_USERNAME
