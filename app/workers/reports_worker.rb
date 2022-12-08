# frozen_string_literal: true

class ReportsWorker
  include Sidekiq::Worker

  def perform(user_id, report_path)
    articles = Article.accessible_to(user_id).where(status: "Published")

    content = ApplicationController.render(
      assigns: {
        articles: articles
      },
      template: "articles/report/download",
      layout: "pdf"
    )
    pdf_blob = WickedPdf.new.pdf_from_string content
    File.open(report_path, "wb") do |f|
      f.write(pdf_blob)
    end
  end
end
