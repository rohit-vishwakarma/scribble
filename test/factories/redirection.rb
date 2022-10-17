# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    from { Faker::Internet.url }
    to { Faker::Internet.url }
  end
end
