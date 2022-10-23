# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
  end

  def test_should_create_category
    post categories_path, params: { category: { name: "Getting Started" } }
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: Category), response_json["notice"]
  end

  def test_should_update_category
    category_params = { category: { name: "Updated title" } }
    put category_path(@category.id), params: category_params
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("successfully_updated", entity: Category), response_json["notice"]
  end

  def test_should_destroy_category
    assert_difference "Category.count", -1 do
      delete category_path(@category.id)
    end
    assert_response :ok

    response_json = response.parsed_body
    assert_equal t("successfully_deleted", entity: Category), response_json["notice"]
  end

  def test_should_update_categories_positions
    first_category = create(:category)
    second_category = create(:category)
    third_category = create(:category)

    category_ids = [third_category.id, first_category.id, second_category.id]
    last_position = @category.position
    put position_update_categories_path, params: { category_ids: category_ids }
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("position_updated", entity: Category), response_json["notice"]
  end
end
