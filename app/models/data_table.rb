# == Schema Information
#
# Table name: data_tables
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  type       :string           not null
#  user_id    :integer          not null
#  table      :jsonb            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class DataTable < ApplicationRecord
  validates :title, :data_type, :table, presence: true;
  validates :title, uniqueness: true;
  belongs_to :user
end