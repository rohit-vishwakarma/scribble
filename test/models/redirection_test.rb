# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = create(:redirection)
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
    duplicate_redirection = @redirection.dup
    assert_not duplicate_redirection.valid?
  end

  def test_from_and_to_should_not_be_equal
    @redirection.from = @redirection.to
    assert_not @redirection.valid?
  end

  def test_redirections_should_not_create_cycle
    first_redirection = create(:redirection)
    second_redirection = create(:redirection)
    third_redirection = create(:redirection)

    second_redirection.from = first_redirection.to
    third_redirection.from = second_redirection.to
    third_redirection.to = first_redirection.from

    assert_not third_redirection.valid?
  end
end
