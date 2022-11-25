class CreateHeaderClassificationDicts < ActiveRecord::Migration[6.1]
  def change
    create_table :header_classification_dicts do |t|
      t.integer :display_order, null: false
      t.string :header_classification, null: false, limit: 255
      t.string :keyword, null: false, limit: 255
      t.integer :del_flg, null: false, limit: 1, default: 0
      t.integer :created_user, null: false
      t.integer :updated_user, null: false
      t.timestamps
    end
  end
end
