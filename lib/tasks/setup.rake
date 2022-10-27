desc 'drops the db, creates db, migrates db and populates sample data'
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
  Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task reset_and_populate_sample_data: [:environment] do
  Rake::Task["db:schema:load"].invoke
  create_sample_data!
  puts "Sample data has been added."
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
  Category.create!(
    name: "Getting Started",
    user_id: 1
  )
  Category.create!(
    name: "Misc",
    user_id: 1
  )
  Category.create!(
    name: "Apps & Integration",
    user_id: 1
  )
  Category.create!(
    name: "Security & Privacy",
    user_id: 1
  )
  puts "Done! category is created successfully"
end

def create_sample_articles_data!
  puts "Seeding with sample articles..."
  Article.create!(
    title: "Welcome to scribble",
    body: "Using Scribble application you can create your articles.",
    category_id: 1
  )
  Article.create!(
    title: "Setting up",
    body: "Using Scribble application you can create your articles.",
    status: "Published",
    category_id: 2
  )
  Article.create!(
    title: "Redirections",
    body: "Using Scribble application you can create your articles.",
    status: "Published",
    category_id: 4
  )
  Article.create!(
    title: "301 and 302 redirections",
    body: "Using Scribble application you can create your articles.",
    status: "Published",
    category_id: 4
  )
  Article.create!(
    title: "Writing an article",
    body: "Using Scribble application you can create your articles.",
    category_id: 1
  )
  Article.create!(
    title: "Password Protection",
    body: "Using Scribble application you can create your articles.",
    category_id: 4
  )
  Article.create!(
    title: "Unprotected Scribble",
    body: "Using Scribble application you can create your articles.",
    category_id: 3
  )
  Article.create!(
    title: "Welcome to scribble",
    body: "Using Scribble application you can create your articles.",
    status: "Published",
    category_id: 1
  )
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
