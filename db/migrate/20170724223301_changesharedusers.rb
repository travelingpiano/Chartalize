class Changesharedusers < ActiveRecord::Migration[5.0]
  def change
    remove_column :charts, :shared_users
    add_column :charts, :shared_users, :string, array: true, default: []
  end
end
