# frozen_string_literal: true

require "test_helper"

class Api::Admin::RedirectionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @redirection = build(:redirection)
  end

  def test_should_create_redirection
    post api_admin_redirections_path, params: { redirection: { from: @redirection.from, to: @redirection.to } }
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: "Redirection"), response_json["notice"]
  end

  def test_should_destroy_redirection
    @redirection.save!
    delete api_admin_redirection_path(@redirection.id)
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("successfully_deleted", entity: "Redirection"), response_json["notice"]
  end

  def test_should_update_redirection
    @redirection.save!
    put api_admin_redirection_path(@redirection.id), params: {
      redirection: {
        from: "https://lacalhost:3000/settings",
        to: "https://lacalhost:3000/settings/general"
      }
    }
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("successfully_updated", entity: "Redirection"), response_json["notice"]
  end

  def test_should_list_all_redirections
    get api_admin_redirections_path
    assert_response :success

    response_json = response.parsed_body
    all_redirections = Redirection.all.count
    assert_equal all_redirections, response_json["redirections"].count
  end
end
