This file should contain all the record creation needed to seed the database with its default values.
The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

Examples:

  movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
  Character.create(name: 'Luke', movie: movies.first)

Sample.create(description: 'test1', created_user: 1, updated_user: 1)
Sample.create(description: 'test2', created_user: 1, updated_user: 1)
Sample.create(description: 'test3', created_user: 1, updated_user: 1)
Sample.create(description: 'test4', created_user: 1, updated_user: 1)
Sample.create(description: 'test5', created_user: 1, updated_user: 1)
Sample.create(description: 'test6', created_user: 1, updated_user: 1)
Sample.create(description: 'test7', created_user: 1, updated_user: 1)
Sample.create(description: 'test8', created_user: 1, updated_user: 1)
Sample.create(description: 'test9', created_user: 1, updated_user: 1)
Sample.create(description: 'test10', created_user: 1, updated_user: 1)
Sample.create(description: 'test11', created_user: 1, updated_user: 1)
Sample.create(description: 'test12', created_user: 1, updated_user: 1)

UserLevel.create(user_level: '管理者', created_user: 1, updated_user: 1)
UserLevel.create(user_level: 'フロント担当者', created_user: 1, updated_user: 1)
UserLevel.create(user_level: '骨子作成リーダー', created_user: 1, updated_user: 1)
UserLevel.create(user_level: '骨子作成者', created_user: 1, updated_user: 1)

User.create(user_name: 'Mg Mg', email: "mgmg@gicjp.com", user_level_id: 1, created_user: 1, updated_user: 1)

# HeaderClassificationDict.create(display_order: 1, header_classification: "Test Header Classification", keyword: "test", created_user: 1, updated_user: 1)
