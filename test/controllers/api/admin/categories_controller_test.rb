# frozen_string_literal: true

require "test_helper"

class Api::Admin::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
  end

  def test_should_create_category
    post api_admin_categories_path, params: { category: { name: "Getting Started", user: @user } }
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: "Category"), response_json["notice"]
  end

  def test_should_update_category
    category_params = { category: { name: "Updated title" } }
    put api_admin_category_path(@category.id), params: category_params
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("successfully_updated", entity: "Category"), response_json["notice"]
  end

  def test_should_destroy_category
    assert_difference "Category.count", -1 do
      delete api_admin_category_path(@category.id)
    end
    assert_response :ok

    response_json = response.parsed_body
    assert_equal t("successfully_deleted", entity: "Category"), response_json["notice"]
  end

  def test_should_update_categories_positions
    first_category = create(:category, user: @user)
    second_category = create(:category, user: @user)
    third_category = create(:category, user: @user)

    category_ids = [third_category.id, first_category.id, second_category.id]
    last_position = @category.position
    put position_update_api_admin_categories_path, params: { category_ids: category_ids }
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("position_updated", entity: "Category"), response_json["notice"]
  end
end
