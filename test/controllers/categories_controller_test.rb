# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
  end

  def test_should_create_category
    post categories_path, params: { category: { name: "Getting Started" } }
    assert_response :success
  end

  def test_shouldnt_create_category_with_existing_name
    test_category = @category

    post categories_path, params: { category: { name: test_category.name } }
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "Name has already been taken"
  end

  def test_shouldnt_create_category_without_name
    post categories_path, params: { category: { name: "" } }
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "Name can't be blank"
  end
end
