# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
    @user = build(:user)
    @article = build(:article, category: @category, user: @user)
  end

  def test_article_should_not_be_valid_without_category
    @article.category = nil
    assert_not @article.save
    assert_includes @article.errors.full_messages, "Category must exist"
  end

  def test_article_should_not_be_valid_without_user
    @article.user = nil
    assert_not @article.save
    assert_includes @article.errors.full_messages, "User must exist"
  end

  def test_article_title_should_not_exceed_maximum_length
    @article.title = "a" * (Article::MAX_TITLE_LENGTH + 1)
    assert_not @article.valid?
  end

  def test_article_should_not_be_valid_without_title
    @article.title = ""
    assert_not @article.valid?
  end

  def test_article_slug_is_parameterized_title
    title = @article.title
    @article.save!
    assert_equal title.parameterize, @article.slug
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_two_worded_titles
    first_article = Article.create!(
      title: "test article", category: @category,
      user: @user, body: @article.body
    )
    second_article = Article.create!(
      title: "test article", category: @category,
      user: @user, body: @article.body
    )

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_hyphenated_titles
    first_article = Article.create!(
      title: "test-article", category: @category,
      user: @user, body: @article.body
    )
    second_article = Article.create!(
      title: "test-article", category: @category,
      user: @user, body: @article.body
    )

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_slug_generation_for_articles_having_titles_one_being_prefix_of_the_other
    first_article = Article.create!(
      title: "hyperactive", category: @category,
      user: @user, body: @article.body
    )
    second_article = Article.create!(
      title: "hypertension", category: @category,
      user: @user, body: @article.body
    )

    assert_equal "hyperactive", first_article.slug
    assert_equal "hypertension", second_article.slug
  end

  def test_error_raised_for_duplicate_slug
    another_test_article = Article.create!(
      title: "another test article", category: @category,
      user: @user, body: @article.body
    )

    assert_raises ActiveRecord::RecordInvalid do
      another_test_article.update!(slug: @article.slug)
    end

    error_msg = another_test_article.errors.full_messages.to_sentence
    assert_match "Slug is immutable!", error_msg
  end

  def test_updating_title_does_not_update_slug
    @article.title = "updated title"
    assert_not_equal "updated-title", @article.slug
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "test-article"
    first_article = Article.create!(title: title, category: @category, user: @user, body: @article.body)
    second_article = Article.create!(title: title, category: @category, user: @user, body: @article.body)
    third_article = Article.create!(title: title, category: @category, user: @user, body: @article.body)
    fourth_article = Article.create!(title: title, category: @category, user: @user, body: @article.body)

    assert_equal fourth_article.slug, "#{title.parameterize}-4"

    third_article.destroy

    expected_slug_suffix_for_new_article = fourth_article.slug.split("-").last.to_i + 1

    new_article = Article.create!(title: title, category: @category, user: @user, body: @article.body)
    assert_equal new_article.slug, "#{title.parameterize}-#{expected_slug_suffix_for_new_article}"
  end

  def test_creates_multiple_articles_with_unique_slug
    articles = create_list(:article, 10, category: @category, user: @user, body: @article.body)
    slugs = articles.pluck(:slug)
    assert_equal slugs.uniq, slugs
  end

  def test_should_not_be_delete_category_if_article_is_present_in_that_category
    @article.save!

    assert_raises ActiveRecord::InvalidForeignKey do
      @article.category.destroy
    end
  end
end
