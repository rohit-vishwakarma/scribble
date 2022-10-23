# frozen_string_literal: true

require "test_helper"

class SitesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = build(:site)
  end

  def test_should_access_with_valid_credentials
    @site.save!
    post site_path, params: { password: @site.password }
    assert_response :success

    response_json = response.parsed_body["site"]
    assert_equal @site.authentication_token, response_json["authentication_token"]
  end

  def test_should_not_access_with_invalid_credentials
    @site.save!
    post site_path, params: { password: "wrong password" }
    assert_response :unauthorized

    response_json = response.parsed_body
    assert_equal t("site.incorrect_credentials"), response_json["error"]
  end

  def test_should_update_site_details
    @site.save!
    put site_path, params: { name: "Spin", password: "hello123" }
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("successfully_updated", entity: Site), response_json["notice"]
  end
end
