# frozen_string_literal: true

require "test_helper"

class SiteTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @site = build(:site)
  end

  def test_name_should_be_of_valid_length
    @site.name = "a" * (Site::MAX_NAME_LENGTH + 1)
    assert_not @site.valid?
    assert_includes @site.errors.full_messages, "Name is too long (maximum is 50 characters)"
  end

  def test_name_shouldnt_be_valid_with_blank
    @site.name = ""
    assert @site.invalid?
    assert_includes @site.errors.full_messages, "Name can't be blank"
  end

  def test_name_shouldnt_be_valid_with_nil
    @site.name = nil
    assert @site.invalid?
    assert_includes @site.errors.full_messages, "Name can't be blank"
  end

  def test_password_shouldnt_be_valid_with_less_than_6_characters
    @site.password = "Hi1"
    assert @site.invalid?
    assert_includes @site.errors.full_messages, "Password is too short (minimum is 6 characters)"
  end

  def test_password_should_be_valid_with_more_than_5_characters
    @site.password = "hello1"
    assert @site.valid?
  end

  def test_password_shouldnt_be_valid_wihout_number
    @site.password = "welcome"
    assert @site.invalid?
    assert_includes @site.errors.full_messages, "Password requires 1 letter and 1 number"
  end

  def test_password_shouldnt_be_valid_without_letter
    @site.password = "123"
    assert @site.invalid?
    assert_includes @site.errors.full_messages, "Password requires 1 letter and 1 number"
  end

  def test_password_should_valid_with_nil
    @site.password = nil
    assert @site.valid?
  end
end
