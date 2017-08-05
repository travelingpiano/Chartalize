# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170805041528) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "charts", force: :cascade do |t|
    t.string   "title",                      null: false
    t.string   "chart_type",                 null: false
    t.string   "xAxis",                      null: false
    t.string   "yAxis",                      null: false
    t.integer  "data_table_id",              null: false
    t.jsonb    "data",                       null: false
    t.integer  "user_id",                    null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "shared_users",  default: [],              array: true
    t.string   "y2Axis",        default: ""
    t.index ["data_table_id"], name: "index_charts_on_data_table_id", using: :btree
    t.index ["user_id"], name: "index_charts_on_user_id", using: :btree
  end

  create_table "data_tables", force: :cascade do |t|
    t.string   "title",      null: false
    t.string   "data_type",  null: false
    t.integer  "user_id",    null: false
    t.jsonb    "table",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_data_tables_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.string   "email"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["session_token"], name: "index_users_on_session_token", using: :btree
    t.index ["username"], name: "index_users_on_username", using: :btree
  end

end
