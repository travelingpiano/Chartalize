json.data_tables @data_tables do |data_table|
  json.extract! data_table, :title, :data_type, :id
end
