json.extract! @chart, :title, :xAxis, :yAxis, :y2Axis, :data, :chart_type, :user_id, :id, :shared_users
json.owner @chart.user.username
