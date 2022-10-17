# frozen_string_literal: true

require "test_helper"

class RedirectionsControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @redirection = build(:redirection)
  end

  def test_should_get_successfully_from_redirection_path
    get redirections_path
    assert_response :success
  end

  def test_should_create_redirection
    post redirections_path, params: { redirection: { from: @redirection.from, to: @redirection.to } }
    assert_response :success
  end

  def test_shouldnt_create_redirection_with_existing_from
    @redirection.save!

    post redirections_path, params: { redirection: { from: @redirection.from, to: "https://lacalhost:3000/settings" } }
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "From has already been taken"
  end

  def test_shouldnt_create_redirection_without_from
    post redirections_path, params: { redirection: { from: "", to: @redirection.to } }
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "From can't be blank"
  end

  def test_shouldnt_create_redirection_without_to
    post redirections_path, params: { redirection: { from: @redirection.from, to: "" } }
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "To can't be blank"
  end

  def test_should_destroy_redirection
    @redirection.save!
    delete redirection_path(@redirection.id)
    assert_response :ok
  end

  def test_should_update_redirection
    @redirection.save!
    put redirection_path(@redirection.id), params: {
      redirection: {
        from: "https://lacalhost:3000/settings",
        to: "https://lacalhost:3000/settings/general"
      }
    }
    assert_response :ok
  end

  def test_shouldnt_update_redirection_without_from
    @redirection.save!
    put redirection_path(@redirection.id), params: { redirection: { from: "", to: @redirection.to } }
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "From can't be blank"
  end

  def test_shouldnt_update_redirection_without_to
    @redirection.save!
    put redirection_path(@redirection.id), params: { redirection: { from: @redirection.from, to: "" } }
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "To can't be blank"
  end
end
