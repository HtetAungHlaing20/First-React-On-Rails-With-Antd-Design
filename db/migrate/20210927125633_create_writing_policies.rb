class CreateWritingPolicies < ActiveRecord::Migration[6.1]
  def change
    create_table :writing_policies do |t|
      t.references :template_type, null: false, foreign_key: true
      t.integer :display_order, null: false
      t.string :template_name, null: false, limit: 255
      t.string :template_description, null: false, limit: 255
      t.integer :del_flg, null: false, limit: 1, default: 0
      t.integer :created_user, null: false
      t.integer :updated_user, null: false
      t.timestamps
    end
  end
end
