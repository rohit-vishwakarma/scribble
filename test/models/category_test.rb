# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @category = create(:category)
  end

  def test_category_should_be_valid
    assert @category.valid?
  end

  def test_name_should_be_of_valid_length
    @category.name = "a" * (Category::MAX_NAME_LENGTH + 1)
    assert_not @category.valid?
  end

  def test_name_should_be_unique
    duplicate_category = @category.dup
    assert_not duplicate_category.valid?
  end

  def test_category_should_not_be_valid_and_saved_without_name
    @category.name = ""
    assert_not @category.valid?
  end
end
