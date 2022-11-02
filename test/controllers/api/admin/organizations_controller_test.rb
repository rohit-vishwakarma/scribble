# frozen_string_literal: true

require "test_helper"

class Api::Admin::OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = build(:organization)
  end

  def test_should_access_with_valid_credentials
    @organization.save!
    post api_admin_organization_path, params: { password: @organization.password }
    assert_response :success

    response_json = response.parsed_body["authentication_token"]
    assert_equal @organization.authentication_token, response_json
  end

  def test_should_not_access_with_invalid_credentials
    @organization.save!
    post api_admin_organization_path, params: { password: "wrong password" }
    assert_response :unauthorized

    response_json = response.parsed_body
    assert_equal t("organization.incorrect_credentials"), response_json["error"]
  end

  def test_should_update_organization_details
    @organization.save!
    put api_admin_organization_path, params: { name: "Spin", password: "hello123" }
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("successfully_updated", entity: "Organization"), response_json["notice"]
  end
end
