# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
DataTable.destroy_all

dallas = User.create(username: "Dallas", password: "over9000");
kelly = User.create(username: "Kelly", password: "chungki");
aaron = User.create(username: "Aaron", password: "iamamazing");
debra = User.create(username: "Debra", password: "smallbutmighty");
demo_user = User.create(username: "ChartalizeMaster", password: "password");

basketball1 = DataTable.create(title: "Basketball is great", data_type: "text/csv", table: [{points: 30, fouls: 5}, {points: 10, fouls: 10}], user_id: dallas.id);
