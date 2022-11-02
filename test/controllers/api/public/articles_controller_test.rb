# frozen_string_literal: true

require "test_helper"

class Api::Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, category: @category, user: @user)
  end

  def test_should_update_visits_count_on_show
    test_article = create(:article, status: "Published", category: @category, user: @user)
    article_visits = test_article.visits

    get api_public_article_path(test_article.slug)
    assert_response :ok

    response_json = response.parsed_body
    assert_equal article_visits + 1, response_json["visits"]
  end
end
