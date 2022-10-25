# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_list_all_articles
    get articles_path
    assert_response :success

    response_json = response.parsed_body
    all_articles = @user.articles.count
    assert_equal all_articles, response_json["articles"].count
  end

  def test_should_destroy_article
    assert_difference "Article.count", -1 do
      delete article_path(@article.id)
    end
    assert_response :ok

    response_json = response.parsed_body
    assert_equal t("successfully_deleted", entity: "Article"), response_json["notice"]
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

    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: "Article"), response_json["notice"]
  end

  def test_should_update_article
    article_params = { article: { title: "Updated title", body: "Updated body", status: "Published" } }
    put article_path(@article.id), params: article_params
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("successfully_updated", entity: "Article"), response_json["notice"]
  end

  def test_should_bulk_update_category_of_all_articles
    test_category = create(:category, user: @user)
    first_article = create(:article, category: @category, user: @user)
    second_article = create(:article, category: @category, user: @user)
    third_article = create(:article, category: @category, user: @user)

    put bulk_update_articles_path, params: { current_id: @category.id, new_id: test_category.id }
    assert_response :success

    response_json = response.parsed_body
    assert_equal t("successfully_updated", entity: "Articles"), response_json["notice"]
  end
end
