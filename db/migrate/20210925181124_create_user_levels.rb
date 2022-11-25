class CreateUserLevels < ActiveRecord::Migration[6.1]
  def change
    create_table :user_levels do |t|
      t.string :user_level, null: false, limit: 255
      t.integer :del_flg, null: false, limit: 1, default: 0
      t.integer :created_user, null: false
      t.integer :updated_user, null: false
      t.timestamps
    end
  end
end