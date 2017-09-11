# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20170911205416) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cities", force: :cascade do |t|
    t.string   "city_name",          null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "state"
    t.string   "latLng"
  end

  create_table "favorites", force: :cascade do |t|
    t.integer  "user_id",       null: false
    t.integer  "restaurant_id", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "photos", force: :cascade do |t|
    t.integer  "restaurant_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "ratings", force: :cascade do |t|
    t.integer  "restaurant_id"
    t.integer  "rating"
    t.integer  "food"
    t.integer  "service"
    t.integer  "ambiance"
    t.integer  "value"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "total"
  end

  create_table "reservations", force: :cascade do |t|
    t.integer "user_id",       null: false
    t.integer "restaurant_id", null: false
    t.string  "date",          null: false
    t.integer "time",          null: false
    t.string  "seats",         null: false
  end

  create_table "restaurants", force: :cascade do |t|
    t.integer  "owner_id",          null: false
    t.string   "restaurant_name",   null: false
    t.string   "cuisine"
    t.string   "restaurant_number", null: false
    t.string   "hours"
    t.string   "site"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.text     "description"
    t.integer  "city_id"
    t.string   "location"
    t.string   "address",           null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.integer  "reservation_id", null: false
    t.integer  "rating",         null: false
    t.text     "details"
    t.integer  "food"
    t.integer  "service"
    t.integer  "ambiance"
    t.integer  "value"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
