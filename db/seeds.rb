# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Game.destroy_all
User.destroy_all

zbest = User.new(pseudo: "Zbest", email: "zbest@gmail.com", password: "pourquoi")
zbest.save!

fantasious = User.new(pseudo: "FantaSious", email: "fantasious@gmail.com", password: "pourquoi")
fantasious.save!

prodigy = User.new(pseudo: "Prodigy", email: "prodigy@gmail.com", password: "pourquoi")
prodigy.save!

keepergoal = User.new(pseudo: "Keeper Goal", email: "keepergoal@gmail.com", password: "pourquoi")
keepergoal.save!

ronaloaded = User.new(pseudo: "Ronaloaded", email: "ronaloaded@gmail.com", password: "pourquoi")
ronaloaded.save!

mostwanted = User.new(pseudo: "MoSTWanTeD", email: "mostwanted@gmail.com", password: "pourquoi")
mostwanted.save!

game = Game.new(status: 2, time: "12508")
game.first_user = prodigy
game.second_user = mostwanted
game.save!


# 4ver, MoSTWanTeD, FantaSious, MoSTWanTeD, ReLaoDeD, 2Late, Adren4lYnne, Bullet, KardiaK, NeoN, TheCrew, etc.
#  Messih, Ronaloaded, KeeperGoal, Mooney, Technikal, Prodigy, etc.
