# frozen_string_literal: true

require "test_helper"

class ArticleScheduleStatusLaterServiceTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
    @time = Time.zone.now + 2.seconds
  end

  def test_should_publish_article_if_scheduled_publish_present_with_before_current_time
    @article.scheduled_publish = Time.zone.now + 1.second
    travel_to @time
    ArticleScheduleStatusLaterService.new(@article).process
    assert_equal "Published", @article.status
    assert_nil @article.scheduled_publish
  end

  def test_shouldnt_publish_article_if_article_is_published_with_before_current_time
    @article.status = "Published"
    @article.scheduled_publish = Time.zone.now + 1.second
    travel_to @time
    ArticleScheduleStatusLaterService.new(@article).process
    assert_equal "Published", @article.status
    assert_nil @article.scheduled_publish
  end

  def test_should_unpublish_article_if_scheduled_unpublish_present_with_before_current_time
    @article.status = "Published"
    @article.scheduled_unpublish = Time.zone.now + 1.second
    travel_to @time
    ArticleScheduleStatusLaterService.new(@article).process
    assert_equal "Draft", @article.status
    assert_nil @article.scheduled_unpublish
  end

  def test_shouldnt_unpublish_article_if_article_is_draft_with_before_current_time
    @article.scheduled_unpublish = Time.zone.now + 1.second
    travel_to @time
    ArticleScheduleStatusLaterService.new(@article).process
    assert_equal "Draft", @article.status
    assert_nil @article.scheduled_unpublish
  end
end
