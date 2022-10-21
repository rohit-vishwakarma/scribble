# frozen_string_literal: true

require "test_helper"

class SitesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @site = build(:site)
  end

  def test_should_change_password_to_nil
    @site.save!
    site_params = { name: @site.name, password: nil }
    put site_path(@site.id), params: site_params
    assert_response :success
  end

  def test_name_shouldnt_change_to_blank
    @site.save!
    site_params = { name: "", password: @site.password }
    put site_path(@site.id), params: site_params
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "Name can't be blank"
  end

  def test_password_shouldnt_be_change_with_less_than_6_characters
    @site.save!
    site_params = { name: @site.name, password: "Welc1" }
    put site_path(@site.id), params: site_params
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "Password is too short (minimum is 6 characters)"
  end

  def test_password_should_be_change_with_more_than_5_characters
    @site.save!
    site_params = { name: @site.name, password: "Welcome1" }
    put site_path(@site.id), params: site_params
    assert_response :success
  end

  def test_password_shouldnt_be_change_without_letter
    @site.save!
    site_params = { name: @site.name, password: "123456" }
    put site_path(@site.id), params: site_params
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "Password requires 1 letter and 1 number"
  end

  def test_password_shouldnt_be_change_without_number
    @site.save!
    site_params = { name: @site.name, password: "welcome" }
    put site_path(@site.id), params: site_params
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "Password requires 1 letter and 1 number"
  end

  def test_should_access_with_valid_credentials
    @site.save!
    post sites_path, params: { password: @site.password }
    assert_response :success

    response_json = response.parsed_body
    assert_equal response_json["authentication_token"], @site.authentication_token
  end

  def test_should_not_access_with_invalid_credentials
    @site.save!
    post sites_path, params: { password: "wrong password" }
    assert_response :unauthorized

    response_json = response.parsed_body
    assert_equal response_json["message"], "Wrong password."
  end
end
