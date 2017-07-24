# == Schema Information
#
# Table name: data_tables
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  data_type  :string           not null
#  user_id    :integer          not null
#  table      :jsonb            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class DataTableTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
