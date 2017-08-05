class AddY2AxistoChart < ActiveRecord::Migration[5.0]
  def change
    add_column :charts, :y2Axis, :string, default: ""
  end
end
