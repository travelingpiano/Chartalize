@data_tables.each do |data_table|
  json.set! data_table.id do
    json.extract! data_table, :title, :data_type, :id, :user_id
  end
end
