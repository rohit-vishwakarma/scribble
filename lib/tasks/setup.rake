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
  create_sample_user_data!
  create_sample_category_data!
  create_sample_article_data!
  create_sample_organization_data!
end

def create_sample_user_data!
  puts "Seeding with sample user..."
  User.create!(
    name: 'Oliver Smith',
    email: 'oliver@example.com'
  )
  puts "Done! user is created successfully."
end

def create_sample_category_data!
  puts "Seeding with sample category..."
  Category.create!(
    name: "Getting Started"
  )
  puts "Done! category is created successfully"
end

def create_sample_article_data!
  puts "Seeding with sample article..."
  Article.create!(
    title: "Welcome to scribble",
    body: "Using scribble application you can create your articles.",
    category_id: 1
  )
  puts "Done! article is created successfully."
end

def create_sample_organization_data!
  puts "Seeding with sample Organization name..."
  Organization.create!(
    name: "Spinkart"
  )
  puts "Done! Organization name is created successfully."
end
