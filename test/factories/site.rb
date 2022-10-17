# frozen_string_literal: true

FactoryBot.define do
  factory :site do
    name { Faker::Name.name[0..49] }
    password { "welcome123" }
  end
end
