class CreateCharts < ActiveRecord::Migration[5.0]
  def change
    create_table :charts do |t|
      t.string :title, null: false
      t.string :chart_type, null: false
      t.string :xAxis, null: false
      t.string :yAxis, null: false
      t.integer :data_table_id, null: false
      t.jsonb :data, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :charts, :user_id
    add_index :charts, :data_table_id
  end
end
