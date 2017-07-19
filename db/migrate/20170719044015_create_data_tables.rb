class CreateDataTables < ActiveRecord::Migration[5.0]
  def change
    create_table :data_tables do |t|
      t.string :title, null: false
      t.string :data_type, null: false
      t.integer :user_id, null: false
      t.jsonb :table, null: false
      t.timestamps
    end
    add_index :data_tables, :user_id
  end
end
