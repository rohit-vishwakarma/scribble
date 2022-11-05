require "yaml"

desc 'drops the db, creates db, migrates db and populates sample data'
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
  Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "Sample data has been added."
  end
end

def create_sample_data!
  puts "Seeding sample data..."
  create_sample_organization_data!
  create_sample_user_data!
  create_sample_categories_data!
  create_sample_articles_data!
end

def create_sample_user_data!
  puts "Seeding with sample user..."
  User.create!(
    name: 'Oliver Smith',
    email: 'oliver@example.com',
    organization_id: 1
  )
  puts "Done! user is created successfully."
end

def create_sample_categories_data!
  puts "Seeding with sample category..."
  categories = YAML.load_file("lib/seeds/categories.yml")
  for category in categories
    Category.create!(category)
  end
  puts "Done! category is created successfully"
end

def create_sample_articles_data!
  puts "Seeding with sample articles..."
  articles = YAML.load_file("lib/seeds/articles.yml")
  for article in articles
    Article.create!(article)
  end
  puts "Done! article is created successfully."
end

def create_sample_organization_data!
  puts "Seeding with sample Organization name..."
  Organization.create!(
    name: "Spinkart",
    password: nil,
    is_password_protected: false
  )
  puts "Done! Organization name is created successfully."
end
