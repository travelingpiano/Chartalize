# Schema Information

##users
column_name     | data type | details
----------------|-----------|--------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
email           | string    | indexed, unique
password_digest | string    | not null, unique
session_token   | string    | not null, indexed, unique

##data_tables
column_name     | data type | details
----------------|-----------|--------
id              | integer   | not null, primary key
title           | string    | not null
type            | string    | not null
user_id         | integer   | not null, indexed
data_table_url  | string    |
table           | jsonb     | not null, gin indexed

##charts
column_name     | data type | details
----------------|-----------|--------
