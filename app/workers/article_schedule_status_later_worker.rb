# frozen_string_literal: true

class ArticleScheduleStatusLaterWorker
  include Sidekiq::Worker

  def perform
    articles = current_user.articles.select { |article|
      (article.scheduled_publish and article.scheduled_publish <= Time.zone.now) or
      (article.scheduled_unpublish and article.scheduled_unpublish <= Time.zone.now)
    }

    articles.each do |article|
      article_schedule_status_later = ArticleScheduleStatusLaterService.new(article)
      article_schedule_status_later.process
    end
  end

  private

    def current_organization
      @_current_organization ||= Organization.first
    end

    def current_user
      @_current_user ||= current_organization.users.first
    end
end
