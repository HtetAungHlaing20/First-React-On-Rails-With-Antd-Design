# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_27_145656) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "header_classification_dicts", force: :cascade do |t|
    t.integer "display_order", null: false
    t.string "header_classification", limit: 255, null: false
    t.string "keyword", limit: 255, null: false
    t.integer "del_flg", limit: 2, default: 0, null: false
    t.integer "created_user", null: false
    t.integer "updated_user", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "samples", force: :cascade do |t|
    t.string "description", limit: 255, null: false
    t.integer "del_flg", limit: 2, default: 0, null: false
    t.integer "created_user", null: false
    t.integer "updated_user", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "template_types", force: :cascade do |t|
    t.string "template_type", limit: 255, null: false
    t.integer "del_flg", limit: 2, default: 0, null: false
    t.integer "created_user", null: false
    t.integer "updated_user", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_levels", force: :cascade do |t|
    t.string "user_level", limit: 255, null: false
    t.integer "del_flg", limit: 2, default: 0, null: false
    t.integer "created_user", null: false
    t.integer "updated_user", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "user_name", limit: 255
    t.string "user_name_last", limit: 255
    t.bigint "user_level_id", null: false
    t.integer "del_flg", limit: 2, default: 0, null: false
    t.integer "created_user", null: false
    t.integer "updated_user", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["user_level_id"], name: "index_users_on_user_level_id"
  end

  create_table "writing_policies", force: :cascade do |t|
    t.bigint "template_type_id", null: false
    t.integer "display_order", null: false
    t.string "template_name", limit: 255, null: false
    t.string "template_description", limit: 255, null: false
    t.integer "del_flg", limit: 2, default: 0, null: false
    t.integer "created_user", null: false
    t.integer "updated_user", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["template_type_id"], name: "index_writing_policies_on_template_type_id"
  end

  add_foreign_key "users", "user_levels"
  add_foreign_key "writing_policies", "template_types"
end
