# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @redirection = build(:redirection)
  end

  def test_redirection_should_be_valid
    assert @redirection.valid?
  end

  def test_redirection_shouldnt_be_valid_without_from
    @redirection.from = ""
    assert @redirection.invalid?
    assert_includes @redirection.errors.full_messages, "From can't be blank"
  end

  def test_redirection_shouldnt_be_valid_without_to
    @redirection.to = ""
    assert @redirection.invalid?
    assert_includes @redirection.errors.full_messages, "To can't be blank"
  end

  def test_from_should_be_unique
    @redirection.save!
    duplicate_redirection = @redirection.dup
    assert_not duplicate_redirection.valid?
  end

  def test_redirection_should_not_be_valid_without_from
    @redirection.from = nil
    assert @redirection.invalid?
  end

  def test_redirection_should_not_be_valid_without_to
    @redirection.to = nil
    assert @redirection.invalid?
  end
end
