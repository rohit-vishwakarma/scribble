# frozen_string_literal: true

class ArticleScheduleStatusLaterService
  attr_accessor :article

  def initialize(article)
    @article = article
  end

  def process
    if article.scheduled_unpublish && article.scheduled_unpublish <= Time.zone.now
      unpublish
    elsif article.scheduled_publish && article.scheduled_publish <= Time.zone.now
      publish
    end
  end

  private

    def publish
      if article.status == "Draft"
        article.update!(status: "Published", scheduled_publish: nil)
      else
        article.update!(scheduled_publish: nil)
      end
    end

    def unpublish
      if article.status == "Published"
        article.update!(status: "Draft", scheduled_unpublish: nil)
      else
        article.update!(scheduled_unpublish: nil)
      end
    end
end
