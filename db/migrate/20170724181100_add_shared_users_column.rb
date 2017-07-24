class AddSharedUsersColumn < ActiveRecord::Migration[5.0]
  def change
    add_column :charts, :shared_users, :integer, array: true, default: []  
  end
end
