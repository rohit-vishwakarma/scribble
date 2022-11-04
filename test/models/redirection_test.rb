# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @redirection = create(:redirection, organization: @organization)
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

    assert_raises ActiveRecord::RecordInvalid do
      @redirection.save!
    end

    error_msg = @redirection.errors.full_messages.to_sentence
    assert_match t("redirection.equal_path"), error_msg
  end

  def test_redirections_should_not_create_cycle
    first_redirection = create(:redirection, organization: @organization)
    second_redirection = create(:redirection, organization: @organization)
    third_redirection = create(:redirection, organization: @organization)

    second_redirection.from = first_redirection.to
    second_redirection.save!
    third_redirection.from = second_redirection.to
    third_redirection.to = first_redirection.from

    assert_raises ActiveRecord::RecordInvalid do
      third_redirection.save!
    end

    error_msg = third_redirection.errors.full_messages.to_sentence
    assert_match t("redirection.redirection_loop"), error_msg
  end

  def test_redirections_should_be_deleted_if_organization_is_deleted
    organization_count = @organization.redirections.count
    assert_not_equal 0, organization_count

    @organization.destroy!
    assert_equal 0, @organization.redirections.count
  end
end
