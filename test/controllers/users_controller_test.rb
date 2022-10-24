# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
  end

  def test_should_list_all_users
    get user_path, as: :json
    assert_response :ok
  end
end
