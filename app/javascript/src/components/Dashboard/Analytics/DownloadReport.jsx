import React, { useState, useEffect } from "react";

import { articlesApi } from "apis/admin";

const DownloadReport = () => {
  const [isLoading, setIsLoading] = useState(true);

  const message = isLoading
    ? "Report is being generated..."
    : "Report downloaded!";

  const generatePdf = async () => {
    try {
      await articlesApi.generatePdf();
    } catch (error) {
      logger.error(error);
    }
  };

  const saveAs = ({ blob, fileName }) => {
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 150);
  };

  const downloadPdf = async () => {
    try {
      const { data } = await articlesApi.download();
      saveAs({ blob: data, fileName: "scribble_articles_report.pdf" });
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generatePdf();
    setTimeout(() => {
      downloadPdf();
    }, 5000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1>{message}</h1>
      </div>
    </div>
  );
};

export default DownloadReport;
