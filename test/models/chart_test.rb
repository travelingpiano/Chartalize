# == Schema Information
#
# Table name: charts
#
#  id            :integer          not null, primary key
#  title         :string           not null
#  chart_type    :string           not null
#  xAxis         :string           not null
#  yAxis         :string           not null
#  data_table_id :integer          not null
#  data          :jsonb            not null
#  user_id       :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  shared_users  :string           default([]), is an Array
#

require 'test_helper'

class ChartTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
