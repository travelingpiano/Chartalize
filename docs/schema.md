# Schema Information

## users
column name     | data type | details
----------------|-----------|--------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | indexed, unique
password_digest | string    | not null, unique
session_token   | string    | not null, indexed, unique

## data_tables
column name     | data type | details
----------------|-----------|--------
id              | integer   | not null, primary key
title           | string    | not null
type            | string    | not null
user_id         | integer   | not null, foreign key (references users) indexed
table           | jsonb     | not null, gin indexed

## charts
column name     | data type | details
----------------|-----------|--------
id              | integer   | not null, primary key
title           | string    | not null
chart_type            | string    | not null
xAxis           | string    | not null
yAxis           | string    | not null
data            | jsonb     | not null
user_id         | integer   | not null, foreign key (references users) indexed
data_table_id   | integer   | not null, foreign key (references data_tables), indexed
