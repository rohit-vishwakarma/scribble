# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
  end

  def test_name_should_be_of_valid_length
    @user.name = "a" * (User::MAX_NAME_LENGTH + 1)
    assert_not @user.valid?
  end

  def test_user_should_not_be_valid_and_save_without_name
    @user.name = ""
    assert_not @user.valid?
  end

  def test_user_should_not_be_valid_and_saved_without_email
    @user.email = ""
    assert_not @user.valid?

    @user.save
    assert_includes @user.errors_to_sentence, "Email can't be blank", "Email is invalid"
  end

  def test_user_should_not_be_valid_and_saved_if_email_not_unique
    @user.save!

    test_user = @user.dup
    assert_not test_user.valid?

    assert_includes test_user.errors_to_sentence, "Email has already been taken"
  end

  def test_users_should_be_deleted_if_organization_is_deleted
    users_count = @organization.users.count
    assert_not_equal 0, users_count

    @organization.destroy!
    assert_equal 0, @organization.users.count
  end
end
