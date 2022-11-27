# frozen_string_literal: true

class ArticleScheduleStatusLaterService
  attr_accessor :article

  def initialize(article)
    @article = article
  end

  def process
    if article.scheduled_unpublish.present?
      article.update!(status: "Draft", scheduled_unpublish: nil)
    else
      article.update!(status: "Published", scheduled_publish: nil)
    end
  end
end
