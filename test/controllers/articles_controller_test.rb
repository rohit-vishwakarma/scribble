# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def setup
    @category = create(:category)
    @user = create(:user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_get_successfully_from_root_url
    get articles_path
    assert_response :success
  end

  def test_should_list_all_articles
    get articles_path
    assert_response :success
    response_json = response.parsed_body

    all_articles = response_json["articles"]
    draft_articles_count = response_json["draft"]
    published_articles_count = response_json["published"]

    total_articles_count = draft_articles_count + published_articles_count

    assert_equal all_articles.length, total_articles_count
  end

  def test_user_can_change_status
    article_params = { article: { status: "Published" } }

    put article_path(@article.slug), params: article_params
    assert_response :success

    @article.reload
    assert_equal @article.status, "Published"
  end

  def test_should_destroy_article
    assert_difference "Article.count", -1 do
      delete article_path(@article.slug)
    end
    assert_response :ok
  end

  def test_user_can_change_body
    article_params = { article: { body: "Updated body" } }

    put article_path(@article.slug), params: article_params
    assert_response :success

    @article.reload
    assert_equal @article.body, "Updated body"
  end

  def test_user_can_change_title
    article_params = { article: { title: "Updated Title" } }

    put article_path(@article.slug), params: article_params
    assert_response :success

    @article.reload
    assert_equal @article.title, "Updated Title"
  end

  def test_user_can_change_category
    new_category = Category.create(name: "New Category")

    article_params = { article: { category_id: new_category.id } }

    put article_path(@article.slug), params: article_params
    assert_response :success

    @article.reload
    assert_equal @article.category_id, new_category.id
  end

  def test_user_shouldnt_change_title_to_blank
    article_params = { article: { title: "" } }

    put article_path(@article.slug), params: article_params
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "Title can't be blank"
  end

  def test_should_create_article
    post articles_path,
      params: {
        article: {
          title: @article.title, category_id: @category.id, user_id: @user.id,
          body: @article.body
        }
      }
    assert_response :success
  end

  def test_shouldnt_create_article_without_title
    post articles_path,
      params: { article: { title: "", category_id: @category.id, user_id: @user.id, body: @article.body } }
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "Title can't be blank"
  end

  def test_shouldnt_create_article_without_body
    post articles_path,
      params: { article: { title: @article.title, category_id: @category.id, user_id: @user.id, body: "" } }
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "Body can't be blank"
  end

  def test_shouldnt_create_article_without_category
    post articles_path, params: { article: { title: @article.title, user_id: @user.id, body: @article.body } }
    assert_response :unprocessable_entity

    response_json = response.parsed_body
    assert_equal response_json["error"], "Category must exist"
  end
end
