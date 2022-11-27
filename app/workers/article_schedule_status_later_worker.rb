# frozen_string_literal: true

class ArticleScheduleStatusLaterWorker
  include Sidekiq::Worker
  sidekiq_options queue: :default, retry: 10

  def perform
    articles = current_user.articles.select { |article|
      (article.scheduled_publish && article.scheduled_publish <= Time.zone.now) ||
      (article.scheduled_unpublish && article.scheduled_unpublish <= Time.zone.now)
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
